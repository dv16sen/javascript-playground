import React, {FunctionComponent} from "react";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {SegmentProps} from "./types/segment";

interface SegmentComponent<P = SegmentProps> extends FunctionComponent<P> {
    List: FunctionComponent<P>
}

const Segment: SegmentComponent = ({
    segment = true,
    className = "",
    children,
    ...props
}) =>  (
    <div className={classNames({
        ...getOptionalClasses(props),
        "segment": segment
    }, className)} {...filterOutOptionalClasses(props)}>{children}</div>
);

Segment.List = ({className = "", children, ...props}) => (
    <div className={classNames({
        ...getOptionalClasses(props),
        "segment-list": true
    }, className)} {...filterOutOptionalClasses(props)}>
        {children}
    </div>
);

Segment.List.displayName = "Segment.List";

export default Segment;