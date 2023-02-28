import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Form,
  Button,
  Image,
  Header,
  Input,
  Segment,
  Statistic,
  Dropdown,
  Tab,
  Icon,
  Confirm,
} from "semantic-ui-react";
import { Range } from "react-range";
import { ping, getZipFileMetadata, deleteZipFolder } from "../client/API.js";
import { ZipChartsPage } from "../components/ChartsPage";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

function MainPage(props) {
  const [filenameFilter, setFilenameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState([
    new Date("9/1/22"),
    new Date("5/1/23"),
  ]);
  const [severityFilter, setSeverityFilter] = useState(0);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const { updateRouteHandler, updateZipFileHandler } = props;
  const [files, setFiles] = useState([]);

  const panes = [
    { menuItem: "Zip folders", render: () => getStudentFilesCards() },
    {
      menuItem: "Graphs",
      render: () => <ZipChartsPage files={getFiles(files)} />,
    },
  ];

  const [updates, setUpdate] = useState(0);
  var updatenum = 0;
  // {score: 1, color: 'green'},
  // {score: 2, color: 'green'},
  // {score: 3, color: 'olive'},
  // {score: 4, color: 'olive'},
  // {score: 5, color: 'yellow'},
  // {score: 6, color: 'yellow'},
  // {score: 7, color: 'orange'},
  // {score: 8, color: 'orange'},
  // {score: 9, color: 'red'},
  // {score: 10, color: 'red'},

  const filterData = [
    {
      key: "1",
      text: "1",
      value: "1",
      label: {
        color: "green",
        empty: true,
        circular: true,
      },
    },
    {
      key: "2",
      text: "2",
      value: "2",
      label: {
        color: "green",
        empty: true,
        circular: true,
      },
    },
    {
      key: "3",
      text: "3",
      value: "3",
      label: {
        color: "olive",
        empty: true,
        circular: true,
      },
    },
    {
      key: "4",
      text: "4",
      value: "4",
      label: {
        color: "olive",
        empty: true,
        circular: true,
      },
    },
    {
      key: "5",
      text: "5",
      value: "5",
      label: {
        color: "yellow",
        empty: true,
        circular: true,
      },
    },
    {
      key: "6",
      text: "6",
      value: "6",
      label: {
        color: "yellow",
        empty: true,
        circular: true,
      },
    },
    {
      key: "7",
      text: "7",
      value: "7",
      label: {
        color: "orange",
        empty: true,
        circular: true,
      },
    },
    {
      key: "8",
      text: "8",
      value: "8",
      label: {
        color: "orange",
        empty: true,
        circular: true,
      },
    },
    {
      key: "9",
      text: "9",
      value: "9",
      label: {
        color: "red",
        empty: true,
        circular: true,
      },
    },
    {
      key: "10",
      text: "10",
      value: "10",
      label: {
        color: "red",
        empty: true,
        circular: true,
      },
    },
  ];

  const deleteZipFile = (id) => {
    setConfirmDeleteOpen(false);
    deleteZipFolder(id);
    //setFiles(files.filter((file) => file.id !== id));
    updatenum++;
    console.log("update num: " + updatenum);
    setUpdate(updatenum);
    window.location.reload(false);
  };

  useEffect(async () => {
    console.log("we're updating files now!");
    const results = (await getZipFileMetadata()).data;
    console.log(results);
    setFiles(
      results.map((result) => {
        return {
          id: result._id,
          name: result.Name,
          date: result.Date,
          fileCount: result.FileCount,
          errorCount: result.ErrorCount,
          severityScore: result.SeverityScore,
        };
      })
    );
  }, [updates]);

  function getColor(value) {
    //value from 0 to 1
    value = value / 10;
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }

  const getDate = (obj) => {
    obj = obj.substring(0, obj.indexOf("T"));
    return (
      obj.substring(obj.indexOf("-") + 1, obj.length) +
      "-" +
      obj.substring(0, obj.indexOf("-"))
    );
  };

  const getFiles = () => {
    let filteredFiles = [...files];
    if (filenameFilter !== "") {
      filteredFiles = files.filter((file) =>
        file.name.startsWith(filenameFilter)
      );
    }

    console.log(
      `the severity filter is ${typeof severityFilter} for ${filteredFiles.map(
        (f) => f.severityScore
      )}`
    );
    if (severityFilter !== 0) {
      filteredFiles = filteredFiles.filter(
        (file) => file.severityScore === severityFilter
      );
    }
    filteredFiles = filteredFiles.filter(
      (file) =>
        new Date(file.date) >= dateFilter[0] &&
        new Date(file.date) <= dateFilter[1]
    );

    return filteredFiles;
  };

  const getStudentFilesCards = () => {
    files.forEach((f) => console.log(f.id));
    return (
      <Card.Group>
        {getFiles().map((file) => (
          <Card
            style={{
              backgroundColor: `${getColor(file.SeverityScore)}`,
            }}
          >
            <Card.Content>
              <Card.Header>{file.name}</Card.Header>
              <Card.Meta>Ran on {getDate(file.date)}</Card.Meta>
              <Card.Description textAlign="center">
                <Statistic label="number of files" value={file.fileCount} />
                <Statistic label="detections" value={file.errorCount} />
                <Statistic label="severity score" value={file.severityScore} />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="primary"
                  onClick={() => updateZipFileHandler(file.id)}
                >
                  view more
                </Button>
              </div>
            </Card.Content>
            <Card.Content>
              <div className="ui two buttons">
                <Button
                  basic
                  color="red"
                  onClick={() => setConfirmDeleteOpen(true)}
                >
                  <Icon name="trash" />
                  delete
                </Button>
                <Confirm
                  content="Are you sure you want to delete this zip folder?"
                  open={confirmDeleteOpen}
                  onCancel={() => setConfirmDeleteOpen(false)}
                  onConfirm={() => deleteZipFile(file.id)}
                />
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  };

  return (
    <Grid style={{ padding: "1.5vw" }}>
      <Grid.Row>
        <Segment style={{ width: "100%" }} fluid>
          <div>
            <Header as="h2" icon textAlign="center">
              <Icon name="users" circular />
              <Header.Content>Dashboard</Header.Content>
            </Header>
          </div>
        </Segment>
      </Grid.Row>
      <Grid.Row style={{ width: "100%", paddingLeft: "1%" }}>
        {/* alphabetical, date, number of files, detections, severity score, reverse alphabetical (jk)) */}
        <Grid.Column style={{ width: "100%", padding: 0 }} width={15}>
          <Input
            style={{ width: "100%", padding: 0 }}
            placeholder="Search for zip file"
            onChange={(e) => setFilenameFilter(e.target.value)}
          />
        </Grid.Column>
        <Grid.Column width={1}>
          <Button fluid icon="sort"></Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ width: "100%", padding: 0 }}>
        <Grid columns={4}>
          <Grid.Column>
            <Dropdown
              placeholder="Filter by severity"
              fluid
              selection
              className="icon"
              options={filterData}
              onChange={(e, data) => setSeverityFilter(parseInt(data.value))}
            />
          </Grid.Column>
          <Grid.Column>
            <DateRangePicker onChange={setDateFilter} value={dateFilter} />
          </Grid.Column>
        </Grid>
      </Grid.Row>
      <Grid.Row>
        <Tab menu={{ text: true, attached: false }} panes={panes} />
      </Grid.Row>
    </Grid>
  );
}

export default MainPage;
