const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
  todo: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("todos", Todo);
