import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import InputForm from "./inputForm";
import AnomalyChart from "./anomalyChart";
import "../style.css";

const Controller = () => {
  const [report, setReport] = useState([]);
  const getAnomalies = (report) => {
    console.log(report);
    setReport(report);
  };
  useEffect(() => {
    // each time report change rerender Controller which will cause AnomalyChart to rerender
  }, [report]);
  return (
    <React.Fragment>
      <Row>
        <InputForm parentCallback={getAnomalies} />
      </Row>

      <Row>
        <AnomalyChart key={Math.random()} data={report} />
      </Row>
    </React.Fragment>
  );
};

export default Controller;
