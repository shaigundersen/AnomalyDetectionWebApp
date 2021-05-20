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
  console.log(req.body);
  let data = req.body.data;
  let learnJson = data[0];
  let testJson = data[1];
  // let algoType = data[2]
  model
    .detect("hybrid" /* algoType */, learnJson, testJson)
    .then((anomalyReport) => {
      console.log(anomalyReport);
      res.send(JSON.stringify(anomalyReport));
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
