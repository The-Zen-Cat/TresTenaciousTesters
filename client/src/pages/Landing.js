import React from "react";
import { Button} from "semantic-ui-react";
import { useCookies } from "react-cookie";


function Landing(props) {
  const { updateRouteHandler } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);

  return (
    <div>
      <h1>Welcome to codeChomper</h1>
      <Button onClick={() => updateRouteHandler("LogIn")}>login</Button>
			<Button onClick={() => updateRouteHandler("SignUp")}>Create an Account</Button>
    </div>
  );
}

export default Landing;