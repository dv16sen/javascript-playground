import React, {Component, ReactNode} from "react";
import {Page} from "../site-components/Page";

class HomePage extends Component {
    public render(): ReactNode {
        return (
            <Page>
                <h2>Javascript Playground</h2>
                <hr/>
            </Page>
        );
    }
}

export default HomePage;
