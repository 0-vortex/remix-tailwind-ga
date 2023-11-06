import type {ReactElement, FC} from 'react';
import { useMemo, useState} from 'react';
import type {TableRow} from "~/interfaces/TableRow";
import ExpandableTableRow from "~/components/ExpandableTableRow";

export type RecursiveTableRowProps = TableRow & {
    data: Record<string, string>;
    isExpanded?: boolean;
    kids?: Record<string, { records: RecursiveTableRowProps[] }>
};

const ExpandableTable: FC<{ patients: RecursiveTableRowProps[], caption?: string }> = ({patients, caption }): ReactElement => {
    const [rows, setRows] = useState<RecursiveTableRowProps[]>(patients);

    const headers = useMemo(
        () => (patients[0] ? Object.keys(patients[0].data) : []),
        [patients]
    );

    const handleExpandToggle = (idKey: string, idValue: string) => {
        setRows((currentRows) =>
            currentRows.map((row) =>
                row.data[idKey] === idValue ? {...row, isExpanded: !row.isExpanded} : row
            )
        );
    };

    const handleDelete = (idKey: string, idValue: string) => {
        setRows((currentRows) => currentRows.filter((row) => row.data[idKey] !== idValue));
    };

    if (rows.length === 0) {
        return <></>;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="table-auto w-full text-md text-left text-gray-500 dark:text-gray-400">
                {caption && (<caption
                    className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {caption}
                </caption>)}
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
                {rows.map((row) => (
                    <ExpandableTableRow
                        key={row.data[Object.keys(row.data)[0]]}
                        row={row}
                        headers={headers}
                        onDelete={handleDelete}
                        onExpandToggle={handleExpandToggle}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpandableTable;
