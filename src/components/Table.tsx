import React, {FunctionComponent} from "react";
import {compose} from "redux";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {TableProps} from "./types/table";

export const filterOutTableOptions = ({
    className,
    sortable,
    collapse,
    striped,
    clickable,
    ...props
}: Partial<TableProps>) => props;

export const getTableClass = (tableType: string, {
    className,
    collapse,
    striped,
    sortable,
    clickable,
    ...props
}: Partial<TableProps>) => classNames({
    [tableType]: true,
    "striped": striped,
    "clickable": clickable,
    "sortable": sortable,
    "collapse": collapse,
    ...getOptionalClasses(props)
}, className);

export const Table: FunctionComponent<TableProps> = ({children, ...props}) => (
    <table
        className={getTableClass("table", props)}
        {...compose(filterOutTableOptions, filterOutOptionalClasses)(props)}
    >{children}</table>
);

export const StackedTable: FunctionComponent<TableProps> = ({children, ...props}) => (
    <table
        className={getTableClass("stacked-table", props)}
        {...compose(filterOutTableOptions, filterOutOptionalClasses)(props)}
    >{children}</table>
);

export const DefinitionTable: FunctionComponent<TableProps> = ({children, ...props}) => (
    <table
        className={getTableClass("definition-table", props)}
        {...compose(filterOutTableOptions, filterOutOptionalClasses)(props)}
    >{children}</table>
);

export const ListTable: FunctionComponent<TableProps> = ({children, ...props}) => (
    <table
        className={getTableClass("list-table", props)}
        {...compose(filterOutTableOptions, filterOutOptionalClasses)(props)}
    >{children}</table>
);