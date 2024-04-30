const express = require("express");
const { User, Todo } = require("../db/index.js");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth.js");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(403).json({ msg: "User doesnt exist" });
    return;
  }
  const { password, ...others } = user._doc;
  res.json({
    userId: req.userId,
    user: { others }
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
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "1h",
    });
    req.user = user;
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Incorrect email or password" });
  }
});

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

router.get("/todos", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId).populate(
    "todos"
  );
  if (user) {
    res.json({ todos: user.todos || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

// router.get("/todos/:id", authenticateJwt, async (req, res) => {
//   const user = await User.findById(req.userId).populate(
//     "todos"
//   );
//   if (user) {
//     const todo = user.todos.find(
//       (todo) => todo._id.toString() === req.params.id
//     );
//     if (todo) {
//       res.json({ todo });
//     } else {
//       res.status(404).json({ message: "Todo not found" });
//     }
//   } else {
//     res.status(403).json({ message: "User not found" });
//   }
// });

router.get("/todos/completed", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId).populate(
    "todos"
  );
  if (user) {
    res.json({ todos: user.todos?.filter((todo) => todo.isDone) || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.put("/todos/:todoId", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.userId);
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
  try {
    const todoId = req.params.todoId;
    // Find the todo document by its ID
    const todo = await Todo.findById(todoId);
    // If todo not found, return 404
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    // Extract the userId from the todo document
    const userId = todo.userId;
    // Remove the todo ID from the todos array of the user document
    const user = await User.findById(userId)
    await User.findByIdAndUpdate(userId, { $pull: { todos: todoId } });
    // Delete the todo document
    await Todo.findByIdAndDelete(todoId);
    // Return success response
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
