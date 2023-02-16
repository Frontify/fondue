/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KeyboardHandlerReturnType, PlateEditor, getPreventDefaultHandler, someNode } from '@udecode/plate';
import isHotkey from 'is-hotkey';
import { KEY_ELEMENT_BREAK_AFTER } from './createColumnBreakPlugin';
import { getColumnBreakCount } from './utils/getColumnBreakCount';
import { setColumnBreaks } from './utils/setColumnBreaks';
import { updateColumnBreaks } from './utils/updateColumnBreaks';

export const toggleColumnBreak = (editor: PlateEditor, columns: number, event: React.BaseSyntheticEvent) => {
    const isActive = !!editor?.selection && someNode(editor, { match: (node) => !!node.breakAfterColumn });
    const isInsert = !isActive;

    if (isInsert && getColumnBreakCount(editor) + 1 >= columns) {
        return;
    }

    getPreventDefaultHandler(setColumnBreaks, editor, {
        value: isActive ? undefined : 'active',
        key: KEY_ELEMENT_BREAK_AFTER,
    })(event);

    updateColumnBreaks(editor, columns);
};

export const onKeyDownColumnBreak =
    (editor: PlateEditor): KeyboardHandlerReturnType =>
    (e) => {
        if (e.defaultPrevented) {
            return;
        }

        if (isHotkey('shift+ctrl+enter', e)) {
            const breakAfterPlugin = editor.plugins.find((plugin) => plugin.key === KEY_ELEMENT_BREAK_AFTER);
            const columns = (breakAfterPlugin?.options as { columns: number })?.columns ?? 1;
            toggleColumnBreak(editor, columns, e);
        }
    };
