import React, {Component} from "react";
import ReactDOMServer from "react-dom/server";
import {classNames} from "../services/className";
import reactElementToJSXString from "react-element-to-jsx-string";
import AceEditor from "react-ace";
import prettifyHtml from "prettify-html";
import "brace/mode/html";
import "brace/mode/jsx";
import "brace/theme/tomorrow_night";
import {Menu} from "./Menu";
import {SourceContainerProps, SourceContainerState} from "./types/sourceContainer";

class SourceContainer extends Component<SourceContainerProps, SourceContainerState> {
    constructor(props: SourceContainerProps){
        super(props);

        this.state = {
            showJSX: false,
            showHTML: false
        }
    }

    childrenToJSXString = () => React.Children
        .map(this.props.children, (child) => reactElementToJSXString(child)).join("\n");

    childrenToHTMLString = () => prettifyHtml(
        ReactDOMServer.renderToStaticMarkup(this.props.children)
    );

    toggleShowHTML = () => this.setState(prevState => ({
        showJSX: false,
        showHTML: !prevState.showHTML
    }));

    toggleShowJSX = () => this.setState(prevState => ({
        showJSX: !prevState.showJSX,
        showHTML: false
    }));

    render(){
        const {editorProps, className, children, ...props} = this.props;
        const {showJSX, showHTML} = this.state;

        const containerClass = classNames({
            "source-container": true
        }, className);

        return (
            <div className={containerClass} {...props}>
                {children}
                {(showHTML && (
                    <AceEditor
                        width="100%"
                        height="400px"
                        mode="html"
                        theme="tomorrow_night"
                        value={this.childrenToHTMLString()}
                        readOnly={true}
                        editorProps={{$blockScrolling: Infinity}}
                        {...editorProps}
                    />
                ))}
                {(showJSX) && (
                    <AceEditor
                        width="100%"
                        height="400px"
                        mode="jsx"
                        theme="tomorrow_night"
                        value={this.childrenToJSXString()}
                        readOnly={true}
                        editorProps={{$blockScrolling: Infinity}}
                        {...editorProps}
                    />
                )}
                <Menu className="source-container-menu">
                    <div
                        className={`menu-item ${showHTML ? "active" : ""}`}
                        onClick={this.toggleShowHTML}
                    >
                        <i className="fab fa-html5"/>
                    </div>
                    <div
                        className={`menu-item ${showJSX ? "active" : ""}`}
                        onClick={this.toggleShowJSX}
                    >
                        <i className="fab fa-react"/>
                    </div>
                </Menu>
            </div>
        );
    }
}

export default SourceContainer;