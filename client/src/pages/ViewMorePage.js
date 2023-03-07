import React, { useState, useEffect } from "react";
import {
	Grid,
	Card,
	Modal,
	List,
	Button,
	Image,
	Header,
	Input,
	Statistic,
	Icon,
	Tab,
} from "semantic-ui-react";
import { getZipFile } from "../client/API.js";
import { ChartsPage } from "../components/ChartsPage";

function ViewMorePage(props) {
	const { id, updateRouteHandler, updateZipFileHandler } = props;
	const [zipfile, setZipFile] = useState({ Files: [] });
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState([]);
	const [fileNameFilter, setFileNameFilter] = useState("");

	console.log(id);

	useEffect(() => {
		async function fetchZipFileData() {
		  const response = (await getZipFile(id)).data; 
		  console.log(response);
		  setZipFile(response);
		}
		fetchZipFileData();
	}, [id]); 

	function getColor(value) {
		//value from 0 to 1
		value = value / 10;
		var hue = ((1 - value) * 120).toString(10);
		return ["hsl(", hue, ",100%,50%)"].join("");
	}

	const getFiles = () => {
		let filteredFiles = [...zipfile.Files];
		if (fileNameFilter !== "") {
			filteredFiles = filteredFiles.filter((file) =>
				file.Name.startsWith(fileNameFilter)
			);
		}
		return filteredFiles;
	};

	const panes = [
		{
			menuItem: "Files",
			render: () => (
				<Grid>
					<Grid.Row>
						<Grid.Column style={{ width: "80%" }}>
							<Input
								style={{ width: "100%" }}
								placeholder="Search for File"
								onChange={(e) => setFileNameFilter(e.target.value)}
							/>
						</Grid.Column>
						<Grid.Column>
							<Button icon="sort"></Button>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Card.Group>
							{getFiles().map((file) => (
								<Card>
									<Card.Content>
										<Image
											floated="right"
											size="mini"
											src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
										/>
										<Card.Header>{file.Name}</Card.Header>
									</Card.Content>
									<Card.Content extra>
										<Icon color={"blue"} name="user" />
										<span style={{ color: "blue" }}>
											{file.ErrorCount}{" "}
											Detections
										</span>
									</Card.Content>
									<Card.Content extra>
										<Icon
											style={{
												color: getColor(file.SeverityScore),
											}}
											name="exclamation triangle"
										/>
										<span style={{ color: "black" }}>
											{file.SeverityScore} Severity Score
										</span>
									</Card.Content>
									<Card.Content extra>
										<div className="ui two buttons">
											{file.ErrorCount !== 0 ? (
												<Button
													basic
													color="primary"
													onClick={() => {
														var allErrors = [];
														console.log(file.Errors);
														console.log(file.PyErrors);
														if (file.Errors) {
															file.Errors.forEach(
																(error) => {
																	allErrors.push({
																		data: error,
																		fileName: file.Name,
																		type: "JS"
																	})
																}
															);
														}
														if (file.PyErrors) {
															file.PyErrors.forEach(
																(error) => {
																	allErrors.push({
																		data: error,
																		fileName: file.Name,
																		type: "PY"
																	})
																}
															);
														}
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
		{ menuItem: "Graphs", render: () => <ChartsPage file={zipfile} />  } // error - reading undefined map
	]

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
							{zipfile.Name}
							<Header.Subheader>
								Ran on {zipfile.Date}
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
									value={zipfile.FileCount}
								/>
							</Card.Description>
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							<Card.Description textAlign="center">
								<Statistic
									label="number of detections"
									value={zipfile.ErrorCount}
								/>
							</Card.Description>
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							<Card.Description textAlign="center">
								<Statistic
									label="Severity Score"
									value={zipfile.SeverityScore}
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
		
	)
}

export default ViewMorePage;