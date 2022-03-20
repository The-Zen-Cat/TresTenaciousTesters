import React, { useState } from "react";
import axios from "axios";
import { Grid, Icon, Segment, Header } from "semantic-ui-react";

function MetricsPage() {

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
            <Grid.Row>
                TODO Someone needs to make this page
            </Grid.Row>
        </Grid>
    );
}

export default MetricsPage;
