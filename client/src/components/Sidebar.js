import React from "react";
import { Icon, Menu } from "semantic-ui-react";

function Sidebar(props) {
	const { updateRouteHandler, updateZipFileHandler } = props;

	const updateRoute = (route) => {
		updateZipFileHandler("undefined");
		updateRouteHandler(route);
	};

	return (
		<>
			<Menu inverted compact style={{ width: "100%" }}>
				<Menu.Item header>codeChomper</Menu.Item>
			</Menu>
			<Menu
				vertical
				style={{
					padding: 0,
					margin: 0,
					width: "100%",
					height: "100%",
				}}
			>
				<Menu.Item
					name="gamepad"
					active={false}
					onClick={() => updateRoute("main")}
				>
					<Icon name="globe" />
					Overview
				</Menu.Item>

				<Menu.Item
					name="upload"
					active={false}
					onClick={() => updateRoute("upload")}
				>
					<Icon name="upload" />
					Upload Code
				</Menu.Item>

				<Menu.Item
					name="bug"
					active={false}
					onClick={() => updateRoute("BugListPage")}
				>
					<Icon name="bug" />
					Detectable Security Issues
				</Menu.Item>
				<Menu.Item
					name="video play"
					active={false}
					onClick={() => updateRoute("MetricsPage")}
				>
					<Icon name="chart bar" />
					Metrics
				</Menu.Item>

				<Menu.Item
				  name="reports"
					active={false}
					onClick={() => updateRoute("DownloadReportPage")}
					>
						<Icon name="download" />
						Download Reports
					</Menu.Item>
			</Menu>
		</>
	);
}

export default Sidebar;
