const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Todo } = require("../db/index.js");
const { SECRET, authenticateJwt } = require("../middleware/auth.js");

const router = express.Router();

// get user
router.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(403).json({ msg: "User doesnt exist" });
    return;
  }
  const { username } = user._doc;
  res.json({
    userId: req.userId,
    user: username,
  });
});

// sign up
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User created successfully" });
  }
});

// sign in
router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("wrong password");
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "1h",
    });
    req.user = user;
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Incorrect email or password" });
  }
});

// create todo
router.post("/todos", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId);
  const now = new Date();
  if (user) {
    const newTodo = new Todo({ ...req.body, timestamp: now, userId: user._id });
    await newTodo.save();
    user.todos.push(newTodo);
    await user.save();
    res.json({ message: "Todo created successfully", todo: newTodo });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

// get all todos
router.get("/todos", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId).populate("todos");
  if (user) {
    res.json({ todos: user.todos || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

// get completed todos
router.get("/todos/completed", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId).populate("todos");
  if (user) {
    res.json({ todos: user.todos?.filter((todo) => todo.isDone) || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

// get todos created today
router.get("/todos/today", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId).populate("todos");
  if (user) {
    res.json({
      todos:
        user.todos?.filter((todo) => {
          const now = new Date();
          const todayDate = now.getDate();
          const todayMonth = now.getMonth();
          const todayYear = now.getFullYear();
          const todoDate = todo.timestamp.getDate();
          const todoMonth = todo.timestamp.getMonth();
          const todoYear = todo.timestamp.getFullYear();
          if (
            todayDate == todoDate &&
            todayMonth == todoMonth &&
            todayYear == todoYear
          )
            return todo;
        }) || [],
    });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

// mark todo as done/not done
router.put("/todos/:todoId", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId);
  const todo = await Todo.findById(req.params.todoId);
  if (todo) {
    if (todo.isDone) {
      todo.isDone = false;
      await todo.save();
      await user.save();
      res.json({ message: "Todo marked as not done" });
    } else {
      todo.isDone = true;
      await todo.save();
      await user.save();
      res.json({ message: "Todo marked as done" });
    }
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// delete todo
router.delete("/todos/:todoId", authenticateJwt, async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const userId = todo.userId;
    const user = await User.findById(userId);
    await User.findByIdAndUpdate(userId, { $pull: { todos: todoId } });
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
