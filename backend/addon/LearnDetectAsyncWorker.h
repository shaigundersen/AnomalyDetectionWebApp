#pragma once
#ifndef LEARNDETECTASYNCWORKER_H_
#define LEARNDETECTASYNCWORKER_H_
#include <napi.h>
#include "HybridAnomalyDetector.h"
using namespace Napi;
#include "json.hpp"

class LearnDetectAsyncWorker : public AsyncWorker
{

public:
    LearnDetectAsyncWorker(Function &callback, std::string detectorType, std::string &learnString, std::string &detectString);

    virtual ~LearnDetectAsyncWorker(){};

    void Execute();
    void OnOK();

private:
    std::string detectorType;
    std::string learnString;
    std::string detectString;
    std::map<std::string, std::vector<long>> anomalyMap;
};
#endif