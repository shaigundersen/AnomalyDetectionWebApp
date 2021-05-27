# Anomaly_Detection_Web_App
### General Description
Web app for analyzing flights. The app connects to server, and in accordance to the chosen anomaly detectoion algorithm and given flight csv files get the anomalies found during the flight.

### Collaborators
This program was developed by Shai Gunderesn, Itamar Fisch, Neriya Fisch and Yehonatan Goldfarb, CS students from Bar-Ilan university, Israel.

### Prerequisites
* Wev'e been using the following packages and modules (When opening the project on Visual Studio they should be installed automatically. Download manually if they don't):
  * Axios version 0.21.1
  * Bootstrap version 5.0

### Code Design and Architechture:
The app has been programmed by the MVC architecture.
The majority of the code was written in React and JS.

### Folders and Files
#### backend
* *model*
* controller
* addon
#### frontend
* public
* src

### Instructions


When opening the app, the client needs to choose an algorithm of anomaly detection from the given list, load a train and current csv flights file (with features at the first line), and then press the "Submit" button.

```C#
public void learnAndDetect(string trainPath, string testPath){}
public Annotation GetAnnotation(string cfKey)}{}
public List<Point> getAnomalies(string cfKey){}
public List<int> getAnomaliesTimeSteps(string cfKey){}
```
* learnAndDetect - gets paths of train and test csv files, learns the normal model, and detects anomalies in the test file.
* GetAnnotation - gets a string description of correlated features ("a+b"). Returns Annotation (oxyplot interface) describing the normal model (linear regression, minimal circle etc.).
* getAnomalies - gets a string description of correlated features ("a+b"). Returns a list of Points (you can use our Point class or equivalent) that was found anomalous.
* getAnomaliesTimeSteps - gets a string description of correlated features ("a+b"). Returns a list of integers, each representing a line where an anomaly was detected. 

### Further Documentation
See UML diagrams under "UMLS" directory.

### Video Demo
Link to the video: ?  
