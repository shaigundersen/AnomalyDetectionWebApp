import React, { useState } from "react";

import "../style.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomizedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Anomalies found from ${payload[0].value[0]} until ${payload[0].value[1]}`}</p>
      </div>
    );
  }
  return null;
};
const CustomizedLabelAxis = ({ x, y, payload }) => {
  const splitted = payload.value.split("~~");
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor="end" fill="#666">
        <tspan>{splitted[0]}</tspan>
        <tspan x={0} dy="20">
          {splitted[1]}
        </tspan>
      </text>
    </g>
  );
};
//helper func to measure each description
function measureText(description) {
  const splitted = description.split("~~");
  const ctx = document.createElement("canvas").getContext("2d");
  return Math.max(
    ctx.measureText(splitted[0]).width,
    ctx.measureText(splitted[1]).width
  );
}
const AnomalyChart = (props) => {
  const [data] = useState(props.data);
  // to know how much margin we need to set as each description is of different length
  let leftMargin = document
    .createElement("canvas")
    .getContext("2d")
    .measureText("CorrelatedFeatures").width;
  data.forEach((element) => {
    const textWidth = measureText(element.description);
    if (textWidth > leftMargin) {
      leftMargin = textWidth;
    }
  });
  leftMargin += 50;
  return (
    <ResponsiveContainer className="chart" width="75%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: leftMargin,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={["auto", "auto"]} />
        <YAxis
          type="category"
          dataKey="description"
          label={{
            value: "CorrelatedFeatures",
            position: "insideTopLeft",
            dx: -90,
          }}
          tick={<CustomizedLabelAxis />}
        />
        <Tooltip content={<CustomizedTooltip />} />
        <Legend />
        <Bar dataKey="timeStep" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnomalyChart;
