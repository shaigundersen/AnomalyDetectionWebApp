import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import InputForm from "./inputForm";
import AnomalyChart from "./anomalyChart";
import "../style.css";

const Controller = () => {
  const [report, setReport] = useState([]);
  const getAnomalies = (report) => {
    setReport(report);
  };

  return (
    <React.Fragment>
      <Row>
        <InputForm parentCallback={getAnomalies} />
      </Row>

      {report.length > 0 && (
        <Row>
          <AnomalyChart key={Math.random()} data={report} />
        </Row>
      )}
    </React.Fragment>
  );
};

export default Controller;
