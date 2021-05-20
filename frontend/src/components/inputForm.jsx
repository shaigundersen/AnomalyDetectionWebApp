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
    let file = event.target.files[0];
    let file_type = file.type; //getting selected file type
    let valid_extensions = ["application/vnd.ms-excel", "csv"]; //adding some valid image extensions in array
    if (valid_extensions.includes(file_type)) {
      let fileProp = event.target.name;
      let csv_file = event.target.files[0].name;
      this.setState({ [fileProp]: csv_file });
      let type = fileProp.replace("CsvFile", "");
      // console.log(type)
      // this.setState({[type]: event.target.files[0]}) // trying to change learn/anomaly to the chosen file

      let fileReader = new FileReader(); //creating new FileReader object
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = () => {
        var lines = fileReader.result.split("\r\n");
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
        // console.log(json);
        this.setState({ [type]: json });
        console.log(this.state.learn);
        console.log(this.state.anomaly);
      };
    }
  };

  submitHandler = (event) => {
    alert("submitted files!!!!");
    const reader = new FileReader();
    // reader.readAsText(this.state.learn) // does it work?
    // console.log(reader.result.substring(0,100)) // doesn't work
    axios.post("http://localhost:8081/detect", {
      DetectorType: this.state.detectorType,
      Learn: this.state.learn,
      Anomaly: this.state.anomaly,
    });
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
