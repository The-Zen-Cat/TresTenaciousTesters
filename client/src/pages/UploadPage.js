import React, { useState } from "react";
import {
  Grid,
  Form,
  Button,
  Segment,
  Icon,
  Header,
  Message,
} from "semantic-ui-react";
import { upload } from "../client/API.js";
import Spinner from "../components/Spinner.js";

function UploadPage() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    setStatus("pending");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await upload(formData);
      console.log("upload data response:");
      console.log(res);
      if (res.data) {
        setStatus("success");
        setResult(res.data);
      } else {
        setStatus("failure");
      }
    } catch (err) {
      setStatus("failure");
    }
  };

  return (
    <Grid style={{ paddingLeft: "2.5vw", paddingTop: "2.5vh" }}>
      <Grid.Row>
        <Segment style={{ width: "100%" }} fluid>
          <div>
            <Header as="h2" icon textAlign="center">
              <Icon name="upload" circular />
              <Header.Content>Upload Student Code</Header.Content>
            </Header>
          </div>
        </Segment>
      </Grid.Row>
      <Grid.Row>
        <Form>
          <Form.Field>
            <label>Code</label>
            <input
              type="file"
              accept=".zip, application/zip"
              onChange={saveFile}
            />
          </Form.Field>
          <Button type="submit" onClick={uploadFile}>
            Submit
          </Button>
        </Form>
      </Grid.Row>
      <Grid.Row>
        {status === "pending" && (
          <div className="list-msg">
            <Spinner />
          </div>
        )}
        {status === "success" && (
          <Message positive>
            <p>{result}</p>
          </Message>
        )}
        {status === "failure" && (
          <Message negative>
            <p>
              There was an upload error. This could be due to a server issue or
              internet connectivity issues. Please try again.
            </p>
          </Message>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default UploadPage;
