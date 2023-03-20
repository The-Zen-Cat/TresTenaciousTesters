import React from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { useCookies } from "react-cookie";
import { logout } from "../client/API.js";

function TopBar(props) {
  const {
    updateZipFileHandler,
    updateRouteHandler,
    userObject,
    callUpdateUserObject,
  } = props;
  const logout_wrapper = async (updateRouteHandler) => {
    await logout();
    callUpdateUserObject();
    updateZipFileHandler("undefined");
    updateRouteHandler("login");
    window.location.reload();
  };
  return (
    <div>
      <Menu inverted attached="top">
        <Menu.Menu position="right">
          {userObject && (
            <Menu.Item
              name="logout"
              active
              onClick={() => logout_wrapper(updateRouteHandler)}
            ></Menu.Item>
          )}
          {!userObject && (
            <>
              <Menu.Item
                name="SignUp"
                active
                onClick={() => updateRouteHandler("SignUp")}
              ></Menu.Item>
              <Menu.Item
                name="LogIn"
                active
                onClick={() => updateRouteHandler("LogIn")}
              ></Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default TopBar;
