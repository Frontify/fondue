/* (c) Copyright Frontify Ltd., all rights reserved. */

/* (c) Copyright Frontify Ltd., all rights reserved. */
import { IconArrowDown, IconArrowUp } from '@frontify/fondue-icons';
import { type ReactNode, useId, forwardRef, useMemo, type KeyboardEvent } from 'react';

import styles from './styles/table.module.scss';
import { handleKeyDown } from './utils';

type SortDirection = 'ascending' | 'descending' | undefined;
type HorizontalAlignment = 'left' | 'center' | 'right';

type TableRootProps = {
    /**
     * Whether the table should have a fixed or auto layout
     * @default 'fixed'
     */
    layout?: 'auto' | 'fixed';
    /**
     * Optional caption text for the table that appears above it
     */
    caption?: string;
    /**
     * Whether to make the table take full width of its container
     * @default true
     */
    fullWidth?: boolean;
    children: ReactNode;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-busy'?: boolean;
};

export const TableRoot = forwardRef<HTMLDivElement, TableRootProps>(
    (
        {
            caption,
            layout = 'fixed',
            fullWidth = true,
            children,
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedBy,
            'aria-busy': ariaBusy = false,
        },
        ref,
    ) => {
        return (
            <div ref={ref} onKeyDown={handleKeyDown} role="grid" tabIndex={-1}>
                <table
                    className={styles.table}
                    data-layout={layout}
                    data-full-width={fullWidth}
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedBy}
                    aria-busy={ariaBusy}
                >
                    {caption && <caption>{caption}</caption>}
                    {children}
                </table>
            </div>
        );
    },
);
TableRoot.displayName = 'Table.Root';

type TableHeaderProps = {
    /**
     * Whether header should stick to the top when scrolling
     * @default false
     */
    sticky?: boolean;
    children: ReactNode;
    'aria-label'?: string;
    'aria-busy'?: boolean;
};

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ sticky = false, children, 'aria-label': ariaLabel, 'aria-busy': ariaBusy }, ref) => {
        return (
            <thead ref={ref} className={styles.header} data-sticky={sticky} aria-label={ariaLabel} aria-busy={ariaBusy}>
                {children}
            </thead>
        );
    },
);
TableHeader.displayName = 'Table.Header';

type TableSortTranslations = {
    sortAscending?: string;
    sortDescending?: string;
};

type TableHeaderCellProps = {
    /**
     * Width of the column (in PX)
     */
    width?: string;
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
     * Whether the column should have a minimum width
     * @default false
     */
    noShrink?: boolean;

    /**
     * Handler called when the sort direction changes
     * @param direction - The new sort direction
     */
    onSortChange?: (direction: SortDirection) => void;
    children: ReactNode;
};

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
    (
        {
            sortDirection,
            width,
            align = 'left',
            truncate = false,
            sortTranslations,
            noShrink = false,
            onSortChange,
            children,
        },
        ref,
    ) => {
        const buttonId = useId();

        const sortLabel = useMemo(() => {
            const columnName = typeof children === 'string' ? children : '';
            if (sortDirection === 'ascending') {
                return (sortTranslations?.sortDescending ?? 'Sort by {column} descending').replace(
                    '{column}',
                    columnName,
                );
            }
            return (sortTranslations?.sortAscending ?? 'Sort by {column} ascending').replace('{column}', columnName);
        }, [children, sortDirection, sortTranslations]);

        const handleSortChange = () => {
            if (!onSortChange) {
                return;
            }

            const newDirection: SortDirection =
                sortDirection === undefined || sortDirection === 'descending' ? 'ascending' : 'descending';

            onSortChange(newDirection);
        };

        return (
            <th
                ref={ref}
                className={styles.headerCell}
                style={{
                    textAlign: align,
                    width,
                }}
                data-truncate={truncate}
                data-no-shrink={noShrink}
                scope="col"
            >
                {onSortChange ? (
                    <button
                        id={buttonId}
                        onClick={handleSortChange}
                        className={styles.sortButton}
                        aria-label={sortLabel}
                    >
                        {children}
                        {sortDirection === 'ascending' ? (
                            <IconArrowUp size="12" />
                        ) : sortDirection === 'descending' ? (
                            <IconArrowDown size="12" />
                        ) : null}
                    </button>
                ) : (
                    children
                )}
            </th>
        );
    },
);
TableHeaderCell.displayName = 'Table.HeaderCell';

type TableBodyProps = {
    /**
     * Whether the first column should stick to the viewport when scrolling horizontally
     * @default false
     */
    stickyFirstColumn?: boolean;
    children: ReactNode;
    'aria-busy'?: boolean;
};

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ stickyFirstColumn, children, 'aria-busy': ariaBusy }, ref) => {
        return (
            <tbody ref={ref} className={styles.body} data-sticky-first-column={stickyFirstColumn} aria-busy={ariaBusy}>
                {children}
            </tbody>
        );
    },
);
TableBody.displayName = 'Table.Body';

type BaseTableRowProps = {
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
     * Content to be rendered within the row
     */
    children: ReactNode;
    /**
     * Accessible label for the row
     */
    'aria-label'?: string;
};

type ClickableTableRowProps = BaseTableRowProps & {
    /**
     * Handler called when the row is clicked or activated via keyboard
     * If provided, the row will be hoverable and interactive
     */
    onClick: () => void;
    onNavigate?: never;
    href?: never;
};

type NavigableTableRowProps = BaseTableRowProps & {
    onClick?: never;
    /**
     * Handler called when the row is clicked or activated via keyboard for navigation
     * Must be provided together with href
     */
    onNavigate: (href: string) => void;
    /**
     * URL associated with this row for navigation
     * Must be provided together with onNavigate
     */
    href: string;
};

type NonInteractiveTableRowProps = BaseTableRowProps & {
    onClick?: never;
    onNavigate?: never;
    href?: never;
};

type TableRowProps = ClickableTableRowProps | NavigableTableRowProps | NonInteractiveTableRowProps;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ selected = false, disabled = false, href, onNavigate, onClick, children, 'aria-label': ariaLabel }, ref) => {
        const isInteractive = (onClick !== undefined || onNavigate !== undefined) && !disabled;
        const isLink = Boolean(onNavigate && href);

        const handleClick = () => {
            if (disabled) {
                return;
            }

            if (onNavigate) {
                onNavigate(href);
            } else if (onClick) {
                onClick();
            }
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
            if (!isInteractive) {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleClick();
            }
        };

        return (
            <tr
                ref={ref}
                className={styles.row}
                data-href={href}
                data-selected={selected}
                data-interactive={isInteractive}
                data-disabled={disabled}
                role={isLink ? 'link' : isInteractive ? 'button' : 'row'}
                tabIndex={isInteractive ? 0 : undefined}
                aria-selected={selected}
                aria-disabled={disabled}
                aria-label={ariaLabel}
                onClick={isInteractive ? handleClick : undefined}
                onKeyDown={isInteractive ? handleKeyDown : undefined}
            >
                {children}
            </tr>
        );
    },
);
TableRow.displayName = 'Table.Row';

type TableRowCellProps = {
    /**
     * Whether to truncate content with ellipsis when it overflows
     * @default false
     */
    truncate?: boolean;
    /**
     * Horizontal alignment of the content
     * @default 'left'
     */
    align?: HorizontalAlignment;
    children: ReactNode;
    'aria-label'?: string;
};

export const TableRowCell = forwardRef<HTMLTableCellElement, TableRowCellProps>(
    ({ truncate, align = 'left', children, 'aria-label': ariaLabel }, ref) => {
        return (
            <td
                ref={ref}
                data-truncate={truncate}
                className={styles.rowCell}
                style={{ textAlign: align }}
                aria-label={ariaLabel}
            >
                {children}
            </td>
        );
    },
);
TableRowCell.displayName = 'Table.RowCell';

export const Table = {
    Root: TableRoot,
    Header: TableHeader,
    HeaderCell: TableHeaderCell,
    Body: TableBody,
    Row: TableRow,
    RowCell: TableRowCell,
};
