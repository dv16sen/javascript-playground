import {OptionalClasses} from "../../services/className";
import {ComponentProps} from "react";

export interface TableProps extends OptionalClasses, ComponentProps<"table"> {
    sortable?: boolean,
    collapse?: boolean,
    striped?: boolean,
    clickable?: boolean,
}