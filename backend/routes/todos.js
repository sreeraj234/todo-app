const express = require("express");
const Todo = require("../models/todo.model");

const router = express.Router();

router.post("/", (req, res) => {
  const todo = new Todo(req.body);
  if (!todo) {
    return res.status(400).json({ error: err });
  }
  todo
    .save()
    .then((item) => res.json(item))
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "todo item not created",
      });
    });
});

router.post("/update/:id", (req, res) => {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else {
      todo.completed = req.body.completed;
    }
    todo
      .save()
      .then((todo) => {
        res.json("Todo updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

router.get("/", (req, res) => {
  Todo.find()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
