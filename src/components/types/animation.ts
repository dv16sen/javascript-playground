import {ComponentProps} from "react";

export interface AnimationProps extends ComponentProps<"div"> {
    animation?: string,
    duration?: number,
}