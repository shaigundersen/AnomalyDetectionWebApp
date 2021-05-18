import React from "react";
import ReactDOM from "react-dom";
import InputForm from "./components/inputForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

ReactDOM.render(
  <Container fluid>
    <Row
      style={{
        textAlign: "center",
        padding: "10px 0",
        fontSize: "50px",
        fontWeight: "bold",
        background: "rgba(0, 128, 0, 0.3)",
      }}
    >
      <Col>Anomaly Detection Server</Col>
    </Row>
    <Row>
      <InputForm />
    </Row>
  </Container>,
  document.getElementById("root")
);
