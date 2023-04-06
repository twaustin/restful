const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
    //return res.send(studentData);
    return res.render("students", { studentData });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/students/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundStudent = await Student.findOne({ _id }).exec();
    return res.send(foundStudent);
  } catch (e) {
    return res.status(500).send("尋找資料時發生錯誤。。。");
  }
});

app.post("/students", async (req, res) => {
  try {
    let { name, age, major, merit, other } = req.body;
    let newStudent = new Student({
      name,
      age,
      major,
      scholarship: {
        merit,
        other,
      },
    });
    let savedStudent = await newStudent.save();
    return res.send({
      msg: "資料儲存成功",
      data: savedStudent,
    });
  } catch (e) {
    return res.status(500).send("儲存失敗");
  }
});

app.delete("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteResult = await Student.deleteOne({ _id });
    return res.send(deleteResult);
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法刪除學生資料");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
