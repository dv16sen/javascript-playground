import React, {FunctionComponent} from "react";
import {classNames, filterOutOptionalClasses, getOptionalClasses} from "../services/className";
import {MessageProps} from "./types/message";

export const Message: FunctionComponent<MessageProps> = ({
    message = true,
    heading,
    list = [],
    children,
    className,
    ...props
}) => {
    const messageClass = classNames({
        ...getOptionalClasses(props),
        "message": message
    }, className);

    return (
        <div className={messageClass} {...filterOutOptionalClasses(props)}>
            {(heading) && (<h4 className="heading">{heading}</h4>)}
            {(list.length > 0) && (
                <ul>
                    {list.map((listItem: any, i: number) => <li key={i}>{listItem}</li>)}
                </ul>
            )}
            {children}
        </div>
    );
};