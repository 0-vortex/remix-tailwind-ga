import type {FC} from "react";
import type {RecursiveTableRowProps} from "~/components/ExpandableTable";

export type ExpandCollapseToggleProps = {
    row: RecursiveTableRowProps;
    onToggle?: () => void;
}

const ExpandCollapseToggle: FC<ExpandCollapseToggleProps> = ({ row }) => {
    if (!row.kids) {
        return null;
    }

    return (
        <button
            className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            aria-label={row.isExpanded ? 'Collapse' : 'Expand'}>
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox={row.isExpanded ? "0 0 18 2" : "0 0 18 18"}>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="2" d={row.isExpanded ? "M1 1h16" : "M9 1v16M1 9h16"}/>
            </svg>
        </button>
    );
};

export default ExpandCollapseToggle;
