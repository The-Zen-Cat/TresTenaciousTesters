import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Grid,
	Card,
	Modal,
	Form,
	List,
	Button,
	Image,
	Header,
	Input,
	Segment,
	Statistic,
	Dropdown,
	Icon,
	Tab,
} from "semantic-ui-react";
import moment from "moment";
import { getZipFile } from "../client/API.js";
import { ChartsPage } from "../components/ChartsPage";

/*
props: id={currentZipFileId}
          updateRouteHandler={setCurrentRoute}
          updateZipFileHandler={setCurrentZipFileId}
*/

// Can access zip file by id and all is viewable
function ViewMorePage(props) {
	const { id, updateRouteHandler, updateZipFileHandler } = props;
	const [file, setFile] = useState({ Students: [] });

	console.log(id);

	useEffect(async () => {
		const results = (await getZipFile(id)).data;
		console.log(results);
		setFile(results);
	}, []);

	return (
		<Grid style={{ padding: "3.5vw" }}>
			<Grid.Row>
				<Grid.Column textAlign="right">
					<Card>
						<Card.Content>
							<h1>Here's a card.</h1>
							<p>{id}</p>
						</Card.Content>
					</Card>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

/*
function ViewMorePage(props) {
	const { id, updateRouteHandler, updateZipFileHandler } = props;
	const [file, setFile] = useState({ Students: [] });
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState([]);
	const [studentNameFilter, setStudentNameFilter] = useState("");

	function getColor(value) {
		//value from 0 to 1
		value = value / 10;
		var hue = ((1 - value) * 120).toString(10);
		return ["hsl(", hue, ",100%,50%)"].join("");
	}

	useEffect(async () => {
		const results = (await getZipFile(id)).data;
		setFile(results);
	}, []);

	const getStudents = () => {
		let filteredStudents = [...file.Students];
		if (studentNameFilter !== "") {
			filteredStudents = filteredStudents.filter((student) =>
				student.Name.startsWith(studentNameFilter)
			);
		}
		return filteredStudents;
	};


	const panes = [
		{
			menuItem: "Students",
			render: () => (
				<Grid>
					<Grid.Row>
					<Grid.Column style={{ width: "80%" }}>
						<Input
							style={{ width: "100%" }}
							placeholder="Search for student"
							onChange={(e) => setStudentNameFilter(e.target.value)}
						/>
					</Grid.Column>
					<Grid.Column>
						<Button icon="sort"></Button>
					</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Card.Group>
							{getStudents().map((student) => (
								<Card>
									<Card.Content>
										<Image
											floated="right"
											size="mini"
											src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
										/>
										<Card.Header>{student.Name}</Card.Header>
										<Card.Meta>
											Submitted {student.Files.length} files
										</Card.Meta>
									</Card.Content>
									<Card.Content extra>
										<Icon color={"blue"} name="user" />
										<span style={{ color: "blue" }}>
											{student.Files.reduce(
												(prev, currFile) =>
													prev + currFile.ErrorCount,
												0
											)}{" "}
											Detections
										</span>
									</Card.Content>
									<Card.Content extra>
										<Icon
											style={{
												color: getColor(student.SeverityScore),
											}}
											name="exclamation triangle"
										/>
										<span style={{ color: "black" }}>
											{student.SeverityScore} Severity Score
										</span>
									</Card.Content>
									<Card.Content extra>
										<div className="ui two buttons">
											{student.Files.reduce(
												(prev, currFile) =>
													prev + currFile.ErrorCount,
												0
											) !== 0 ? (
												<Button
													basic
													color="primary"
													onClick={() => {
														var allErrors = [];
														student.Files.forEach(
															(currFile) => {
																if (currFile.Errors) {
																	currFile.Errors.forEach(
																		(error) => {
																			allErrors.push({
																				data: error,
																				fileName: currFile.Name,
																				type: "JS"
																			});
																		}
																	);
																}
																if (currFile.PyErrors) {
																	currFile.PyErrors.forEach(
																		(error) => {
																			allErrors.push({
																				data: error,
																				fileName: currFile.Name,
																				type: "PY"
																			});
																		}
																	);
																}
															}
														);
														setErrors(allErrors);
														setOpen(true);
													}}
												>
													view more
												</Button>
											) : (
												<></>
											)}
										</div>
									</Card.Content>
								</Card>
							))}
						</Card.Group>
					</Grid.Row>
				</Grid>
			),
		},
		{ menuItem: "Graphs", render: () => <ChartsPage file={file} /> },
	];

	const getDate = (obj) => {
		obj = obj.substring(0, obj.indexOf("T"));
		return (
			obj.substring(obj.indexOf("-") + 1, obj.length) +
			"-" +
			obj.substring(0, obj.indexOf("-"))
		);
	};

	return (
		<Grid style={{ padding: "3.5vw" }}>
			<Grid.Row>
				<Grid.Column textAlign="right">
					<Button
						size="tiny"
						onClick={() => {
							updateZipFileHandler("undefined");
							updateRouteHandler("main");
						}}
					>
						Back
					</Button>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid columns={2} style={{ paddingRight: "15%" }}>
					<Grid.Column>
						<Header as="h1">
							{file.Name}
							<Header.Subheader>
								Ran on {file.Date}
							</Header.Subheader>
						</Header>
					</Grid.Column>
				</Grid>
			</Grid.Row>
			<Grid.Row>
				<Card.Group>
					<Card>
						<Card.Content>
							<Card.Description textAlign="center">
								<Statistic
									label="number of files"
									value={file.FileCount}
								/>
							</Card.Description>
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							<Card.Description textAlign="center">
								<Statistic
									label="number of detections"
									value={file.ErrorCount}
								/>
							</Card.Description>
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							<Card.Description textAlign="center">
								<Statistic
									label="Severity Score"
									value={file.SeverityScore}
								/>
							</Card.Description>
						</Card.Content>
					</Card>
				</Card.Group>
			</Grid.Row>
			<Grid.Row>
				<Tab menu={{ text: true, attached: false }} panes={panes} />
			</Grid.Row>
			<Grid.Row>
				<Modal
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
				>
					<Modal.Header>Errors</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<List>
								{errors.map((err) => {
									return (
										// <div>{JSON.stringify(err)}</div>
										<Card.Group>
											<Card fluid>
												<Card.Content>
													<Card.Header>
														{err.data.ErrorType.Name.toLowerCase()
															.split(" ")
															.map(
																(s) =>
																	s
																		.charAt(
																			0
																		)
																		.toUpperCase() +
																	s.substring(
																		1
																	)
															)
															.join(" ")}{" "}
													</Card.Header>
													<Card.Meta>
														{err.fileName}
													</Card.Meta>
													<Card.Description>
														<span
															style={{
																fontWeight:
																	"bolder",
															}}
														>
															Description:
														</span>{" "}
														{
															err.data.ErrorType
																.Description
														}
													</Card.Description>
													<Card.Description>
														<span
															style={{
																fontWeight:
																	"bolder",
															}}
														>
															CWE:
														</span>{" "}
														<a> { err.data.ErrorType.CWE } </a>
													</Card.Description>
													<Card.Description>
														<span
															style={{
																fontWeight:
																	"bolder",
															}}
														>
															More Info:
														</span>{" "}
														<a> { err.data.ErrorType.MoreInfo } </a>
													</Card.Description>
												</Card.Content>
												{(err.data.ErrorType.Group) 
												&& <Card.Content extra>
													<Icon name="bug" />
													{err.data.ErrorType.Group}
												</Card.Content>}
												<Card.Content extra>
													<Icon name="file code" />
													line {err.data.Line}
												</Card.Content>
												<Card.Content extra>
													<Icon
														style={{
															color: getColor(
																err.data
																	.ErrorType
																	.Severity
															),
														}}
														name="warning sign"
													/>
													severity:{" "}
													{
														err.data.ErrorType
															.Severity
													}
												</Card.Content>
											</Card>
										</Card.Group>
									);
								})}
							</List>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button color="black" onClick={() => setOpen(false)}>
							Close
						</Button>
					</Modal.Actions>
				</Modal>
			</Grid.Row>
		</Grid>
	);
} */

export default ViewMorePage;