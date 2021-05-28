import React, { useState } from "react";

import "../style.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Anomalies found from : ${payload[0].value[0]} until : ${payload[0].value[1]}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};
const AnomalyChart = (props) => {
  const [data] = useState(props.data);

  return (
    <React.Fragment>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="description" />
        <Tooltip />
        <Legend />
        <Bar dataKey="timeStep" fill="#8884d8" />
      </BarChart>
      {/* <BarChart
          width={600}
          height={300}
          data={this.props.report}
          layout="vertical"
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="description" stroke="#8884d8" />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="timeStep" fill="#8884d8" barSize={30} />
        </BarChart> */}
    </React.Fragment>
  );
};

export default AnomalyChart;
