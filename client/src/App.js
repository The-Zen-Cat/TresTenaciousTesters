import "./App.css";
import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import moment from "moment";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import UploadPage from "./pages/UploadPage";
import MainPage from "./pages/MainPage";
import BugListPage from "./pages/BugsDisplayPage";
import ViewMorePage from "./pages/ViewMorePage";
import MetricsPage from "./pages/Metrics";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import DownloadReportPage from "./pages/DownloadReportPage";
//import FederatedOAuth from "./components/FederatedOAuth";
import { getUser } from "./client/API";

function App() {
  let defaultRoute = "LogIn";
  const [userObject, setUserObject] = useState();
  if (userObject) {
    defaultRoute = "main";
  }
  const [currentRoute, setCurrentRoute] = useState(defaultRoute);
  const [currentZipFileId, setCurrentZipFileId] = useState("undefined");

  useEffect(async () => {
    callUpdateUserObject();
  }, []);

  const callUpdateUserObject = async () => {
    var response = await getUser();
    console.log(response);
    setUserObject(response.data);
  };

  const getCurrentRoute = () => {
    if (userObject && (currentRoute == "LogIn" || currentRoute == "SignUp")) {
      setCurrentRoute("main");
    } else if (
      !userObject &&
      currentRoute != "LogIn" &&
      currentRoute != "SignUp"
    ) {
      setCurrentRoute("LogIn");
    }

    if (currentZipFileId !== "undefined") {
      return (
        <ViewMorePage
          id={currentZipFileId}
          updateRouteHandler={setCurrentRoute}
          updateZipFileHandler={setCurrentZipFileId}
        />
      );
    }

    switch (currentRoute) {
      case "LogIn":
        return (
          <LogIn
            updateRouteHandler={setCurrentRoute}
            callUpdateUserObject={callUpdateUserObject}
          />
        );
      case "SignUp":
        return (
          <SignUp
            updateRouteHandler={setCurrentRoute}
            callUpdateUserObject={callUpdateUserObject}
          />
        );
      case "Landing":
        return <Landing updateRouteHandler={setCurrentRoute} />;
      case "main":
        return (
          <MainPage
            updateRouteHandler={setCurrentRoute}
            updateZipFileHandler={setCurrentZipFileId}
          />
        );
      case "upload":
        return <UploadPage />;
      case "BugListPage":
        return <BugListPage />;
      case "MetricsPage":
        return <MetricsPage />;
      case "DownloadReportPage":
        return <DownloadReportPage />;
    }
  };

  return (
    <div>
      {userObject && (
        <Grid>
          <Grid.Column width={3} style={{ paddingRight: 0 }}>
            <Sidebar
              updateZipFileHandler={setCurrentZipFileId}
              updateRouteHandler={setCurrentRoute}
              style={{ width: "100%" }}
            />
          </Grid.Column>
          <Grid.Column width={13} style={{ paddingLeft: 0 }}>
            <TopBar
              updateZipFileHandler={setCurrentZipFileId}
              updateRouteHandler={setCurrentRoute}
              userObject={userObject}
              callUpdateUserObject={callUpdateUserObject}
            />
            {getCurrentRoute()}
          </Grid.Column>
        </Grid>
      )}
      {!userObject && (
        <>
          <TopBar
            updateRouteHandler={setCurrentRoute}
            userObject={userObject}
            updateZipFileHandler={setCurrentZipFileId}
            callUpdateUserObject={callUpdateUserObject}
          />
          <div
            style={{
              paddingLeft: "20%",
              paddingRight: "15%",
              paddingTop: "5%",
            }}
          >
            {getCurrentRoute()}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
