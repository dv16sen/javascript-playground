import React, {CSSProperties, FunctionComponent} from "react";
import {classNames, getOptionalClasses} from "../services/className";
import {GridProps} from "./types/grid";

export const Grid: FunctionComponent<GridProps> = ({
    className,
    columns,
    rows,
    dense,
    autoFlow,
    inline = false,
    gap = "15px",
    children,
    style = {},
    ...props
}) => {
    const isNumber = (value: any) => value && !isNaN(value);

    const gridClass: string = classNames({
        "grid": true,
        [`grid-col-${columns}`]: isNumber(columns),
        [`grid-row-${rows}`]: isNumber(rows),
        "inline-grid": inline,
        ...getOptionalClasses(props),
    }, className);

    const gridStyles: CSSProperties = {
        gap: (isNumber(gap)) ? `${gap}px` : gap,
        gridAutoFlow: autoFlow,
        ...style
    };

    return (
        <div className={gridClass} style={gridStyles}>
            {children}
        </div>
    );
};