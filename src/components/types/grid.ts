import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface GridProps extends OptionalClasses, ComponentProps<"div"> {
    columns?: number | string,
    rows?: number | string,
    dense?: number,
    autoFlow?: string,
    inline?: boolean,
    gap?: number | string
}