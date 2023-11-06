import type {FC, ReactElement} from "react";
import type {RecursiveTableRowProps} from "~/components/ExpandableTable";
import ExpandableTable from "~/components/ExpandableTable";
import ExpandCollapseToggle from "~/components/ExpandCollapseToggle";

export type ExpandableTableRowProps = {
    row: RecursiveTableRowProps;
    headers: string[];
    onDelete: (idKey: string, idValue: string) => void;
    onExpandToggle: (idKey: string, idValue: string) => void;
}

const ExpandableTableRow: FC<ExpandableTableRowProps> = ({
                                                             row,
                                                             headers,
                                                             onDelete,
                                                             onExpandToggle
                                                         }): ReactElement => {
    const hasKids = (row?.kids?.[Object.keys(row?.kids)[0]]?.records ?? []).length > 0;

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => onExpandToggle(Object.keys(row.data)[0], row.data[Object.keys(row.data)[0]])}>
                <td className="w-4 p-4">
                    {hasKids && <ExpandCollapseToggle
                        row={row}
                        onToggle={() => onExpandToggle(Object.keys(row.data)[0], row.data[Object.keys(row.data)[0]])}
                    />}
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
                            onClick={() => onDelete(Object.keys(row.data)[0], row.data[Object.keys(row.data)[0]])}
                    >
                        Remove
                    </button>
                </td>
            </tr>
            {row.isExpanded && hasKids && (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan={headers.length + 2} className="p-10">
                        <ExpandableTable
                            patients={row?.kids?.[Object.keys(row?.kids)[0]]?.records}
                            caption={Object.keys(row?.kids)[0]}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

export default ExpandableTableRow;
