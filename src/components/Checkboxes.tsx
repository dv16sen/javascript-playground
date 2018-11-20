import React, {FunctionComponent} from "react";
import {joinClassNames} from "../services/className";
import {BouncingCheckboxProps, AndroidCheckboxProps} from "./types/checkboxes";

export const BouncingCheckbox: FunctionComponent<BouncingCheckboxProps> =
    ({className = "", ...props}) => (
        <div className="bouncing-checkbox">
            <input type="checkbox" {...props}/>
            <div className={joinClassNames("checkbox", className)}/>
        </div>
    );

export const AndroidCheckbox: FunctionComponent<AndroidCheckboxProps> = ({
    id = "android-checkbox-1",
    className = "",
    label = "",
    ...props
}) => (
    <label htmlFor={id} className={joinClassNames("android-checkbox", className)}>
        <input id={id} type="checkbox" {...props}/>
        <div className="inner">
            <svg width="20px" height="20px" viewBox="0 0 20 20">
                <path
                    d={
                        "M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 " +
                        "L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 " +
                        "C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 " +
                        "1.8954305,1 3,1 Z"
                    }
                />
                <polyline points="4 11 8 15 16 6"/>
            </svg>
        </div>
        <span>{label}</span>
    </label>
);