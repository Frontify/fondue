/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowBidirectional, IconArrowDown, IconArrowUp } from '@frontify/fondue-icons';
import {
    forwardRef,
    useEffect,
    useMemo,
    useRef,
    useState,
    type AriaAttributes,
    type CSSProperties,
    type KeyboardEvent,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
} from 'react';

import { useSyncRefs } from '#/hooks/useSyncRefs';
import { useTextTruncation } from '#/hooks/useTextTruncation';
import { useTranslation } from '#/hooks/useTranslation';
import { type CommonAriaAttrs } from '#/utilities/types';

import { Box } from '../Box/Box';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

import styles from './styles/table.module.scss';
import { handleKeyDown, shouldIgnoreRowClick } from './utils';

type TableRootProps = {
    /**
     * Controls how column widths are calculated. `'auto'` sizes columns to fit their content, `'fixed'` distributes width evenly for predictable layouts.
     * @default 'auto'
     */
    layout?: 'auto' | 'fixed';
    /**
     * Controls the text size of table content. `'small'` for dense data tables, `'medium'` for standard readability.
     * @default 'medium'
     */
    fontSize?: 'small' | 'medium';
    /**
     * Additional spacing between table cells (both horizontal and vertical)
     *
     * This value is added to the default cell spacing. For example, with `gutter="48px"`,
     * cells will have 48px of additional space between them in both directions
     * (24px added to each side).
     *
     * Accepts any CSS length value with units (e.g., '16px', '1rem', '48px')
     *
     * **Important:** Always include a unit, even for zero (use '0px', not '0')
     * @default '0px'
     */
    gutter?: CSSProperties['borderSpacing'];
    /**
     * Whether header should stick to the top when scrolling
     * @deprecated Use `Table.Header sticky` prop instead. For sticky columns, use `Table.Body firstColumnSticky` or `lastColumnSticky` props
     */
    sticky?: 'head' | 'col' | 'both';
    /**
     * Removes the top and bottom borders. Useful when the table sits inside a container that already provides visual separation.
     * @default false
     */
    noBorder?: boolean;
    children: ReactNode;
} & CommonAriaAttrs &
    Pick<AriaAttributes, 'aria-multiselectable'>;

export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(
    ({ layout = 'auto', fontSize = 'medium', gutter = '0px', sticky, noBorder = false, children, ...props }, ref) => {
        const tableRef = useRef<HTMLTableElement>(null);
        const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

        useSyncRefs<HTMLTableElement>(tableRef, ref);

        // Handle deprecated `sticky` prop for backward compatibility
        const legacyStickyHeader = sticky === 'head' || sticky === 'both';
        const legacyStickyLeftColumn = sticky === 'col' || sticky === 'both';

        useEffect(() => {
            const table = tableRef.current;
            if (!table) {
                return;
            }

            const checkOverflow = () => {
                const parent = table.parentElement;
                if (!parent) {
                    return;
                }

                const tableWidth = table.scrollWidth;
                const parentWidth = parent.clientWidth;
                setHasHorizontalOverflow(tableWidth > parentWidth);
            };

            checkOverflow();

            const resizeObserver = new ResizeObserver(checkOverflow);
            resizeObserver.observe(table);
            if (table.parentElement) {
                resizeObserver.observe(table.parentElement);
            }

            return () => {
                resizeObserver.disconnect();
            };
        }, [children]);

        return (
            // eslint-disable-next-line jsx-a11y-x/no-noninteractive-element-interactions
            <table
                ref={tableRef}
                className={styles.table}
                style={{
                    // @ts-expect-error CSS custom properties are not in CSSProperties type
                    '--table-gutter': gutter,
                }}
                data-layout={layout}
                data-font-size={fontSize}
                data-sticky-header={legacyStickyHeader}
                data-sticky-left-column={legacyStickyLeftColumn}
                data-no-border={noBorder}
                data-has-horizontal-overflow={hasHorizontalOverflow}
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
     * Pins the header row to the top of the scroll container so column labels remain visible while scrolling.
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

type SortDirection = 'ascending' | 'descending' | undefined;
type HorizontalAlignment = 'left' | 'center' | 'right';

type TableHeaderCellProps = {
    /**
     * Scope of the column
     * @default 'col'
     */
    scope?: HTMLTableCellElement['scope'];
    /**
     * The number of columns this header cell spans. Use for grouped column headers.
     */
    colSpan?: HTMLTableCellElement['colSpan'];
    /**
     * Sets a fixed column width. Accepts any CSS length value (e.g., `'200px'`, `'25%'`).
     */
    width?: CSSProperties['width'];
    /**
     * The current sort state of this column. Pass `'ascending'` or `'descending'` to show the active sort indicator, or `undefined` for unsorted.
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
     * Custom labels for the sort button's accessible text. Use `{column}` as a placeholder for the column name.
     * @default "Sort by {column} ascending/descending"
     */
    sortTranslations?: {
        sortAscending?: string;
        sortDescending?: string;
    };
    /**
     * Prevents the column from shrinking below its content width. Useful for action columns or fixed-width cells.
     * @default false
     */
    noShrink?: boolean;
    /**
     * Controls the cell's visual state. Set to `'loading'` to show a spinner alongside the header text.
     * @default 'idle'
     */
    state?: 'idle' | 'loading';
    /**
     * Accessible label announced by screen readers when `state` is `'loading'`.
     */
    loadingStateAriaLabel?: string;
    /**
     * Callback fired when the user clicks the sort button. Receives the new sort direction. Providing this prop makes the column sortable.
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
        const { t } = useTranslation();
        const cellRef = useRef<HTMLTableCellElement>(null);
        useSyncRefs<HTMLTableCellElement>(cellRef, ref);

        useTextTruncation(cellRef);

        const sortLabel = useMemo(() => {
            if (typeof children === 'string') {
                if (sortDirection === 'ascending') {
                    return sortTranslations?.sortDescending ?? t('Table_sortByDescending', { column: children });
                }
                return sortTranslations?.sortAscending ?? t('Table_sortByAscending', { column: children });
            }

            return sortDirection === 'ascending' ? t('Table_sortDescending') : t('Table_sortAscending');
        }, [children, sortDirection, sortTranslations, t]);

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
                                <IconArrowUp className={styles.sortIndicator} size="12" />
                            ) : sortDirection === 'descending' ? (
                                <IconArrowDown className={styles.sortIndicator} size="12" />
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
     * Pins the first column to the left edge when the table scrolls horizontally. Useful for row labels or identifiers.
     * @default false
     */
    firstColumnSticky?: boolean;
    /**
     * Pins the last column to the right edge when the table scrolls horizontally. Useful for row actions.
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
     * Whether the row is in a selected (highlighted) state. Pairs with `onClick` for selectable rows.
     * @default false
     */
    selected?: boolean;
    /**
     * Prevents interaction and dims the row visually.
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback fired when the row is clicked or activated via keyboard (Enter/Space). When provided, the row becomes hoverable and interactive. Receives the current `selected` state.
     */
    onClick?: (selected: boolean) => void;
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
     * The number of columns this cell spans.
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

/** A data table — compose `Root` with `Caption`, `Header`, `HeaderCell`, `Body`, `Row`, and `RowCell` sub-components. */
export const Table = {
    Root: TableRoot,
    Caption: TableCaption,
    Header: TableHeader,
    HeaderCell: TableHeaderCell,
    Body: TableBody,
    Row: TableRow,
    RowCell: TableRowCell,
};
