import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface ButtonProps extends OptionalClasses, ComponentProps<"button"> {
    outlined?: boolean,
}