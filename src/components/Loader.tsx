import React, {FunctionComponent} from "react";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {LoaderProps} from "./types/loader";

export const Loader: FunctionComponent<LoaderProps> = ({
    size = "medium",
    className = "",
    ...props
}) => (
    <div
        className={classNames({
            ...getOptionalClasses(props),
            [`loader-${size}`]: true
        }, className)}
        {...filterOutOptionalClasses(props)}
    />
);