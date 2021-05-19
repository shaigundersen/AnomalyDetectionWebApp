#pragma once
#ifndef ANOMALYDETECTOR_H_
#define ANOMALYDETECTOR_H_

#include <string>
#include <vector>
#include "TimeSeries.h"
#include "math.h"


class AnomalyReport {
public:
	string description;
	long timeStep;
	AnomalyReport(string description, long timeStep) :description(description), timeStep(timeStep) {}
};

class TimeSeriesAnomalyDetector {
public:
	virtual void learnNormal(const TimeSeries& ts) = 0;
	virtual vector<AnomalyReport> detect(const TimeSeries& ts) = 0;
	virtual ~TimeSeriesAnomalyDetector() {}
};

#endif /* ANOMALYDETECTOR_H_ */

