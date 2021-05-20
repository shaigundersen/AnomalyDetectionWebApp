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
    learnCsvName: "Please Upload Learn CSV",
    anomalyCsvName: "Please Upload Anomaly CSV",
    learnCsv: null, // learn file
    anomalyCsv: null, // test file
  };

  selectionChanged = (event) => {
    this.setState({ detectorType: event.target.value });
  };

  fileSelected = (event) => {
    let fileProp = event.target.name;
    console.log(fileProp);
    let fileName = event.target.files[0].name;
    this.setState({ [fileProp]: fileName });

    let type = fileProp.replace("Name", "");
    console.log(type);
    console.log(fileProp);
    this.setState({ [type]: event.target.files[0] }); // trying to change learn/anomaly to the chosen file
  };

  submitHandler = async (event) => {
    // axios
    //   .post("/detect")
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    // alert("submitted files");
    // const reader = new FileReader();
    // reader.readAsText(this.state.learn); // does it work?
    // console.log(reader.result.substring(0, 100)); // doesn't work
    // axios.post("http://localhost:9876/detect", {}); // does it work?
  };

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
                label={this.state.learnCsvName}
                onInput={this.fileSelected}
                name="learnCsvName"
                custom
              ></Form.File>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.File
                className="inputFile"
                id="custom-file"
                label={this.state.anomalyCsvName}
                name="anomalyCsvName"
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
