# Anomaly_Detection_Web_App
### General Description
Web app for analyzing flights. The app connects to a server, and following the chosen anomaly detection algorithm and given flight CSV files get the anomalies found during the flight.

### Collaborators
This program was developed by Shai Gundersen, Itamar Fisch, Neriya Fisch and Yehonatan Goldfarb, CS students from Bar-Ilan university, Israel.

### Prerequisites
We've has been using the following packages and modules (When opening the project on Visual Studio they should be installed automatically. Download manually if they don't):
  * Axios version 0.21.1
  * Bootstrap version 5.0

### Code Design and Architecture:
The app has been programmed by the MVC architecture.
The majority of the code was written in React and JS (frontend), Node.js+express using CPP addon (backend).

### Folders and Files
#### backend
  * model: get the algorithm and flight files, return JSON with anomalies due to the logic of the algorithm
  * controller: the server code. listen on port 8080 (localhost), receive data from the client, return the appropriate data by accessing the model 
  * addon: anomaly detectoion algorithms, written in CPP
#### frontend
* public: an HTML file, the View
* src: styles and React components with the logic of the View

### Instructions
#### Server-side:
* Clown the project
* Enter to "backend" directory with CLI
* Run the code:
```bash
npm start
```

#### Client-side:
* Open the app with your browser (localhost:8080)
* the client needs to choose an algorithm of anomaly detection from the given list, load a train and current CSV flights file (with features at the first line), and then press the "Submit" button.
* Another option is sending HTTP POST requests directly to the server (with the same parameters) and receiving the JSON as well.
### Further Documentation
See UML diagrams under "UMLS" directory.

### Video Demo
Link to the video: [Anomaly Detection WebApp Demo](https://youtu.be/wK3IkKHpW28)
