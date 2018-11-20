import React, {Component, ComponentType} from "react";
import Form from "../components/Form";
import {AndroidCheckbox} from "../components/Checkboxes";
import {ColorDropdown} from "../components/ColorDropdown";
import {Columns} from "../components/Columns";

export default (state: {[key: string]: any} = null) => (ChildComponent: ComponentType<any>) => (
    class OptionsForm extends Component {
        state: {[key: string]: any};

        constructor(props: React.ComponentProps<"div">){
            super(props);

            const defaultState = {
                className: "white",
                inverted: false,
                segment: false,
                message: false,
                light: false,
                glass: false,
                inset: false,
                hero: false
            };

            this.state = (state) ? state : defaultState;
        };

        renderForm = ({children, ...props}: React.ComponentProps<"div">) => {
            return (
                <Form message className="white mb-15" {...props}>
                    <Columns className="pt-15">
                        {this.state.className && (
                            <div className="column span-3">
                                <label>color</label>
                                <ColorDropdown
                                    value={this.state.className}
                                    onChange={(event) => {
                                        this.setState({className: event.target.value});
                                    }}
                                />
                            </div>
                        )}
                        <Columns className="pl-30">
                            {Object.keys(this.state)
                                .filter(state => state !== "className")
                                .map((state, i) => (
                                    <div className="column span-2 span-3-sm span-4-xs" key={i}>
                                        <label>{state}</label>
                                        <AndroidCheckbox
                                            id={`checkbox-${i}`}
                                            checked={this.state[state]}
                                            onChange={(event) => this.setState({
                                                [state]: event.target.checked
                                            })}
                                        />
                                    </div>
                                ))}
                        </Columns>
                    </Columns>
                    {children}
                </Form>
            );
        };

        render(){
            return (
                <ChildComponent
                    renderForm={this.renderForm}
                    options={this.state}
                />
            );
        }
    }
);