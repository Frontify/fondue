/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowBidirectional, IconArrowDown, IconArrowUp } from '@frontify/fondue-icons';
import {
    type AriaAttributes,
    forwardRef,
    useMemo,
    useRef,
    type CSSProperties,
    type KeyboardEvent,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
} from 'react';

import { useSyncRefs } from '#/hooks/useSyncRefs';
import { useTextTruncation } from '#/hooks/useTextTruncation';
import { type CommonAriaAttrs } from '#/utilities/types';

import { Box } from '../Box/Box';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

import styles from './styles/table.module.scss';
import { handleKeyDown, shouldIgnoreRowClick } from './utils';

type TableRootProps = {
    /**
     * Whether the table should have a fixed or auto layout
     * @default 'auto'
     */
    layout?: 'auto' | 'fixed';
    /**
     * Font size of the table content
     * @default 'small'
     */
    fontSize?: 'small' | 'medium';
    /**
     * Whether header should stick to the top when scrolling
     * @deprecated Use `Table.Header sticky` prop instead. For sticky columns, use `Table.Body firstColumnSticky` or `lastColumnSticky` props
     */
    sticky?: 'head' | 'col' | 'both';
    children: ReactNode;
} & CommonAriaAttrs &
    Pick<AriaAttributes, 'aria-multiselectable'>;

export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(
    (
        {
            layout = 'auto',
            fontSize = 'medium',
            sticky,
            children,
            ...props
        },
        ref,
    ) => {
        // Handle deprecated `sticky` prop for backward compatibility
        const legacyStickyHeader = sticky === 'head' || sticky === 'both';
        const legacyStickyLeftColumn = sticky === 'col' || sticky === 'both';

        return (
            // eslint-disable-next-line jsx-a11y-x/no-noninteractive-element-interactions
            <table
                ref={ref}
                className={styles.table}
                data-layout={layout}
                data-font-size={fontSize}
                data-sticky-header={legacyStickyHeader}
                data-sticky-left-column={legacyStickyLeftColumn}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </table>
        );
    },
);
TableRoot.displayName = 'Table.Root';

export const TableCaption = forwardRef<HTMLTableCaptionElement, { children: ReactNode }>(({ children }, ref) => {
    return (
        <caption ref={ref} className={styles.caption}>
            {children}
        </caption>
    );
});
TableCaption.displayName = 'Table.Caption';

type TableHeaderProps = {
    /**
     * Whether the header should stick to the top when scrolling
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
            <thead
                ref={ref}
                className={styles.header}
                data-sticky={sticky}
                aria-label={ariaLabel}
                aria-busy={ariaBusy}
            >
                {children}
            </thead>
        );
    },
);
TableHeader.displayName = 'Table.Header';

type SortDirection = 'ascending' | 'descending' | undefined;
type HorizontalAlignment = 'left' | 'center' | 'right';

type TableHeaderCellProps = {
    /**
     * Scope of the column
     * @default 'col'
     */
    scope?: HTMLTableCellElement['scope'];
    /**
     * Number of columns the cell should span
     */
    colSpan?: HTMLTableCellElement['colSpan'];
    /**
     * Width of the column
     */
    width?: CSSProperties['width'];
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
     * Aria label for asceding/descending sort. Variables: {column} - column name
     * @default "Sort by {column} ascending/descending"
     */
    sortTranslations?: {
        sortAscending?: string;
        sortDescending?: string;
    };
    /**
     * Whether the column should have a minimum width
     * @default false
     */
    noShrink?: boolean;
    /**
     * State of the cell, used for displaying loading state
     * @default 'idle'
     */
    state?: 'idle' | 'loading';
    /**
     * The aria-label to be applied when state='loading'
     */
    loadingStateAriaLabel?: string;
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
            noShrink = false,
            truncate = false,
            align = 'left',
            scope = 'col',
            sortTranslations,
            sortDirection,
            colSpan,
            width,
            state = 'idle',
            loadingStateAriaLabel,
            onSortChange,
            children,
        },
        ref,
    ) => {
        const cellRef = useRef<HTMLTableCellElement>(null);
        useSyncRefs<HTMLTableCellElement>(cellRef, ref);

        useTextTruncation(cellRef);

        const sortLabel = useMemo(() => {
            if (typeof children === 'string') {
                if (sortDirection === 'ascending') {
                    return sortTranslations?.sortDescending ?? `Sort by ${children} descending`;
                }
                return sortTranslations?.sortAscending ?? `Sort by ${children} ascending`;
            }

            return sortDirection === 'ascending' ? 'Sort descending' : 'Sort ascending';
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
                ref={cellRef}
                style={{ width }}
                className={styles.headerCell}
                scope={scope}
                colSpan={colSpan}
                data-align={align}
                data-truncate={truncate}
                data-no-shrink={noShrink}
                data-sortable={!!onSortChange}
                aria-sort={onSortChange ? sortDirection || 'none' : undefined}
            >
                {state === 'loading' ? (
                    <div className={styles.cellContent} aria-live="polite" aria-label={loadingStateAriaLabel}>
                        {typeof children === 'string' && truncate ? (
                            <span className={styles.buttonText}>{children}</span>
                        ) : (
                            children
                        )}
                        <LoadingCircle data-test-id="fondue-loading-circle" size="xx-small" />
                    </div>
                ) : onSortChange ? (
                    <button
                        className={styles.cellContent}
                        aria-label={sortLabel}
                        data-active={!!sortDirection}
                        onClick={handleSortChange}
                        type="button"
                    >
                        {typeof children === 'string' && truncate ? (
                            <span className={styles.buttonText}>{children}</span>
                        ) : (
                            children
                        )}
                        <Box width={3}>
                            {sortDirection === 'ascending' ? (
                                <IconArrowUp size="12" />
                            ) : sortDirection === 'descending' ? (
                                <IconArrowDown size="12" />
                            ) : (
                                <IconArrowBidirectional className={styles.sortIndicator} size="12" />
                            )}
                        </Box>
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
     * Whether the first column should stick to the left when scrolling horizontally
     * @default false
     */
    firstColumnSticky?: boolean;
    /**
     * Whether the last column should stick to the right when scrolling horizontally
     * @default false
     */
    lastColumnSticky?: boolean;
    children: ReactNode;
    'aria-busy'?: boolean;
};

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ firstColumnSticky = false, lastColumnSticky = false, children, 'aria-busy': ariaBusy }, ref) => {
        return (
            <tbody
                ref={ref}
                className={styles.body}
                data-first-column-sticky={firstColumnSticky}
                data-last-column-sticky={lastColumnSticky}
                aria-busy={ariaBusy}
            >
                {children}
            </tbody>
        );
    },
);
TableBody.displayName = 'Table.Body';

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
    onClick?: (selected: boolean) => void;
    /**
     * Content to be rendered within the row
     */
    children: ReactNode;
    /**
     * Accessible label for the row
     */
    'aria-label'?: string;
    'data-test-id'?: string;
};

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
    (
        { disabled = false, selected = false, onClick, children, 'aria-label': ariaLabel, 'data-test-id': dataTestId },
        ref,
    ) => {
        const isInteractive = onClick !== undefined && !disabled;

        const handleClick = (event?: MouseEvent) => {
            if (disabled) {
                return;
            }

            if (shouldIgnoreRowClick(event)) {
                return;
            }

            if (onClick) {
                onClick(selected);
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
                tabIndex={0}
                role={isInteractive ? 'button' : 'row'}
                data-disabled={disabled}
                data-interactive={isInteractive}
                data-selected={!isInteractive ? selected : undefined}
                aria-disabled={disabled}
                aria-label={ariaLabel}
                aria-selected={!isInteractive ? selected : undefined}
                onClick={isInteractive ? handleClick : undefined}
                onKeyDown={isInteractive ? handleKeyDown : undefined}
                data-test-id={dataTestId}
            >
                {children}
            </tr>
        );
    },
);
TableRow.displayName = 'Table.Row';

type TableRowCellProps = {
    /**
     * Number of columns the cell should span
     */
    colSpan?: HTMLTableCellElement['colSpan'];
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
    ({ colSpan, truncate, align = 'left', children, 'aria-label': ariaLabel }, ref): ReactElement => {
        const cellRef = useRef<HTMLTableCellElement>(null);
        useSyncRefs<HTMLTableCellElement>(cellRef, ref);

        useTextTruncation(cellRef);

        return (
            <td
                ref={cellRef}
                className={styles.rowCell}
                colSpan={colSpan}
                data-align={align}
                data-truncate={truncate}
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
    Caption: TableCaption,
    Header: TableHeader,
    HeaderCell: TableHeaderCell,
    Body: TableBody,
    Row: TableRow,
    RowCell: TableRowCell,
};
