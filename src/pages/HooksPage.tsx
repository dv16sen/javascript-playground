import React, {Component, ReactNode} from "react";
import {Page} from "../site-components/Page";
import hooksCode from "../editor-code/hooksCode";
import ReactEditor from "../components/ReactEditor";

class HooksPage extends Component {
    public render(): ReactNode {
        return (
            <Page>
                <h2>Hooks</h2>
                <hr/>
                <ReactEditor code={hooksCode}/>
            </Page>
        );
    }
}

export default HooksPage;
