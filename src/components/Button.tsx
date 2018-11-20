import React, {FunctionComponent} from "react";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {ButtonProps} from "./types/button";

export const Button: FunctionComponent<ButtonProps> = ({
    className,
    outlined = false,
    children,
    ...props
}) => {
    const buttonClass = classNames({
        "button": true,
        "outlined": outlined,
        ...getOptionalClasses(props)
    }, className);

    return (
        <button
            className={buttonClass}
            {...filterOutOptionalClasses(props)}
        >{children}</button>
    );
};