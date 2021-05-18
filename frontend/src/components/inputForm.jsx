import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../style.css";

class InputForm extends Component {
  state = {
    detectorType: "",
    learnCsvFile: "Please Upload Learn* CSV",
    anomalyCsvFile: "Please Upload Anomaly CSV",
  };

  selectionChanged = (event) => {
    this.setState({ detectorType: event.target.value });
  };

  fileSelected = (event) => {
    let fileProp = event.target.name;
    console.log(fileProp);
    let val = event.target.files[0].name;
    this.setState({ [fileProp]: val });
  };

  render() {
    return (
      <Form className="m-3 items mainForm">
        <Row>
          <Col xs="auto">
            <Form.Control
              as="select"
              className="mr-sm-2"
              onChange={this.selectionChanged}
              custom
            >
              <option value="">Choose Algorithem...</option>
              <option value="regression">Regression</option>
              <option value="hybrid">Hybrid</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Group>
              <Form.File
                className="inputFile"
                id="custom-file"
                label={this.state.learnCsvFile}
                onInput={this.fileSelected}
                name="learnCsvFile"
                custom
              ></Form.File>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.File
                className="inputFile"
                id="custom-file"
                label={this.state.anomalyCsvFile}
                name="anomalyCsvFile"
                onInput={this.fileSelected}
                custom
              ></Form.File>
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default InputForm;
