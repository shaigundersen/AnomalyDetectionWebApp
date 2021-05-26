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

function validateBody(data) {
  let isValid = true;
  const error = new Error();
  error.status = 400;
  if (!Object.keys(data).length) {
    error.massage = "Missing Body In Request !";
  } else if (!data.detectorType) {
    error.massage = "Missing detectorType !";
  } else if (!data.learn) {
    error.massage = "Missing Learn Json !";
  } else if (!data.anomaly) {
    error.massage = "Missing Anomaly Json !";
  } else {
    try {
      let learnJson = JSON.parse(data.learn);
      let testJson = JSON.parse(data.anomaly);
      return { learnJson, testJson };
    } catch {
      error.massage = "Not Supported Json Format !";
    }
  }
  if (error.massage) return error;
}

app.post("/detect", (req, res, next) => {
  let data = req.body;
  const isValid = validateBody(data);
  if (isValid.massage) {
    next(isValid);
    return;
  }
  let learnJson = isValid.learnJson;
  let testJson = isValid.testJson;
  let algoType = data.detectorType;
  // returns a Promise with Json report
  model
    .detect(algoType, learnJson, testJson)
    .then((anomalyReport) => {
      res.status(200).send(anomalyReport);
      res.end();
    }) // need to handle error better.. maybe add status 500 and a page?
    .catch((error) => {
      console.log(error);
    });
});

// handle not supported paths
app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.massage = "Not Found";
  next(error);
});
// handle all kinds of different errors thrown by other paths
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      massage: error.massage,
    },
  });
});

app.listen(8080, () => {
  console.log("Server running");
});
