import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface HeroProps extends OptionalClasses, ComponentProps<"div"> {
    segment?: boolean,
    hero?: boolean
}