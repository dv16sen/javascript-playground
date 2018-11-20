import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface MessageProps extends OptionalClasses, ComponentProps<"div"> {
    message?: true,
    heading?: JSX.Element | string,
    list?: any
}