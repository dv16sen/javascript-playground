import {OptionalClasses} from "../../services/className";
import {ComponentProps, ReactElement} from "react";

export interface SortableTableState {
    table: {[x: number]: any}[],
    direction: string,
    clickedColumn: number
}

export interface SortableTableProps extends OptionalClasses, ComponentProps<"table"> {
    sortable: boolean,
    children: ReactElement<any>[]
}