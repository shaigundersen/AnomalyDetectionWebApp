{
  "targets": [
    {
      "target_name": "AnomalyDetectorAddon",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "./addon/API.cpp",
        "./addon/anomaly_detection_util.cpp",
        "./addon/TimeSeries.cpp",
        "./addon/AnomalyDetector.cpp",
        "./addon/SimpleAnomalyDetector.cpp",
        "./addon/HybridAnomalyDetector.cpp",
        "./addon/minCircle.cpp",
        "./addon/LearnDetectAsyncWorker.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}