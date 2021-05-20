const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const model = require("../model/AnomalyDetecor.js");

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
// limit to override the regular limit which is 1mb.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//app.use(express.static(path.join(__dirname, "../build")));
//app.use(express.static("../../frontend/public"));
// app.use(fileUpload())

app.get("/", (req, res) => {
  // res.sendFile("index.html")
  //res.sendFile(path.join(__dirname, "../build", "index.html"));
  //   res.write("HI");
  //   res.end();
});

app.post("/detect", (req, res) => {
  console.log("entered detect");
  //console.log(req.body);
  let data = req.body;
  let learnJson = JSON.parse(data.Learn);
  let testJson = JSON.parse(data.Anomaly);
  let algoType = data.DetectorType;
  console.log(algoType);
  model
    .detect(algoType /* algoType */, learnJson, testJson)
    .then((anomalyReport) => {
      console.log(anomalyReport);
      res.send(JSON.stringify(anomalyReport));
      res.status(200);
      //res.end();
    })
    .catch((error) => console.log(error));
  // if (req.files) {
  //   const learnJson = req.body.train;
  //   const anomalyJson = req.body.test;
  //   model
  //     .detect("regression", learnJson, anomalyJson)
  //     .then((anomalyReport) => res.write(anomalyReport))
  //     .catch((error) => console.log(error));
  // }
});

app.listen(8080, () => {
  console.log("Server running");
});

/****************************
 *       region Test        *
 ****************************/
// const learnName = "C:\\Users\\97205\\Desktop\\reg_flight_new.json";
// const anomalyName =
//   "C:\\Users\\97205\\Desktop\\anomaly_flight_with_headers_new.json";
// const fs = require("fs");
// const model = require("../model/AnomalyDetecor");
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
//         console.log(anomalyJson);
//         // detect returns a promise
//         // model
//         //   .detect("regression", learnJson, anomalyJson)
//         //   .then((anomalyReport) => console.log(anomalyReport))
//         //   .catch((error) => console.log(error));
//       }
//     });
//   }
// });
/****************************
 *       endregion Test     *
 ****************************/
