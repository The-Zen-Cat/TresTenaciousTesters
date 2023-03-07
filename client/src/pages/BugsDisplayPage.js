import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Grid,
	Card,
	Form,
	Button,
	Icon,
	Segment,
	Header,
	Table,
} from "semantic-ui-react";

//TO-DO redesign this

import { getErrorTypes, getErrorTypesNum, getErrorTypesPY, getPYErrorIDs, getErrorTypesPHP, getPHPErrorIDs } from "../client/API.js";

function BugsPage() {
	const [nameArrayJS, setNameArrayJS] = useState([]);
	const [severityArrayJS, setSeverityArrayJS] = useState([]);
	const [descriptionArrayJS, setDescriptionArrayJS] = useState([]);
	const [arrayJS, setArrayJS] = useState([]);

	const [nameArrayPY, setNameArrayPY] = useState([]);
	const [severityArrayPY, setSeverityArrayPY] = useState([]);
	const [descriptionArrayPY, setDescriptionArrayPY] = useState([]);
	const [CWEArrayPY, setCWEArrayPY] = useState([]);
	const [moreInfoArrayPY, setMoreInfoArrayPY] = useState([]);
	const [groupArrayPY, setGroupArrayPY] = useState([]);

	const pyIndexes = [101,102,103,104,105,106,107,108,109,110,111,112,113,201,202,324,501,501,503,504,505,506,507,508,509,601,602,603,604,605,606,607,608,609,610,611,612,701,702,703]

	const [nameArrayPHP, setNameArrayPHP] = useState([]);
	const [severityArrayPHP, setSeverityArrayPHP] = useState([]);
	const [descriptionArrayPHP, setDescriptionArrayPHP] = useState([]);
	const [arrayPHP, setArrayPHP] = useState([]);

	const phpIndexes = [-1,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024]


	function ArrayAdderJS(name, severity, description) {
		// Delete this later
		setNameArrayJS((nameArrayJS) => [...nameArrayJS, name]);
		setSeverityArrayJS((severityArrayJS) => [...severityArrayJS, severity]);
		setDescriptionArrayJS((descriptionArrayJS) => [
			...descriptionArrayJS,
			description,
		]);
	}

	function ArrayAdderPY(name, severity, description, CWE, moreInfo, group) {
		// Delete this later
		setNameArrayPY((nameArrayPY) => [...nameArrayPY, name]);
		setSeverityArrayPY((severityArray) => [...severityArray, severity]);
		setDescriptionArrayPY((descriptionArrayPY) => [...descriptionArrayPY, description]);
		setCWEArrayPY((CWEArrayPY) => [...CWEArrayPY, CWE]);
		setMoreInfoArrayPY((moreInfoArrayPY) => [...moreInfoArrayPY, moreInfo]);
		setGroupArrayPY((groupArrayPY) => [...groupArrayPY, group]);
	}

	function ArrayAdderPHP(name, severity, description) {
		// Delete this later
		setNameArrayPHP((nameArrayPHP) => [...nameArrayPHP, name]);
		setSeverityArrayPHP((severityArrayPHP) => [...severityArrayPHP, severity]);
		setDescriptionArrayPHP((descriptionArrayPHP) => [
			...descriptionArrayPHP,
			description,
		]);
	}

	useEffect(async () => {
		var counter = await getErrorTypesNum();
		console.log(counter.data);
                let arrayJS = [];
		for (let i = 0; i < counter.data; i++) {
			const results = (await getErrorTypes(i)).data;
			ArrayAdderJS(results.Name, results.Severity, results.Description);
			console.log(results.Name);
                        arrayJS.push({ CWE: results.CWE, MoreInfo: results.MoreInfo });
		}
		setArrayJS(arrayJS);
		// var counterPY = await getErrorTypesNumPY();
		console.log(counter.data);
		const pyIndexesTesting = await getPYErrorIDs();

		for (const indexPY of pyIndexes) {
			const resultsPy = (await getErrorTypesPY(indexPY)).data;
			ArrayAdderPY(resultsPy.Name, resultsPy.Severity, resultsPy.Description, resultsPy.CWE, resultsPy.MoreInfo, resultsPy.Group);
			console.log(resultsPy.Name);
		}

		var phpCounter = await getPHPErrorIDs();
		console.log(phpCounter.data);
		let arrayPHP = [];
		for (let j = 0; j < phpCounter.data; j++) {
			const resultsPHP = (await getErrorTypesPHP(j)).data;
			ArrayAdderPHP(resultsPHP.Name, resultsPHP.Severity, resultsPHP.Description);
			console.log(resultsPHP.Name);
						arrayPHP.push({ CWE: resultsPHP.CWE, MoreInfo: resultsPHP.MoreInfo });
		}
		setArrayPHP(arrayPHP);
		console.log(phpCounter.data);
	}, []);

	// useEffect(async () => {
	// 	var counter = await getErrorTypesNumPY();
	// 	console.log(counter.data);
	// 	for (let i = 0; i < counter.data; i++) {
	// 		const results = (await getErrorTypesPY(B102)).data;
	// 		ArrayAdderPY(results.Name, results.Description, results.CWE, results.MoreInfo, results.Group);
	// 	}
	// 	console.log(results);
	// }, []);

	//TODO: END GAME add Checkboxs to columns that allow the user to turn on and off the displaying of those detections
	const getTableRowsJavaScript = () => {
		return (
			<div>
				{Array.from({ length: 24 }).map((_, index) => (
					<tr>
						<Table bordered hover>
							<td>
								<tr><b>  {nameArrayJS[index]} </b></tr>
								<tr>Severity Level: {severityArrayJS[index]}</tr>
								{arrayJS[index] && arrayJS[index].CWE && <tr>CWE: <a href={arrayJS[index].CWE} target="_blank" rel="noopener noreferrer">Link</a></tr>}
								{arrayJS[index] && arrayJS[index].MoreInfo && <tr>More Info: <a href={arrayJS[index].MoreInfo} target="_blank" rel="noopener noreferrer">Link</a></tr>}
							</td>
						</Table>
						<td>Description: {descriptionArrayJS[index]}</td>
					</tr>
				))}
			</div>
		);
	};

	const getTableRowsPython = () => {
		return (
			<div>
				{Array.from({ length: 40 }).map((_, index) => (
					<tr>
						<Table bordered hover>
							<td>
								<tr><b>  {nameArrayPY[index]} </b></tr>
								<tr>Severity Level: {severityArrayPY[index]} </tr>
								<tr>CWE: <a href={CWEArrayPY[index]} target="_blank" rel="noopener noreferrer">Link</a> </tr>
								<tr>More Info: <a href={moreInfoArrayPY[index]} target="_blank" rel="noopener noreferrer">Link</a> </tr>
								<tr>Group: {groupArrayPY[index]} </tr>
							</td>
						</Table>
						<td>Description: {descriptionArrayPY[index]}</td>
					</tr>
				))}
			</div>
		);
	};
	
	const getTableRowsPHP = () => {
		return (
			<div>
				{Array.from({ length: 39 }).map((_, index) => (
					<tr>
						<Table bordered hover>
							<td>
								<tr><b>  {nameArrayPHP[index]} </b></tr>
								<tr>Severity Level: {severityArrayPHP[index]}</tr>
								{arrayPHP[index] && arrayPHP[index].CWE && <tr>CWE: <a href={arrayPHP[index].CWE} target="_blank" rel="noopener noreferrer">Link</a></tr>}
								{arrayPHP[index] && arrayPHP[index].MoreInfo && <tr>More Info: <a href={arrayPHP[index].MoreInfo} target="_blank" rel="noopener noreferrer">Link</a></tr>}
							</td>
						</Table>
						<td>Description: {descriptionArrayPHP[index]}</td>
					</tr>
				))}
			</div>
		);
	};

	return (
		<Grid style={{ padding: "1.5vw" }}>
			<Grid.Row>
				<Segment style={{ width: "100%" }} fluid>
					<div>
						<Header as="h2" icon textAlign="center">
							<Icon name="bug" circular />
							<Header.Content>
								Security Issues Being Detected
							</Header.Content>
						</Header>
					</div>
				</Segment>
			</Grid.Row>
			<Grid.Row>


				<Table>

			
   
    <thead>
		
        <tr>
            <th  style={{ width: "33%" }}>Severity Score (Zip Folders/Students) </th>
            <th style={{ width: "67%" }}> Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
			<td>No Security Concerns                                                                                   </td>
        </tr>
        <tr>
            <td>3</td>
            <td>A Few Minor Security Concerns                                                                          </td>
        </tr>
		<tr>
            <td>5</td>
            <td>A Few Security Conerns/Many Minor Security Concerns                                                     </td>
        </tr>
		<tr>
            <td>8</td>
            <td>A Major Security Concern/Many Security Concerns                                                         </td>
        </tr>
		<tr>
            <td>10</td>
            <td>Many Major Security Concerns</td>
        </tr>
    </tbody>
	<br></br>
				</Table>


				<Table>

			
   
    <thead>
        <tr>
            <th style={{ width: "33%" }}>Severity Level (Security Flaw/Detections) </th>
            <th style={{ width: "67%" }}> Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0</td>
			<td>Score Given to Any Unidentified Issues by ESLint (Most likely not a security concern) </td>
        </tr>
        <tr>
            <td>1</td>
            <td> Not a Security Concern </td>
        </tr>
		<tr>
            <td>2</td>
            <td>Minor Security Concern (Can lead to potential attacks, but will generally not result in a data breach) </td>
        </tr>
		<tr>
            <td>5</td>
            <td>Mid-Level Security Concern/Many Security Concerns (Can lead to a potential data breach/assault on the server)</td>
        </tr>
		<tr>
            <td>10</td>
            <td>Major Security Concerns (Can lead to complete access to the entire server/allow for foreign code to be executed) </td>
        </tr>
		
    </tbody>
	
	<br></br>
				</Table>
			</Grid.Row>
			<Table striped bordered hover>
					<thead>
						<tr>
							<th>Python Security Issue Types</th>
						</tr>
					</thead>
					<tbody>{getTableRowsPython()}</tbody>
	
					<br></br>

				</Table>

			<Table striped bordered hover>
					<thead>
						<tr>
							<th>JavaScript Security Issue Types</th>
						</tr>
					</thead>
					<tbody>{getTableRowsJavaScript()}</tbody>
	
					<br></br>

				</Table>

			<Table striped bordered hover>
					<thead>
						<tr>
							<th>PHP Security Issue Types</th>
						</tr>
					</thead>
					<tbody>{getTableRowsPHP()}</tbody>
	
					<br></br>

				</Table>

		</Grid>
	);
}

export default BugsPage;