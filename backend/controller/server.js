const express = require("express");
const path = require("path");
// // const fileUpload = require('express-fileupload')
const model = require("../model/AnomalyDetecor.js");

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
//app.use(express.static(path.join(__dirname, "../build")));
//app.use(express.static("../../frontend/public"));
// app.use(fileUpload())

app.get("/", (req, res) => {
  //res.sendFile("index.html")
  //res.sendFile(path.join(__dirname, "../build", "index.html"));
  console.log("got here");
  console.log("got here");
  console.log("got here");
  res.write("HI");

  res.end();
});

app.post("/detect", (req, res) => {
  console.log("entered detect");
  if (req.files) {
    const learnJson = req.body.train;
    const anomalyJson = req.body.test;
    model
      .detect("regression", learnJson, anomalyJson)
      .then((anomalyReport) => res.write(anomalyReport))
      .catch((error) => console.log(error));
  }
  //res.json({ hi: "hi" });
  res.end();
});

app.listen(8080, () => {
  console.log("Server running");
});

/****************************
 *       region Test        *
 ****************************/
// const learnName = "C:\\Users\\97205\\Desktop\\reg_flight.json";
// const anomalyName =
//   "C:\\Users\\97205\\Desktop\\anomaly_flight_with_headers.json";
// fs = require("fs");
// // read first file
// fs.readFile(learnName, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     const learnJson = JSON.parse(data);
//     // read second file
//     fs.readFile(anomalyName, function (err, data) {
//       if (err) {
//         console.log(err);
//       } else {
//         const anomalyJson = JSON.parse(data);
//         // detect returns a promise
//         model
//           .detect("regression", learnJson, anomalyJson)
//           .then((anomalyReport) => console.log(anomalyReport))
//           .catch((error) => console.log(error));
//       }
//     });
//   }
// });
/****************************
 *       endregion Test     *
 ****************************/
