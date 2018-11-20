import React, {Component, ReactElement} from "react";
import {filterOutOptionalClasses, joinClassNames} from "../services/className";
import _ from "lodash";
import {filterOutTableOptions, getTableClass} from "./Table";
import {compose} from "redux";
import {SortableTableState, SortableTableProps} from "./types/sortableTable";

class SortableTable extends Component<SortableTableProps, SortableTableState> {
    static defaultProps = {
        className: "",
        sortable: true
    };

    thead: ReactElement<any>;
    theadTr: ReactElement<any>;
    ths: ReactElement<any>[];
    tbody: ReactElement<any>;
    tbodyTrs: ReactElement<any>[];

    constructor(props: SortableTableProps){
        super(props);

        this.thead = props.children[0];
        this.theadTr = this.thead.props.children;
        this.ths = this.theadTr.props.children;
        const headings = this.ths.map(th => th.props.children);
        this.tbody = props.children[1];
        this.tbodyTrs = this.tbody.props.children;
        let table = this.tbodyTrs.map(tr => headings.map((th, i) => ({
            [th]: tr.props.children[i].props.children
        })).reduce((acc, next) => Object.assign({}, acc, next)));

        this.state = {
            table,
            direction: "none",
            clickedColumn: -1
        };
    }

    sortBy = (th: string, column: number) => async () => {
        const {clickedColumn, direction, table} = this.state;

        const ascending = clickedColumn !== column || direction !== "asc";
        const sortDirection = (ascending) ? "asc" : "desc";

        this.setState({
            table: _.orderBy(table, [th], [sortDirection]),
            direction: sortDirection,
            clickedColumn: column
        });
    };

    getHeadingClass = (column: number, className: string) => {
        if(className === "no-sort") return "";

        const {clickedColumn, direction} = this.state;

        return (clickedColumn === column) ? `sortable ${direction}` : "sortable";
    };

    getHeadingProps = (th: ReactElement<any>, column: number, heading: string) => {
        const className = (th.props.className) ? th.props.className : "";

        return Object.assign({}, {
            onClick: (className.includes("no-sort")) ? () => {} : this.sortBy(heading, column)
        }, th.props, {
            className: (className.includes("no-sort"))
                ? className
                : joinClassNames(this.getHeadingClass(column, className), className)
        });
    };

    filterExtraProps = ({children, ...props}: Partial<SortableTableProps>) => props;

    render(){
        const {table} = this.state;

        return (
            <table className={getTableClass("table", this.props)} {...compose(
                this.filterExtraProps,
                filterOutTableOptions,
                filterOutOptionalClasses
            )(this.props)}>
                <thead {...this.thead.props}>
                    <tr {...this.theadTr.props}>
                        {Object.keys(this.state.table[0]).map((th, i) => (
                            <th key={i}
                                {...this.getHeadingProps(this.ths[i], i, th)}
                            >{th}</th>
                        ))}
                    </tr>
                </thead>
                <tbody {...this.tbody.props}>
                    {table.map((row, i) => (
                        <tr key={i} {...this.tbodyTrs[i].props}>
                            {Object.values(row).map((td, j) => (
                                <td key={j} {...this.tbodyTrs[i].props.children[j].props}>{td}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default SortableTable;