module.exports = app => {
  const tasks = require("../controllers/tasks.controller.js");

  var router = require("express").Router();

  router.post("/", tasks.createTask);

  router.get("/", tasks.findAllTasks);

  router.get("/published", tasks.findAllPublished);

  router.get("/:id", tasks.findTask);

  router.put("/:id", tasks.updateTask);

  router.delete("/:id", tasks.deleteTask);

  router.delete("/", tasks.deleteAllTask);

  app.use('/api/tasks', router);
};