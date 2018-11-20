import React, {FunctionComponent} from "react";
import {Columns} from "./Columns";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {FormProps} from "./types/form";

interface FormComponent<P = FormProps> extends FunctionComponent<P> {
    Columns: FunctionComponent
}

const Form: FormComponent = ({className, children, ...props}) => (
    <form className={classNames({"form": true, ...getOptionalClasses(props)}, className)}
          {...filterOutOptionalClasses(props)}
    >{children}</form>
);

const FormColumns: FunctionComponent = ({children, ...props}) => {
    let columns: any[] = [];
    let columnChildren: any[] = [];

    React.Children.forEach(children, (child: any, i) => {
        if(child.props.className && child.props.className.includes("column")){
            columns.push(child);
        } else {
            columnChildren.push(child);

            if(child.type !== "label"){
                columns.push(React.createElement("div", {
                    className: "column",
                    size: child.props.size,
                    key: i
                }, columnChildren));
                columnChildren = [];
            }
        }
    });

    return (
        <Columns {...props}>
            {columns}
        </Columns>
    );
};

Form.Columns = FormColumns;
Form.Columns.displayName = "Form.Columns";

export default Form;