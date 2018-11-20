import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface ColumnsProps extends OptionalClasses, ComponentProps<"div"> {
    segment?: boolean,
    unstackable?:boolean,
    breakpoint?: string,
    sizes?: number[],
}