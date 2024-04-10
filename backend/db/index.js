const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

const todoSchema = new mongoose.Schema({
  title: String,
  isDone: Boolean,
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  User,
  Todo,
};
