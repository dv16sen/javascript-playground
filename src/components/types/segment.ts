import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface SegmentProps extends OptionalClasses, ComponentProps<"div"> {
    segment?: boolean
}