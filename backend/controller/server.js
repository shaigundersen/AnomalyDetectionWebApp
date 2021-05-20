const express = require("express");
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

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.post("/detect", (req, res) => {
  // need to add validation check
  let data = req.body;
  let learnJson = JSON.parse(data.learn);
  let testJson = JSON.parse(data.anomaly);
  let algoType = data.detectorType;
  // returns a Promise with Json report
  model
    .detect(algoType, learnJson, testJson)
    .then((anomalyReport) => {
      res.status(200).send(anomalyReport);
      res.end();
    }) // need to handle error better.. maybe add status 500 and a page?
    .catch((error) => console.log(error));
});

app.listen(8080, () => {
  console.log("Server running");
});
