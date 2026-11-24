/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { IconTable } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from '#/core';
import { type PlainStringKey } from '#/locales/types';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';
import { useTranslate } from '#/ui/translation';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import { isInTable } from '../helpers/isInTable';

type MenuItem = { id: string; label: PlainStringKey; run: () => void; isAvailable?: boolean };

type TableMenuProps = {
    api: EditorControlApi;
    selection: RteSelectionSnapshot;
    /** The toolbar entry's label, which names the menu's button. */
    label: string;
};

type Shape = NonNullable<ReturnType<EditorControlApi['grid']['shape']>>;

/**
 * The engine removes nothing when the selection covers every row or column,
 * and merges or splits nothing it cannot, so those items are left out then.
 * Each header toggle is named by what choosing it does.
 */
const menuItems = (api: EditorControlApi, shape: Shape): MenuItem[] => [
    { id: 'column-left', label: 'RichTextEditor_tableInsertColumnLeft', run: () => api.grid.add('column', 'before') },
    { id: 'column-right', label: 'RichTextEditor_tableInsertColumnRight', run: () => api.grid.add('column', 'after') },
    { id: 'row-above', label: 'RichTextEditor_tableInsertRowAbove', run: () => api.grid.add('row', 'before') },
    { id: 'row-below', label: 'RichTextEditor_tableInsertRowBelow', run: () => api.grid.add('row', 'after') },
    {
        id: 'delete-column',
        label: 'RichTextEditor_tableDeleteColumn',
        run: () => api.grid.removeSelected('column'),
        isAvailable: shape.selectedColumns < shape.columns,
    },
    {
        id: 'delete-row',
        label: 'RichTextEditor_tableDeleteRow',
        run: () => api.grid.removeSelected('row'),
        isAvailable: shape.selectedRows < shape.rows,
    },
    {
        id: 'merge-cells',
        label: 'RichTextEditor_tableMergeCells',
        run: () => api.grid.mergeSlots(),
        isAvailable: api.grid.canMergeSlots(),
    },
    {
        id: 'split-cell',
        label: 'RichTextEditor_tableSplitCell',
        run: () => api.grid.splitSlot(),
        isAvailable: api.grid.canSplitSlot(),
    },
    {
        id: 'header-row',
        label: shape.headerRow ? 'RichTextEditor_tableRemoveHeaderRow' : 'RichTextEditor_tableAddHeaderRow',
        run: () => api.grid.toggleHeader('row'),
    },
    {
        id: 'header-column',
        label: shape.headerColumn ? 'RichTextEditor_tableRemoveHeaderColumn' : 'RichTextEditor_tableAddHeaderColumn',
        run: () => api.grid.toggleHeader('column'),
    },
    { id: 'delete-table', label: 'RichTextEditor_tableDelete', run: () => api.grid.removeGrid() },
];

/** Shown only while the selection is in a table. */
export const TableMenu = ({ api, selection, label }: TableMenuProps): ReactNode => {
    const translate = useTranslate();
    const { returnToText, contentProps } = useFocusAfterClose(api);
    // `shape()` answers for any grid; this keeps the menu to tables.
    if (!isInTable(selection)) {
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
                <ToolbarButton title={label}>
                    <IconTable size={TOOLBAR_ICON_SIZE} />
                </ToolbarButton>
            </Dropdown.Trigger>
            <Dropdown.Content {...contentProps} onEscapeKeyDown={returnToText}>
                {items.map((item) => (
                    <Dropdown.Item
                        key={item.id}
                        textValue={translate(item.label)}
                        onSelect={() => {
                            returnToText();
                            item.run();
                        }}
                    >
                        <span>{translate(item.label)}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
