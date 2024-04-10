const express = require("express");
const { User, Todo } = require("../db/index.js");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth.js");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    res.status(403).json({ msg: "User doesnt exist" });
    return;
  }
  res.json({
    username: user.username,
  });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  // console.log(user);
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username }, SECRET, {
      expiresIn: "1h",
    });
    req.user = user;
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Incorrect email or password" });
  }
});

router.post("/todos", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (user) {
    const newTodo = new Todo({ ...req.body, isDone: false });
    await newTodo.save();
    user.todos.push(newTodo);
    await user.save();
    res.json({ message: "Todo created successfully" });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.get("/todos", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "todos"
  );
  if (user) {
    res.json({ todos: user.todos || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.get("/todos/:id", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "todos"
  );
  if (user) {
    const todo = user.todos.find(
      (todo) => todo._id.toString() === req.params.id
    );
    if (todo) {
      res.json({ todo });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.get("/todos/completed", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "todos"
  );
  if (user) {
    res.json({ todos: user.todos?.filter((todo) => todo.isDone) || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.put("/todos/:todoId", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  const todo = await Todo.findById(req.params.todoId);
  if (todo) {
    todo.isDone = true;
    await todo.save();
    await user.save();
    res.json({ message: "Todo marked as done" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

router.delete("/todos/:todoId", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  await Todo.findByIdAndDelete(req.params.todoId);
  await user.save();
  res.json({ message: "Todo deleted successfully" });
});

module.exports = router;
