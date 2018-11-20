import React, {FunctionComponent} from "react";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {HeroProps} from "./types/hero";

export const Hero: FunctionComponent<HeroProps> = ({
    segment = false,
    hero = true,
    className = "",
    children,
    ...props
}) => (
    <div className={classNames({
            ...getOptionalClasses(props),
            "segment": segment,
            "hero": hero
        }, className)}
        {...filterOutOptionalClasses(props)}
    >{children}</div>
);