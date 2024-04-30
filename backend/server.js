require('dotenv').config({ path: '../.env' });
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

mongoose.connect(
  `${mongoConnectURL}`,
  {
    dbName: "todos",
  }
);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
