const express = require("express");
const path = require("path");
// const fileUpload = require('express-fileupload')
const model = require("../model/AnomalyDetecor.js");

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "../build")));
//app.use(express.static("../../frontend/public"));
// app.use(fileUpload())

app.get("/", (req, res) => {
  //res.sendFile("index.html")
  res.sendFile(path.join(__dirname, "../build", "index.html"));
  //   res.write("HI");
  //   res.end();
});

app.post("/detect", (req, res) => {
  console.log("entered detect");
  if (req.files) {
    const train = req.body.train;
    const test = req.body.test;
    const anomalies = model.detect(train, test);
    res.write(anomalies);
  }
  // res.write("detect")
  res.end();
});

app.listen(9876, () => {
  console.log("Server running");
});
