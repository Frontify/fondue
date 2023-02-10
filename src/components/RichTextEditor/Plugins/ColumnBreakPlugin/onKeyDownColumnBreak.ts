/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPreventDefaultHandler, someNode } from '@udecode/plate';
import { KeyboardHandlerReturnType, PlateEditor } from '@udecode/plate';
import isHotkey from 'is-hotkey';
import { setBreakAfter } from './utils/setBreakAfter';
import { KEY_ELEMENT_BREAK_AFTER } from './createColumnBreakPlugin';

export const onKeyDownColumnBreak =
    (editor: PlateEditor): KeyboardHandlerReturnType =>
    (e) => {
        const isActive = !!editor?.selection && someNode(editor, { match: { breakAfterColumn: true } });
        if (e.defaultPrevented) {
            return;
        }
        if (isHotkey('shift+ctrl+enter', e)) {
            getPreventDefaultHandler(setBreakAfter, editor, {
                value: !isActive,
                key: KEY_ELEMENT_BREAK_AFTER,
            })(e);
        }
    };
