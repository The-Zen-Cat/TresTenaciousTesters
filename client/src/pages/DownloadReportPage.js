import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getZipFileMetadata, generateReport } from "../client/API.js";
import FileDownload from "js-file-download";
import "antd/dist/antd.min.css";
import { Button, Icon, Message } from "semantic-ui-react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a href="#">{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "File Count",
    dataIndex: "fileCount",
  },
  {
    title: "Student Count",
    dataIndex: "studentCount",
  },
  {
    title: "Error Count",
    dataIndex: "errorCount",
  },
  {
    title: "Severity Score",
    dataIndex: "severityScore",
  },
];

function DownloadReport() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function downloadReport() {
    if (data.length == 0) {
      setError(true);
      setErrorMessage("There are no zip files to generate the report");
      return;
    }
    if (selectedRowKeys.length == 0) {
      setError(true);
      setErrorMessage("Please select at least one zip file");
      return;
    }
    try {
      var result = await generateReport(selectedRowKeys);
    } catch (e) {
      setError(true);
      setErrorMessage(e);
      return;
    }

    setError(false);
    FileDownload(result.data, "Report.csv");
  }

  useEffect(async () => {
    const results = (await getZipFileMetadata()).data;
    setData(
      results.map((result) => {
        return {
          key: result._id,
          name: result.Name,
          date: result.Date,
          fileCount: result.FileCount,
          errorCount: result.ErrorCount,
          severityScore: result.SeverityScore,
          studentCount: result.Files.length,
        };
      })
    );
  }, []);

  const onRowKeyChange = (keys) => {
    setSelectedRowKeys(keys);
  };
  const keys = [...selectedRowKeys];

  return (
    <div style={{ padding: "3%" }}>
      <Table
        rowSelection={{
          keys,
          onChange: onRowKeyChange,
        }}
        columns={columns}
        dataSource={data}
      />
      <Button onClick={downloadReport}>
        <Icon name="download" />
        Generate Report
      </Button>
      {error && (
        <Message negative>
          <p>{errorMessage}</p>
        </Message>
      )}
    </div>
  );
}

export default DownloadReport;
