import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import "../components/CSS/FilterResults.css";
import {Fragment, useMemo} from "react";

import {useTable, useFilters} from "react-table";
import Axios from "axios";
import {admin_header, domain, header} from "../env";
import {count} from "react-table/src/aggregations";
import {useGlobalState} from "../state/provider";
import axios from "axios";
// import data from '../components/data.json'


export const MultipleFilter1 = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
        // console.log(val);
        if (filterValue.includes(val.original.user_id)) arr.push(val);
        console.log(filterValue);
        console.log(val.original.user_id);
    });
    console.log(arr);
    return arr;
};

export const MultipleFilter2 = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
        // console.log(val);
        if (filterValue.includes(val.original.search_value)) arr.push(val);
        console.log(filterValue);
        console.log(val.original.search_value);
    });
    console.log(arr);
    return arr;
};

export const MultipleFilter3 = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
        // console.log(val);
        if (filterValue.includes(val.original.search_date)) arr.push(val);
        console.log(filterValue);
        console.log(val.original.search_date);
    });
    console.log(arr);
    return arr;
};

export const MultipleFilter4 = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
        // console.log(val);
        if (filterValue.includes(val.original.search_time)) arr.push(val);
        console.log(filterValue);
        console.log(val.original.search_time);
    });
    console.log(arr);
    return arr;
};


function setFilteredParams(filterArr, val) {
    console.log(filterArr);
    console.log(val);
    // if (val === undefined) return undefined;
    if (filterArr.includes(val)) {
        filterArr = filterArr.filter((n) => {
            return n !== val;
        });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
}

function SelectColumnFilter({
                                column: {filterValue = [], setFilter, preFilteredRows, id}
                            }) {
    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <Fragment>
            <div className="block">
                <span className="capitalize mb-4">{id}</span>
                {options.map((option: string, i) => {
                    return (
                        <Fragment key={i}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    id={option}
                                    name={option}
                                    value={option}
                                    onChange={(e) => {
                                        setFilter(setFilteredParams(filterValue, e.target.value));
                                    }}
                                ></input>
                                <label
                                    htmlFor={option}
                                    className="ml-1.5 font-medium text-gray-700"
                                >
                                    {option}
                                </label>
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </Fragment>
    );
}


const FilterResults = () => {

    const [data, setData] = useState(JSON.parse(localStorage.getItem('f_obj')));


    const columns = React.useMemo(
        () => [
            {
                Header: "User ID",
                accessor: "user_id", // accessor is the "key" in the data
                Filter: SelectColumnFilter,
                filter: MultipleFilter1
            },
            {
                Header: "Searched Value",
                accessor: "search_value",
                Filter: SelectColumnFilter,
                filter: MultipleFilter2
            },
            {
                Header: "Searched Date",
                accessor: "search_date",
                Filter: SelectColumnFilter,
                filter: MultipleFilter3
            },
            {
                Header: "Searched Time",
                accessor: "search_time",
                Filter: SelectColumnFilter,
                filter: MultipleFilter4
            }
        ],
        []
    );
    console.log(data)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data}, useFilters);

    return (
        <Fragment>
            <button className="btn btn-danger btn-control" onClick={() => {
                window.localStorage.clear();
                window.location.href = '/';
            }}>Logout</button>
            <table {...getTableProps()} className="text-sm obj">
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                <div>{column.canFilter ? column.render("Filter") : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
            </table>
            <table {...getTableProps()} style={{border: "solid 1px blue"}} className="obj">
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: "solid 3px red",
                                    background: "aliceblue",
                                    color: "black",
                                    fontWeight: "bold"
                                }}
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px",
                                            border: "solid 1px gray",
                                            background: "papayawhip"
                                        }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </Fragment>
    );
}

export default FilterResults
