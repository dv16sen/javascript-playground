import React, {FunctionComponent, ComponentProps} from "react";
import {colors} from "../services/colors";

export const ColorDropdown: FunctionComponent<ComponentProps<"select">> = (props) => (
    <select {...props}>
        {colors.map((color, i) => (
            <option value={color} key={i}>{color}</option>
        ))}
    </select>
);