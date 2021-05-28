import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
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
} from "recharts";

import "../style.css";
import axios from "axios";

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detectorType: "",
      learnFileName: "Please Upload Learn CSV",
      anomalyFileName: "Please Upload Anomaly CSV",
      learnFile: null, // learn file
      anomalyFile: null, // test file
      anomalyReport: null,
      learnFileError: false, // for validation
      anomalyFileError: false, // for validation
      mydata: [],
    };
    // preserve the initial state to fall back to
    this.baseState = this.state;
  }
  selectionChanged = (event) => {
    this.setState({ detectorType: event.target.value });
  };

  csvToJson(file, fileDataProperty) {
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {
      var lines = fileReader.result.split(/\r\n|\r|\n/g); //split by new line depending on system
      var result = [];
      var headers = lines[0].split(",");
      var len = lines.length;
      for (var i = 0; i < headers.length; i++) {
        var obj = {};
        var values = [];
        for (var j = 1; j < len - 1; j++) {
          var currentline = lines[j].split(",");
          values.push(parseFloat(currentline[i]));
        }
        obj[headers[i]] = values;
        result.push(obj);
      }
      var json = JSON.stringify(result); //JSON
      json = json.replaceAll("{", "");
      json = json.replaceAll("}", "");
      json = json.substring(1, json.length - 1); // remove wrapping []
      json = "{" + json + "}";
      this.setState({ [fileDataProperty]: json });
    };
  }
  // file selected handler
  fileSelected = (event) => {
    let file = event.target.files[0];
    let file_type = file.type; //getting selected file type
    let valid_extensions = ["application/vnd.ms-excel", "csv"]; //adding some valid csv extensions in array
    let fileNameProperty = event.target.name;
    let fileName = event.target.files[0].name;
    this.setState({ [fileNameProperty]: fileName });
    let fileDataProperty = fileNameProperty.replace("Name", "");
    let fileError = fileNameProperty.replace("Name", "Error");
    if (valid_extensions.includes(file_type)) {
      // set error to be false
      this.setState({ [fileError]: false });
      // valid extention -> make json of it
      this.csvToJson(file, fileDataProperty);
    } else {
      // invalid type -> raise error
      this.setState({ [fileError]: true });
    }
    event.target.value = null;
  };

  setDefaultState() {
    this.setState(this.baseState);
  }
  // if any of conditions are satisfied -> form is incomplete -> disable submit button
  checkFormValidation() {
    const {
      detectorType,
      learnFileName,
      anomalyFileName,
      learnFileError,
      anomalyFileError,
    } = this.state;
    if (detectorType === this.baseState.detectorType) return true;
    if (learnFileName === this.baseState.learnFileName || learnFileError)
      return true;
    if (anomalyFileName === this.baseState.anomalyFileName || anomalyFileError)
      return true;
  }

  submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/detect", {
        detectorType: this.state.detectorType,
        learn: this.state.learnFile,
        anomaly: this.state.anomalyFile,
      })
      .then((response) => {
        this.setState({ anomalyReport: response.data.report });
        this.props.parentCallback(response.data.report);
      })
      .catch((err) => console.log(err));
    //set the form back to default
    this.setDefaultState();
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Form
            className="m-3 items mainForm needs-validation"
            noValidate
            onSubmit={this.submitHandler}
          >
            <Row>
              <Col xs="auto">
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  onChange={this.selectionChanged}
                  custom
                  value={this.state.detectorType}
                >
                  <option value="">Choose Algorithem...</option>
                  <option value="regression">Regression</option>
                  <option value="hybrid">Hybrid</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Group>
                  <Form.File className="inputFile" id="custom-file" custom>
                    <Form.File.Input
                      name="learnFileName"
                      onInput={this.fileSelected}
                      isInvalid={this.state.learnFileError}
                    />
                    <Form.File.Label>
                      {this.state.learnFileName}
                    </Form.File.Label>
                    <Form.Control.Feedback type="invalid">
                      file is not CSV type!
                    </Form.Control.Feedback>
                  </Form.File>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.File className="inputFile" id="custom-file" custom>
                    <Form.File.Input
                      name="anomalyFileName"
                      onInput={this.fileSelected}
                      isInvalid={this.state.anomalyFileError}
                    />
                    <Form.File.Label>
                      {this.state.anomalyFileName}
                    </Form.File.Label>
                    <Form.Control.Feedback type="invalid">
                      file is not CSV type!
                    </Form.Control.Feedback>
                  </Form.File>
                </Form.Group>
              </Col>
              <Col>
                <Button type="submit" disabled={this.checkFormValidation()}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </React.Fragment>
    );
  }
}

export default InputForm;
