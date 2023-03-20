import React, { useState } from "react";
import {
  Grid,
  Card,
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
  //let [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

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
      if (res.data) {
        setStatus("success");
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
            <p>Upload successful!</p>
          </Message>
        )}
        {status === "failure" && (
          <Message negative>
            <p>Upload failed. Please retry.</p>
          </Message>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default UploadPage;
