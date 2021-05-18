import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../style.css";
import axios from "axios";

class InputForm extends Component {
  state = {
    detectorType: "",
    learnCsvFile: "Please Upload Learn CSV",
    anomalyCsvFile: "Please Upload Anomaly CSV",
    learn:null,
    anomaly:null
  };

  selectionChanged = (event) => {
    this.setState({ detectorType: event.target.value });
  };

  fileSelected = (event) => {
    let fileProp = event.target.name;
    console.log(fileProp);
    let val = event.target.files[0].name;
    this.setState({ [fileProp]: val });

    let type = fileProp.replace("CsvFile", '')
    console.log(type)

    this.setState({[type]: event.target.files[0]})

    const reader = new FileReader()
    reader.readAsText(this.state.learn)
    console.log(reader.result)

  };

  submitHandler = (event) =>{
    alert("submitted files")
    const reader = FileReader()
    const body = event.target.files[0]
    reader.readAsText(body)
    const content = reader.result

    alert(content)
    axios.post('http://localhost:9876/detect')
  }

  render() {
    return (
      <Form className="m-3 items mainForm" onSubmit={this.submitHandler}>
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
