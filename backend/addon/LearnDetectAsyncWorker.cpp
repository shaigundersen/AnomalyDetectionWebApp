#include "LearnDetectAsyncWorker.h"
#include <chrono>
#include <stdio.h>
using ordered_json = nlohmann::ordered_json;

LearnDetectAsyncWorker::LearnDetectAsyncWorker(Function &callback, std::string detectorType, std::string &learnString, std::string &detectString)
    : AsyncWorker(callback), learnString(learnString), detectorType(detectorType), detectString(detectString){};


void LearnDetectAsyncWorker::Execute()
{
    ordered_json learn = ordered_json::parse(learnString);
    TimeSeries learnTS(learn);
    ordered_json detect = ordered_json::parse(detectString);
    TimeSeries detectTS(detect);

    SimpleAnomalyDetector* ad;
    if ((strcmp(&(detectorType[0]), "hybrid") == 0))
        ad = new HybridAnomalyDetector();
    else if ((strcmp(&(detectorType[0]), "regression") == 0))
        ad = new SimpleAnomalyDetector();
    else
    {
        SetError("can't create Detector of type " + detectorType);
        return;
    }

    ad->learnNormal(learnTS);
    auto vec = ad->detect(detectTS);
    std::map<std::string, std::vector<long>> map;
    //gather each timestep with same description into timeStep vector
    for_each(vec.begin(), vec.end(), [&map](AnomalyReport &ar) {
        map[ar.description].push_back(ar.timeStep);
    });
    this->anomalyMap = map; 
    free(ad);
};

void LearnDetectAsyncWorker::OnOK()
{   
    Object toReturn = Object::New(Env());
    Array reportArray = Array::New(Env());
    int j = 0;
    //creat object of description and timeStep Array
    for_each(anomalyMap.begin(), anomalyMap.end(), [this, &j, &reportArray](const auto &myMapPair) {
        Object anomalyReport = Object::New(Env());
        anomalyReport.Set("description", myMapPair.first);
        int len = myMapPair.second.size(), i;
        Array timeStepArray = Array::New(Env(), len);
        for (i = 0; i < len; i++)
        {
            timeStepArray[i] = myMapPair.second[i];
        }
        anomalyReport.Set("timeStep", timeStepArray);
        //add each object created to the reportArray
        reportArray[j] = anomalyReport;
        j++;
    });
    toReturn.Set("report", reportArray);
    Callback().Call({Env().Null(), toReturn});
}