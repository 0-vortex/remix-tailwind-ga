import {ReactElement, FC, useState, Fragment} from 'react';
import type {TableRow} from "~/interfaces/TableRow";

export type RecursiveTableRow = TableRow & {
    isExpanded: boolean;
    parentId?: string;
    children?: RecursiveTableRow[];
}

const RecursiveTable: FC<{ patients: TableRow[] }> = ({patients}): ReactElement => {
    const headers = Object.keys(patients[0]?.data ?? {});
    const [data, setData] = useState(patients ?? []);

    const updateState = () => {
        setData([...patients]);
    }

    const expandRow = (row: RecursiveTableRow) => {
        // row.children = patients[0]?.kids?.has_relatives?.records as RecursiveTableRow[];
        // row.children = [
        //     {
        //         isExpanded: false,
        //         parentId: row.id
        //     },
        // ];
        row.isExpanded = true;
        updateState();
        // updateState(row.id, { isExpanded: true });
    };

    const collapseRow = (row: RecursiveTableRow) => {
        delete row.children;
        row.isExpanded = false;
        updateState();
        // updateState(row.id, { isExpanded: false });
    };

    const deleteRow = (rows: RecursiveTableRow[], idx: number) => {
        rows.splice(idx, 1);
        updateState();
    }

    const ExpandCollapsToggle = ({row, expandRow, collapseRow}: {
        row: RecursiveTableRow,
        expandRow: any,
        collapseRow: any
    }) => {
        if ((row.children?.length ?? 0) === 0) {
            return null;
        }

        if (row.isExpanded) {
            return (
                <button
                    className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button" onClick={() => collapseRow(row)}>
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="M1 1h16"/>
                    </svg>
                </button>
            );
        } else {
            return (
                <button
                    className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button" onClick={() => expandRow(row)}>
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            );
        }
    };

    const ExpandableTableRow = ({ rows }: { rows: RecursiveTableRow[] }): ReactElement => {
        return (
            <>
                {rows && rows.length !== 0 && rows.map((row, idx) => {
                    if (row?.kids?.has_relatives?.records && !row.children) {
                        row.children = (row?.kids?.has_relatives?.records as RecursiveTableRow[]) ?? [];
                    }

                    if (row?.kids?.has_phone?.records && !row.children) {
                        row.children = (row?.kids?.has_phone?.records as RecursiveTableRow[]) ?? [];
                    }

                    return (
                        <Fragment key={idx}>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={idx}>
                                <td className="w-4 p-4">
                                    <ExpandCollapsToggle
                                        row={row}
                                        expandRow={expandRow}
                                        collapseRow={collapseRow}
                                    />
                                </td>
                                {headers.map((header, idx) => {
                                    let value = row.data[header];

                                    if (header === 'Knows the Joker?' && !value) {
                                        value = 'false';
                                    }

                                    if (header === 'Gender' && !value) {
                                        value = 'M';
                                    }

                                    return (
                                        <td className="px-6 py-4" key={idx}>{value}</td>
                                    );
                                })}
                                <td className="w-4 p-4">
                                    <button type="button"
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={() => deleteRow(rows, idx)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                            {row.children && row.children.length > 0 && row.isExpanded && (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td colSpan={headers.length + 2} className="p-10">
                                        <RecursiveTable patients={row.children} />
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    );
                })}
            </>
        );
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="table-auto w-full text-md text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-4"></th>
                    {headers.map((header, idx) => (
                        <th scope="col" className="px-6 py-3" key={idx}>{header}</th>
                    ))}
                    <th scope="col" className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                    <ExpandableTableRow rows={patients as RecursiveTableRow[]}/>
                </tbody>
            </table>
        </div>
    );
}

export default RecursiveTable;
