const addon = require("../build/Release/AnomalyDetectorAddon");

function detect(detectorType, train, test) {
  return new Promise((resolve, reject) => {
    addon.LearnAndDetect(detectorType, train, test, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
module.exports.detect = detect;
