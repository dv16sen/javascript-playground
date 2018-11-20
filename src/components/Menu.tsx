import React, {FunctionComponent} from "react";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {MenuProps} from "./types/menu";

export const Menu: FunctionComponent<MenuProps> = ({
    className = "",
    vertical = false,
    right = false,
    center = false,
    fixed = false,
    children,
    ...props
}) => {
    const menuClass = classNames({
        "menu": true,
        "vertical": vertical,
        "right": right,
        "center": center,
        "fixed": fixed,
        ...getOptionalClasses(props)
    }, className);

    return (
        <nav className={menuClass} {...filterOutOptionalClasses(props)}>
            {children}
        </nav>
    );
};