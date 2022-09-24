import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Icon, Segment, Header } from "semantic-ui-react";
import { ZipChartsPage } from "../components/ChartsPage";
import { getZipFileMetadata } from "../client/API.js";

function MetricsPage() {
	const [files, setFiles] = useState([]);

	useEffect(async () => {
		const results = (await getZipFileMetadata()).data
			.zipFileData;
		console.log(results);
		setFiles(
			results.map((result) => {
				return {
					id: result._id,
					name: result.Name,
					date: result.Date,
					fileCount: result.FileCount,
					errorCount: result.ErrorCount,
					severityScore: result.SeverityScore,
				};
			})
		);
	}, []);

	return (
		<Grid style={{ padding: "1.5vw" }}>
			<Grid.Row>
				<Segment style={{ width: "100%" }} fluid>
					<div>
						<Header as="h2" icon textAlign="center">
							<Icon name="bar chart" circular />
							<Header.Content>Analyze Data</Header.Content>
						</Header>
					</div>
				</Segment>
			</Grid.Row>
			<Grid.Row>{<ZipChartsPage files={files} />}</Grid.Row>
		</Grid>
	);
}

export default MetricsPage;