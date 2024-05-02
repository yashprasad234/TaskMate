const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  timestamp: { type: Object },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  User,
  Todo,
};
