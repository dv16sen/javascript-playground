import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface TooltipProps extends OptionalClasses, ComponentProps<"div"> {
    segment?: boolean,
    top?: boolean,
    right?: boolean,
    bottom?: boolean,
    left?: boolean,
    center?: boolean
}