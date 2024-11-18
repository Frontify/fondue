/* (c) Copyright Frontify Ltd., all rights reserved. */

/* (c) Copyright Frontify Ltd., all rights reserved. */
import { type ReactNode, useId } from 'react';

import styles from './styles/table.module.scss';
import { handleKeyDown } from './utils';

type SortDirection = 'ascending' | 'descending' | 'other' | undefined;
type HorizontalAlignment = 'left' | 'center' | 'right';

type TableRootProps = {
    /**
     * Optional caption text for the table that appears above it
     */
    caption?: string;
    /**
     * Whether to add zebra striping to rows
     * @default false
     */
    striped?: boolean;
    /**
     * Whether to add borders between rows and columns
     * @default true
     */
    bordered?: boolean;
    /**
     * Whether to make the table take full width of its container
     * @default true
     */
    fullWidth?: boolean;
    /**
     * Whether the table is in a loading state
     * @default false
     */
    loading?: boolean;
    children: ReactNode;
    'aria-label'?: string;
    'aria-describedby'?: string;
};

export const TableRoot = ({
    caption,
    striped = false,
    bordered = true,
    fullWidth = true,
    loading = false,
    children,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
}: TableRootProps) => {
    return (
        <div onKeyDown={handleKeyDown} role="grid" tabIndex={-1}>
            <table
                className={styles.table}
                data-striped={striped}
                data-bordered={bordered}
                data-full-width={fullWidth}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedBy}
                aria-busy={loading}
            >
                {caption && <caption>{caption}</caption>}
                {children}
            </table>
        </div>
    );
};

type TableHeaderProps = {
    /**
     * Whether header should stick to the top when scrolling
     * @default false
     */
    sticky?: boolean;
    children: ReactNode;
    'aria-label'?: string;
};

export const TableHeader = ({ children, sticky = false, 'aria-label': ariaLabel }: TableHeaderProps) => {
    return (
        <thead className={styles.header} data-sticky={sticky} aria-label={ariaLabel}>
            {children}
        </thead>
    );
};

type TableSortTranslations = {
    sortAscending?: string;
    sortDescending?: string;
};

type TableHeaderCellProps = {
    /**
     * Handler called when the sort direction changes
     * @param direction - The new sort direction
     */
    onSortChange?: (direction: SortDirection) => void;
    /**
     * Whether the column is sortable
     * @default false
     */
    sortable?: boolean;
    /**
     * Current sort direction of the column
     */
    sortDirection?: SortDirection;
    /**
     * Horizontal alignment of the content
     * @default 'left'
     */
    align?: HorizontalAlignment;
    /**
     * Whether to truncate content with ellipsis when it overflows
     * @default false
     */
    truncate?: boolean;
    /**
     * Label for asceding/descending sort. Variables: {column} - column name
     * @default "Sort by {column} ascending/descending"
     */
    sortTranslations?: TableSortTranslations;
    /**
     * Width of the column (any valid CSS width)
     */
    width?: string;
    /**
     * Whether the column should have a minimum width
     * @default false
     */
    noShrink?: boolean;
    /**
     * Scope of the header cell (column or row)
     * @default 'col'
     */
    scope?: 'col' | 'row';
    children: ReactNode;
};

export const TableHeaderCell = ({
    onSortChange,
    sortable,
    sortDirection,
    align = 'left',
    truncate = false,
    sortTranslations,
    width,
    noShrink = false,
    scope = 'col',
    children,
}: TableHeaderCellProps) => {
    const buttonId = useId();

    const handleSortChange = () => {
        if (!sortable || !onSortChange) {
            return;
        }

        const newDirection: SortDirection =
            sortDirection === undefined || sortDirection === 'descending' ? 'ascending' : 'descending';

        onSortChange(newDirection);
    };

    const getSortLabel = () => {
        const columnName = typeof children === 'string' ? children : '';
        if (sortDirection === 'ascending') {
            return (sortTranslations?.sortDescending ?? 'Sort by {column} descending').replace('{column}', columnName);
        }
        return (sortTranslations?.sortAscending ?? 'Sort by {column} ascending').replace('{column}', columnName);
    };

    return (
        <th
            className={styles.headerCell}
            style={{
                width,
                textAlign: align,
            }}
            data-truncate={truncate}
            data-no-shrink={noShrink}
            role="columnheader"
            scope={scope}
            aria-sort={sortDirection}
        >
            {sortable ? (
                <button
                    id={buttonId}
                    onClick={handleSortChange}
                    className={styles.sortButton}
                    aria-label={getSortLabel()}
                >
                    {children}
                </button>
            ) : (
                children
            )}
        </th>
    );
};

type TableBodyProps = {
    /**
     * Whether the first column should stick to the viewport when scrolling horizontally
     * @default false
     */
    stickyFirstColumn?: boolean;
    children: ReactNode;
};

export const TableBody = ({ stickyFirstColumn, children }: TableBodyProps) => {
    return (
        <tbody className={styles.body} data-sticky-first-column={stickyFirstColumn}>
            {children}
        </tbody>
    );
};

type TableRowProps = {
    /**
     * Whether the row is in a selected state
     * @default false
     */
    selected?: boolean;
    /**
     * Whether to disable interactions for this row
     * @default false
     */
    disabled?: boolean;
    /**
     * Handler called when the row is clicked or activated via keyboard
     * If provided, the row will be hoverable and interactive
     */
    onClick?: () => void;
    children: ReactNode;
    'aria-label'?: string;
};

export const TableRow = ({
    selected = false,
    disabled = false,
    onClick,
    children,
    'aria-label': ariaLabel,
}: TableRowProps) => {
    const isInteractive = onClick !== undefined && !disabled;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
        if (isInteractive && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onClick();
        }
    };

    return (
        <tr
            className={styles.row}
            data-selected={selected}
            data-interactive={isInteractive}
            data-disabled={disabled}
            role={isInteractive ? 'button' : 'row'}
            tabIndex={isInteractive ? 0 : undefined}
            aria-selected={selected}
            aria-disabled={disabled}
            aria-label={ariaLabel}
            onClick={isInteractive ? onClick : undefined}
            onKeyDown={isInteractive ? handleKeyDown : undefined}
        >
            {children}
        </tr>
    );
};

type TableRowCellProps = {
    /**
     * Horizontal alignment of the content
     * @default 'left'
     */
    align?: HorizontalAlignment;
    /**
     * Whether to truncate content with ellipsis when it overflows
     * @default false
     */
    truncate?: boolean;
    children: ReactNode;
    'aria-label'?: string;
};

export const TableRowCell = ({
    children,
    align = 'left',
    truncate = false,
    'aria-label': ariaLabel,
}: TableRowCellProps) => {
    return (
        <td className={styles.rowCell} style={{ textAlign: align }} data-truncate={truncate} aria-label={ariaLabel}>
            {children}
        </td>
    );
};

export const Table = {
    Root: TableRoot,
    Header: TableHeader,
    HeaderCell: TableHeaderCell,
    Body: TableBody,
    Row: TableRow,
    RowCell: TableRowCell,
};
