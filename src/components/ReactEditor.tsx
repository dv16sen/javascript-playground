import React, {ComponentProps, FunctionComponent} from "react";
import {Sandbox, withDependencies } from "react-sandbox-editor";

const ReactSandbox = withDependencies([
    "https://unpkg.com/react@16.6.3/umd/react.development.js",
    "https://unpkg.com/react-dom@16.6.0/umd/react-dom.development.js"
])(Sandbox);

interface Props extends ComponentProps<"div"> {
    code: string
}

export const ReactEditor: FunctionComponent<Props> = ({code, ...props}) => {
    const numberOfLines = code.split("\n").length;

    return (
        <ReactSandbox
            style={{
                height: `${30 * numberOfLines}px`,
            }}
            classes={{header: "hide"}}
            displayMode="horizontal-split" //Make the result show beneath code
            selectedTab="scriptTab" //Set the tab to whichever you'd like
            theme="twilight"
            scriptEditor={{
                defaultValue: code,
                mode: "jsx",
                readOnly: false,
                wrapLines: true,
            }}
            templateEditor={{
                defaultValue: '<div id="root"></div>',
                mode: "html",
                readOnly: true,
                wrapLines: true,
            }}
            executeOnCodeChange={true}
            executeOnCodeChangeDebounce={1000}
            {...props}
        />
    );
}

export default ReactEditor;