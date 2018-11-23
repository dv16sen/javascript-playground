import React, {Component, ReactNode} from "react";
import {Page} from "../site-components/Page";
import ReactEditor from "../components/ReactEditor";
import decoratorCode from "../editor-code/decoratorCode";

class DecoratorPage extends Component {
    public render(): ReactNode {
        return (
            <Page>
                <h2>Decorators</h2>
                <hr/>
                <ReactEditor code={decoratorCode}/>
            </Page>
        );
    }
}

export default DecoratorPage;
