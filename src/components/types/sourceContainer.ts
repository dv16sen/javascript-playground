import {ComponentProps, ReactElement} from "react";
import {AceEditorProps} from "react-ace";

export interface SourceContainerState {
    showJSX: boolean,
    showHTML: boolean
}

export interface SourceContainerProps extends ComponentProps<"div"> {
    editorProps?: AceEditorProps,
    children: ReactElement<any>
}