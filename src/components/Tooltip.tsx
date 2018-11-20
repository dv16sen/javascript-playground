import React, {FunctionComponent} from "react";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {TooltipProps} from "./types/tooltip";

interface TooltipComponent<P = TooltipProps> extends FunctionComponent<P> {
    Container: FunctionComponent<P>
}

const Tooltip: TooltipComponent = ({
    segment = true,
    top = true,
    right,
    bottom,
    left = true,
    center,
    className,
    children,
    ...props
}) => (
    <div className={classNames({
        "tooltip": true,
        "top": top && !bottom,
        "right": right,
        "bottom": bottom,
        "left": left && !right,
        "center": center,
        ...getOptionalClasses(props),
        "segment": segment
    }, className)} {...filterOutOptionalClasses(props)}>{children}</div>
);

Tooltip.Container = ({className, children, ...props}) => (
    <div className={classNames({"tooltip-container": true}, className)} {...props}>
        {children}
    </div>
);

Tooltip.Container.displayName = "Tooltip.Container";

export default Tooltip;