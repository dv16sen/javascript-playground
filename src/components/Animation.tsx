import React, {FunctionComponent} from "react";
import {classNames} from "../services/className";
import {AnimationProps} from "./types/animation";

export const Animation: FunctionComponent<AnimationProps> = ({
    animation = "fadeIn",
    className,
    duration = 1000,
    children,
    ...props
}) => {
    const animationClass = classNames({
        "animated": true,
        [animation]: true
    }, className);

    const style = {
        animationDuration: `${duration / 1000}s`
    };

    return <div className={animationClass} style={style} {...props}>{children}</div>;
};