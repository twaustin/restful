const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MOGODB_URL)
  .then(() => {
    console.log("Success connected to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/students", async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    res.send(studentData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/students", async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    res.send(studentData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
