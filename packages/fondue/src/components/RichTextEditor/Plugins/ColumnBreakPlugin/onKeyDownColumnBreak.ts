/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    HotkeyPlugin,
    KeyboardHandlerReturnType,
    PlateEditor,
    Value,
    WithPlatePlugin,
    getNodeEntries,
    isBlock,
    someNode,
} from '@udecode/plate';
import isHotkey from 'is-hotkey';
import { TLocation } from '@udecode/slate';
import { KEY_ELEMENT_BREAK_AFTER_COLUMN } from './createColumnBreakPlugin';
import { getColumnBreakCount } from './utils/getColumnBreakCount';
import { setColumnBreaks } from './utils/setColumnBreaks';
import { updateColumnBreaks } from './utils/updateColumnBreaks';
import type { BaseSyntheticEvent } from 'react';

export const toggleColumnBreak = (editor: PlateEditor<Value>, columns: number, event: BaseSyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const isActive = !!editor?.selection && someNode(editor, { match: (node) => !!node.breakAfterColumn });

    if (isActive) {
        setColumnBreaks(editor, { value: undefined });
    } else {
        const columnBreakCount = getColumnBreakCount(editor);
        const toggleRange = Math.max(columns - columnBreakCount - 1, 0);

        if (toggleRange === 0) {
            return;
        }

        const elementsToToggle = Array.from(
            getNodeEntries(editor, {
                at: editor.selection as TLocation,
                match: (node) => isBlock(editor, node),
                mode: 'lowest',
            }),
        ).slice(-toggleRange); // apply column breaks ath the end of the selection

        for (const element of elementsToToggle) {
            setColumnBreaks(editor, { value: 'active', at: element[1] });
        }
    }

    updateColumnBreaks(editor, columns);
};

export const onKeyDownColumnBreak =
    (
        editor: PlateEditor<Value>,
        { options: { hotkey } }: WithPlatePlugin<HotkeyPlugin, Value, PlateEditor<Value>>,
    ): KeyboardHandlerReturnType =>
    (event) => {
        if (event.defaultPrevented) {
            return;
        }

        if (!hotkey) {
            return;
        }

        if (isHotkey(hotkey, event)) {
            const columnBreakPlugin = editor.plugins.find((plugin) => plugin.key === KEY_ELEMENT_BREAK_AFTER_COLUMN);
            const columns = (columnBreakPlugin?.options as { columns: number })?.columns ?? 1;
            toggleColumnBreak(editor, columns, event);
        }
    };
