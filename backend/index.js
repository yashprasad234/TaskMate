require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/index");

const app = express();

const mongoConnectURL = process.env.DB_CONNECT_URL;

// Allow requests from Vercel frontend
app.use(cors());

app.use(express.json());

app.use("/api", userRouter);

mongoose.connect(`${mongoConnectURL}`, {
  dbName: "todos",
});

app.get("/", (req, res) => {
  res.send(
    `<div><h3>You got lost... <a href="http://localhost:5173" style="color: inherit" >click here to get back</a></h3></div>`
  );
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
