import React from "react";
import { Menu } from "semantic-ui-react";

function Banner() {
	return (
		<div>
			<Menu inverted attached="top">
				<Menu.Menu position="right">
					<Menu.Item
						name="logout"
						active 
					></Menu.Item>
				</Menu.Menu>
			</Menu>
		</div>
	);
}

export default Banner;
