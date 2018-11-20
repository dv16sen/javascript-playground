import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface MenuProps extends OptionalClasses, ComponentProps<"nav"> {
    vertical?: boolean,
    right?: boolean,
    center?: boolean,
    fixed?: boolean,
}