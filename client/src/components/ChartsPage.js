import React from "react";
import { Radar, Pie, Line, Bar, getElementAtEvent } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart";
import { Card, CardContent, List } from "semantic-ui-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  BarElement
);


function getRadarData(dataArray) {
  return {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: "number of occurences",
        data: dataArray,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
}

function getPieData(dataArray) {
  return {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: "data",
        data: dataArray,
        backgroundColor: [
          "rgba(99, 255, 195, 0.3)",
          "rgba(99, 255, 133, 0.3)",
          "rgba(131, 255, 99, 0.3)",
          "rgba(162, 245, 39, 0.3)",
          "rgba(215, 255, 99, 0.3)",
          "rgba(247, 255, 99, 0.3)",
          "rgba(255, 214, 99, 0.3)",
          "rgba(255, 185, 99, 0.3)",
          "rgba(255, 149, 99, 0.3)",
          "rgba(255, 99, 99, 0.3)",
        ],
        borderColor: [
          "rgba(99, 255, 195, 1)",
          "rgba(99, 255, 133, 1)",
          "rgba(131, 255, 99, 1)",
          "rgba(162, 245, 39, 1)",
          "rgba(215, 255, 99, 1)",
          "rgba(247, 255, 99, 1)",
          "rgba(255, 214, 99, 1)",
          "rgba(255, 185, 99, 1)",
          "rgba(255, 149, 99, 1)",
          "rgba(255, 99, 99, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

function getBarData(dataArray) {
  return {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: "Number of Occurences",
        data: dataArray,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
}

function getLineData(xArray, yArray) {
  return {
    labels: xArray,
    datasets: [
      {
        label: "Severity Scores",
        data: yArray,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
}

function getErrors(files) {
  var errorList = [];
  files.map((file) => {
    if (file.Errors) {
      file.Errors.map((error) => {
        if (error.ErrorType.Severity !== 0) {
          errorList.push(error);
        }
      });
    }
    if (file.PyErrors) {
      file.PyErrors.map((error) => {
        if (error.ErrorType.Severity !== 0) {
          errorList.push(error);
        }
      });
    }
  });
  return errorList;
}

function getMean(array) {
  const n = array.length;
  return array.reduce((a, b) => a + b) / n;
}

function getStandardDeviation(array) {
  const mean = getMean(array);
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) /
      array.length
  );
}

// Used by ViewMorePage.js
function ChartsPage(props) {
  // get list of errors from all files in zip 
  const errorList = getErrors(props.zipfile.Files);

  // get frequency of all vulnerabilities in zip file - TODO: THIS MIGHT BE GOOD TO KEEP?
  var freqOfVuln = new Array(10).fill(0);
  errorList.forEach((error) => freqOfVuln[error.ErrorType.Severity - 1]++);

  // get frequency of severities for each file - TODO: PROB DON'T KEEP
  var freqOfSev = new Array(10).fill(0);
  props.zipfile.Files.forEach(
    (file) => freqOfSev[file.SeverityScore - 1]++
  );

  // get most popular vulnerabilities
  var vulns = new Map();
  errorList.forEach((error) => {
    if (!vulns.has(error.ErrorType.Name)) {
      vulns.set(error.ErrorType.Name, 1);
    } else {
      var currNum = vulns.get(error.ErrorType.Name);
      vulns.set(error.ErrorType.Name, currNum + 1);
    }
  });
  const sortedVulns = new Map([...vulns.entries()].sort((a, b) => b[1] - a[1]));

  // get array of error severity scores
  var severityList = [];
  errorList.forEach((error) => severityList.push(error.ErrorType.Severity));
  console.log(severityList);

  return (
    <Card.Group>
      <Card>
        <Card.Header>Overall Zip File Severity</Card.Header>
        <CardContent>FIX GAUGE</CardContent>
        <Card.Content>
          <GaugeChart
            id="gauge-chart1"
            nrOfLevels={9}
            percent={props.zipfile.SeverityScore / 10}
            textColor="#345243"
            needleColor="#8A948F"
            formatTextValue={(value) => value / 10}
          />
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>Files with Highest Severity Score</Card.Header>
        <Card.Content>
          <List>
            {props.zipfile.Files.sort(
              (a, b) => b.SeverityScore - a.SeverityScore
            )
              .slice(0, 5)
              .map((file) => (
                <List.Item>
                  {file.Name}: {file.SeverityScore.toString()}
                </List.Item>
              ))}
          </List>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>Severity Scores of All Files</Card.Header>
        <Card.Content>To Do: Files can have any severity, not just 0-10</Card.Content>
        <Card.Content>
          <Pie data={getPieData(freqOfSev)} />
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>Most Common Vulnerabilities</Card.Header>
        <Card.Content>
          <List>
            {[...sortedVulns].slice(0, 5).map(([key, value]) => (
              <List.Item key={key} value={key}>
                {key}: {value}
              </List.Item>
            ))}
          </List>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>Vulnerabilities by Language</Card.Header>
        <Card.Content>
          TODO
          <Radar data={getRadarData(freqOfVuln)} />
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

// Used by Metrics.js
function ZipChartsPage(props) {
  // props is all zip files current stored
  const zipfiles = props.files;

  // get frequency of zip file vulnerability scores
  var freqOfVuln = new Array(10).fill(0);
  zipfiles.forEach((file) => freqOfVuln[file.severityScore - 1]++);

  // get average severity count of the zip files
  var fileSevCount = 0;
  zipfiles.forEach((zipfile) => {
    fileSevCount += zipfile.severityScore;
  }
   );
  var fileSevAverage = Math.round(fileSevCount / zipfiles.length);

  // get array of zip file dates and severity scores
  var zipDate = [];
  var zipSev = [];
  zipfiles.forEach((file) => {
    zipDate.push(file.date);
    zipSev.push(file.severityScore);
  });

  return (
    <Card.Group>
      <Card>
        <Card.Header>Average Severity Score of All Zip Files</Card.Header>
        <CardContent>FIX GAUGE</CardContent>
        <Card.Content>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={9}
            percent={fileSevAverage / 10}
            textColor="#345243"
            needleColor="#8A948F"
            formatTextValue={(value) => value / 10}
          />
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>Zip Files with Highest Severity Scores</Card.Header>
        <Card.Content>
          <List>
            {zipfiles
              .sort((a, b) => b.severityScore - a.severityScore)
              .slice(0, 5)
              .map((file) => (
                <List.Item>
                  {file.name}: {file.severityScore.toString()}
                </List.Item>
              ))}
          </List>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>Severity Scores of All Zip Files</Card.Header>
        <CardContent>TODO: Why doesn't it appear?</CardContent>
        <Pie data={getPieData(freqOfVuln)} />
      </Card>
      <Card>
        <Card.Header>Severity Scores Over Time</Card.Header>
        <CardContent>Change size to be longer</CardContent>
        <Line data={getLineData(zipDate, zipSev)} />
      </Card>
    </Card.Group>
  );
}

export { ChartsPage, ZipChartsPage };
