import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface LoaderProps extends OptionalClasses, ComponentProps<"div"> {
    size?: string
}