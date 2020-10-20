const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.createTask = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({
        message: "Title can't be empty"
      });
      return;
    }
    const task = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
    Task.create(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Err occurred while creating the Task."
        });
      });
};
exports.updateTask = (req, res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Task was updated"
            });
        } else {
            res.send({
            message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Task with id=" + id
        });
        });
};
exports.deleteTask = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Task was deleted"
            });
        } else {
            res.send({
            message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Task with id=" + id
        });
        });
};
exports.deleteAllTask = (req, res) => {
    Task.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tasks were deleted` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Err occurred while removing all tasks."
        });
      });
};
exports.findTask = (req, res) => {
    const id = req.params.id;
  
    Task.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Err retrieving Task with id=" + id
        });
      });
  };
exports.findAllTasks = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Task.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Err occurred while retrieving tasks."
        });
      });
  };
exports.findAllPublished = (req, res) => {
    Task.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Err occurred while retrieving tasks."
        });
     });
};