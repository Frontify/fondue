/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { IconTable } from '@frontify/fondue-icons';
import { type ReactNode, useId } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import styles from '../table.module.scss';

/** Until the editor's locale files exist, like every shipped plugin. */
const TEXT = {
    menu: 'Table',
    insertColumnLeft: 'Insert column left',
    insertColumnRight: 'Insert column right',
    insertRowAbove: 'Insert row above',
    insertRowBelow: 'Insert row below',
    deleteColumn: 'Delete column',
    deleteRow: 'Delete row',
    addHeaderRow: 'Add header row',
    removeHeaderRow: 'Remove header row',
    addHeaderColumn: 'Add header column',
    removeHeaderColumn: 'Remove header column',
    deleteTable: 'Delete table',
    mergeCells: 'Merge cells',
    splitCell: 'Split cell',
    // Written for the common case, fewer than two selected; also shown when a
    // merged cell sticks out of the selection.
    cannotMerge: 'Select two or more cells to merge',
    cannotSplit: 'Only a merged cell can be split',
} as const;

type MenuItem = { id: string; label: string; run: () => void; isAvailable?: boolean; reason?: string };

type TableMenuProps = {
    api: EditorControlApi;
    selection: RteSelectionSnapshot;
};

type Shape = NonNullable<ReturnType<EditorControlApi['grid']['shape']>>;

/**
 * The engine removes nothing when the selection covers every row or column,
 * so those items are left out then. Each header toggle is named by what
 * choosing it does.
 */
const menuItems = (api: EditorControlApi, shape: Shape): MenuItem[] => [
    { id: 'column-left', label: TEXT.insertColumnLeft, run: () => api.grid.add('column', 'before') },
    { id: 'column-right', label: TEXT.insertColumnRight, run: () => api.grid.add('column', 'after') },
    { id: 'row-above', label: TEXT.insertRowAbove, run: () => api.grid.add('row', 'before') },
    { id: 'row-below', label: TEXT.insertRowBelow, run: () => api.grid.add('row', 'after') },
    {
        id: 'delete-column',
        label: TEXT.deleteColumn,
        run: () => api.grid.removeSelected('column'),
        isAvailable: shape.selectedColumns < shape.columns,
    },
    {
        id: 'delete-row',
        label: TEXT.deleteRow,
        run: () => api.grid.removeSelected('row'),
        isAvailable: shape.selectedRows < shape.rows,
    },
    {
        id: 'merge-cells',
        label: TEXT.mergeCells,
        run: () => api.grid.mergeSlots(),
        reason: api.grid.canMergeSlots() ? undefined : TEXT.cannotMerge,
    },
    {
        id: 'split-cell',
        label: TEXT.splitCell,
        run: () => api.grid.splitSlot(),
        reason: api.grid.canSplitSlot() ? undefined : TEXT.cannotSplit,
    },
    {
        id: 'header-row',
        label: shape.headerRow ? TEXT.removeHeaderRow : TEXT.addHeaderRow,
        run: () => api.grid.toggleHeader('row'),
    },
    {
        id: 'header-column',
        label: shape.headerColumn ? TEXT.removeHeaderColumn : TEXT.addHeaderColumn,
        run: () => api.grid.toggleHeader('column'),
    },
    { id: 'delete-table', label: TEXT.deleteTable, run: () => api.grid.removeGrid() },
];

/** Shown only while the selection is in a table. */
export const TableMenu = ({ api, selection }: TableMenuProps): ReactNode => {
    const menuId = useId();
    const { returnToText, contentProps } = useFocusAfterClose(api);
    // `shape()` answers for any grid; this keeps the menu to tables.
    if (!selection.blocks.some((block) => block.type === 'table')) {
        return null;
    }
    const shape = api.grid.shape();
    if (shape === null) {
        return null;
    }
    const items = menuItems(api, shape).filter((item) => item.isAvailable !== false);

    return (
        <Dropdown.Root>
            <Dropdown.Trigger>
                <ToolbarButton title={TEXT.menu}>
                    <IconTable size={TOOLBAR_ICON_SIZE} />
                </ToolbarButton>
            </Dropdown.Trigger>
            <Dropdown.Content {...contentProps} onEscapeKeyDown={returnToText}>
                {items.map((item) => {
                    const reasonId = `${menuId}-${item.id}-reason`;
                    return (
                        <Dropdown.Item
                            key={item.id}
                            textValue={item.label}
                            // Not `disabled`: that takes it out of the arrow-key order, and
                            // the reason would never be read. Listed, reachable, inert.
                            aria-disabled={item.reason === undefined ? undefined : true}
                            aria-describedby={item.reason === undefined ? undefined : reasonId}
                            onSelect={(event) => {
                                if (item.reason !== undefined) {
                                    event.preventDefault();
                                    return;
                                }
                                returnToText();
                                item.run();
                            }}
                        >
                            {item.reason === undefined ? (
                                <span>{item.label}</span>
                            ) : (
                                <span className={styles.unavailable}>
                                    <span>{item.label}</span>
                                    <span id={reasonId} className={styles.reason}>
                                        {item.reason}
                                    </span>
                                </span>
                            )}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
