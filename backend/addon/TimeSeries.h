#pragma once
#ifndef TIMESERIES_H_
#define TIMESERIES_H_
#include <iostream>
#include <string.h>
#include <string>
#include <sstream>
#include <fstream>
#include <map>
#include <vector>
#include <algorithm>

#include "json.hpp"
using ordered_json = nlohmann::ordered_json;

using namespace std;

class TimeSeries
{

	map<string, vector<float>> ts;
	vector<string> atts;
	size_t dataRowSize;

public:
	TimeSeries(const char *CSVfileName)
	{
		ifstream in(CSVfileName);
		string head;
		in >> head;
		string att;
		stringstream hss(head);
		while (getline(hss, att, ','))
		{
			vector<float> v;
			ts[att] = v;
			atts.push_back(att);
		}

		while (!in.eof())
		{
			string line;
			in >> line;
			string val;
			stringstream lss(line);
			int i = 0;
			while (getline(lss, val, ','))
			{
				ts[atts[i]].push_back(stof(val));
				i++;
			}
		}
		in.close();

		dataRowSize = ts[atts[0]].size();
	}

	// CTOR as json
	TimeSeries(ordered_json jsonLearnString)
	{
		for (auto &item : jsonLearnString.items())
		{
			std::vector<float> vec = item.value();
			ts[item.key()] = vec;
			atts.push_back(item.key());
		}
		dataRowSize = ts[atts[0]].size();

	}

	const vector<float> &getAttributeData(string name) const
	{
		return ts.at(name);
	}

	const vector<string> &gettAttributes() const
	{
		return atts;
	}

	size_t getRowSize() const
	{
		return dataRowSize;
	}

	~TimeSeries()
	{
	}
};

#endif /* TIMESERIES_H_ */
