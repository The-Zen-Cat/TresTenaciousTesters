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

// Used 99 as the min because that was the smallest value originally in hardcoded colors
// Returns a string "rgba(num1, num2, num3, " leaving last entry to be filled in as .3 (background) or 1 (border)
function getRandomColor() {
  var num1 = Math.random() * (255 - 0) + 0;
  var num2 = Math.random() * (255 - 0) + 0;
  var num3 = Math.random() * (255 - 0) + 0;
  return "rgba(" + num1 + ", " + num2 + ", " + num3 + ", "
}

function getPieData(sevFreqMap) {
  var sevScores = []
  var frequencies = []
  var backColor = []
  var bordColor = []
  for (const [sevScore, freq] of sevFreqMap) {
    if (sevScore !== undefined) {
      sevScores.push(sevScore.toString())
      frequencies.push(freq)
      backColor.push(getRandomColor() + "0.3)")
      bordColor.push(getRandomColor() + "1)")
    } 
  }
  
  return {
    labels: sevScores,
    datasets: [
      {
        label: "data",
        data: frequencies,
        backgroundColor: backColor,
        borderColor: bordColor,
        borderWidth: 1
      }
    ]
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

function getGaugePercent(avgSevScore) {
  var percent;
  if (avgSevScore === 0) {
    percent = 0;
  }
  else if (avgSevScore === 1) {
    percent = .15;
  }
  else if (avgSevScore === 2) {
    percent = .3
  }
  else if (avgSevScore === 3) {
    percent = .45
  }
  else if (avgSevScore === 4) {
    percent = .60
  }
  else if (avgSevScore === 5) {
    percent = .75
  }
  else if (avgSevScore === 6) {
    percent = .80
  }
  else if (avgSevScore === 7) {
    percent = .95
  }
  else {
    percent = .99
  }
  return percent;
}

//=============== Used by ViewMorePage.js =================//
function ChartsPage(props) {
  // get list of errors from all files in zip 
  const errorList = getErrors(props.zipfile.Files);

  // get frequency of all vulnerabilities in zip file - TODO: THIS MIGHT BE GOOD TO KEEP?
  var freqOfVuln = new Array(10).fill(0);
  errorList.forEach((error) => freqOfVuln[error.ErrorType.Severity - 1]++);

  // get frequency of severities for each file
  var freqOfSev = new Map();
  props.zipfile.Files.forEach(
    (file) => {
      if (freqOfSev.has(file.SeverityScore)) {
        freqOfSev.set(file.SeverityScore, freqOfSev.get(file.SeverityScore) + 1)
      }
      else {
        freqOfSev.set(file.SeverityScore, 1)
      }
    }
  )

  // get average sev score per file and percent for gauge
  // Note: Saving percent in a const and passing that in to gauge increases likelihood the needle will display
  var fileTotalCount = props.zipfile.FileCount;
  var avgSevScore = Math.round(props.zipfile.SeverityScore / fileTotalCount);
  const percent = getGaugePercent(avgSevScore)

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

  /*
  Gauge: Percent determines where needle points and is dependent on the avg severity score per file in the zip file.
  An average score of 0-2, meaning 0 to 1 errors per file generally, is green, while a score of 5+ is red.
  Displays the average severity score per file.
  See getGaugePercent function.
  */
  return (
    <Card.Group>
      <Card>
        <Card.Header>Average Severity Score Per File</Card.Header>
        <Card.Content>
          <GaugeChart
            id="gauge-chart1"
            nrOfLevels={3}
            percent={percent}
            textColor="#345243"
            needleColor="#8A948F"
            formatTextValue={(value) => avgSevScore.toString()}
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

//================= Used by Metrics.js =======================//
function ZipChartsPage(props) {
  // props is all zip files current stored
  const zipfiles = props.files;

  // get frequency of zip file vulnerability scores
  var freqOfVuln = new Array(10).fill(0);
  zipfiles.forEach((file) => freqOfVuln[file.severityScore - 1]++);

  // get frequency of severities of all zip files in account database
  var freqOfSev = new Map();
  zipfiles.forEach(
    (file) => {
      if (freqOfSev.has(file.severityScore)) {
        freqOfSev.set(file.severityScore, freqOfSev.get(file.severityScore) + 1)
      }
      else {
        freqOfSev.set(file.severityScore, 1)
      }
    }
  )

  // get average severity score per file and gauge percent
  var fileSevTotal = 0;
  zipfiles.forEach((zipfile) => {
    if (zipfile.severityScore !== undefined) {
      fileSevTotal += zipfile.severityScore;
    }
  }
   );

  var countFilesinZips = 0;
  zipfiles.forEach((zipfile) => {
    if (zipfile.fileCount !== undefined) {
      countFilesinZips += zipfile.fileCount
    }
  });
  var avgSevScore = Math.round(fileSevTotal / countFilesinZips)
  const percent = getGaugePercent(avgSevScore)

  // get array of zip file dates and severity scores
  var zipDate = [];
  var zipSev = [];
  zipfiles.forEach((file) => {
    zipDate.push(file.date);
    zipSev.push(file.severityScore);
  });

  /*
  Gauge: Percent determines where needle points and is dependent on the avg severity score per file in the zip file.
  An average score of 0-2, meaning 0 to 1 errors per file generally, is green, while a score of 5+ is red.
  Displays the average severity score per file across all zip files in account database.
  See getGaugePercent function.
  */
  return (
    <Card.Group>
      <Card>
        <Card.Header>Average Severity Score Per File</Card.Header>
        <Card.Content>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={3}
            percent={percent}
            textColor="#345243"
            needleColor="#8A948F"
            formatTextValue={(value) => avgSevScore.toString()}
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
        <Pie data={getPieData(freqOfSev)} />
      </Card>
      <Card style={{ width: '42.5rem' }}>
        <Card.Header>Severity Scores Over Time</Card.Header>
        <Line data={getLineData(zipDate, zipSev)} />
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

export { ChartsPage, ZipChartsPage };
