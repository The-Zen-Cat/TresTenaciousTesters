import React, { useState } from "react";
import { Form, Grid, Input, Button, Message } from "semantic-ui-react";
import { signup } from "../client/API.js";
import { useCookies } from "react-cookie";

function SignUp(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [cookies, setCookie] = useCookies(["loggedIn"]);
	const { updateRouteHandler, callUpdateUserObject } = props;
	const [wrong, setWrong] = useState([]);

	const createAccount = async () => {
		setWrong([]);
		var correct = true;
		var usernameRegex = /^[a-zA-Z0-9]+$/;
		var passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		if (!usernameRegex.test(username)) {
			setWrong(prevState => ([...prevState, <li>Invalid username. Only alphanumeric characters are permitted.</li>]));
			correct = false;
		}
		if (!passwordRegex.test(password)) {
			setWrong(prevState => ([...prevState, <li>Invalid password. Must contain at least one letter and one number and be 6-16 characters in length. May contain alphanumeric characters and the following symbols: !, @, #, $, %, ^, &, and *.</li>]));
			correct = false;
		}
		if (password !== rePassword) {
			setWrong(prevState => ([...prevState, <li>Passwords don't match.</li>]));
			correct = false;
		}
		if (correct)
		{
			try
			{
				const result = await signup(username, password);
				if (result.data)
				{
					callUpdateUserObject();
					updateRouteHandler("main");
				}
			}
			catch (err)
			{
				setWrong([<li>Username unavailable. Please retry using a different username.</li>]);
			}
		}
	};

	return (
		<Grid style={{paddingTop: '3vh'}}>
      <Grid.Row>
				<h1>Create an Account</h1>
			</Grid.Row>
			<Grid.Row>
				<Form>
					<Input
						type="text"
						label="Username"
						onChange={(e) => setUsername(e.target.value)}
						onKeyDown={(e) => {if (e.keyCode === 13) {createAccount();}}}
					></Input>
				</Form>
			</Grid.Row>
			<Grid.Row>
				<Form>
					<Input
						type="password"
						label="Password"
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={(e) => {if (e.keyCode === 13) {createAccount();}}}
					></Input>
				</Form>
			</Grid.Row>
      <Grid.Row>
				<Form>
					<Input
						type="password"
						label="Confirm password"
						onChange={(e) => setRePassword(e.target.value)}
						onKeyDown={(e) => {if (e.keyCode === 13) {createAccount();}}}
					></Input>
				</Form>
			</Grid.Row>
			<Grid.Row>
				<Button onClick={() => createAccount()}>Sign Up</Button>
			</Grid.Row>
			<Grid.Row>
				{wrong.length > 0 && (
					<Message negative>
						<ul>{wrong}</ul>
					</Message>
				)}
			</Grid.Row>
		</Grid>
	);
}

export default SignUp;