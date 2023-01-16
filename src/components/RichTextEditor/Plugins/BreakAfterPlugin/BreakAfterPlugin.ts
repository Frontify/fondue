/* eslint-disable @typescript-eslint/no-explicit-any */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { BreakAfterButton } from './BreakAfterButton';
import { Plugin, PluginProps } from '../Plugin';
import {
    KeyboardHandlerReturnType,
    getBlockAbove,
    getPreventDefaultHandler,
    queryNode,
    someNode,
} from '@udecode/plate-core';
import isHotkey from 'is-hotkey';
import { setBreakAfter } from './utils/setBreakAfter';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { enableColumnBreak } from './BreakAfterButton/BreakAfterToolbarButton';

export const KEY_ELEMENT_BREAK_AFTER = 'breakAfterColumn';

export class BreakAfterPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super('break-after-plugin', {
            button: BreakAfterButton,
            ...props,
        });
    }

    plugins() {
        return [createBreakAfterPlugin()];
    }
}

// This is adapted from packages/editor/break/src/soft-break/onKeyDownSoftBreak.ts
const OnKeyDownBreakAfter = (editor: any, { options: { rules = [] } }): KeyboardHandlerReturnType => {
    const { style } = useRichTextEditorContext(); // not allowed to use hooks here
    const columns = Number(style?.columns) ?? 1;

    return (event) => {
        const isActive = someNode(editor, { match: { breakAfterColumn: true } });
        const entry = getBlockAbove(editor);

        if (!entry) {
            return;
        }

        for (const { hotkey, query } of rules) {
            if (isHotkey(hotkey, event as any) && queryNode(entry, query) && enableColumnBreak(editor, columns)) {
                getPreventDefaultHandler(setBreakAfter, editor, {
                    value: !isActive,
                    key: KEY_ELEMENT_BREAK_AFTER,
                })(event);
            }
        }
    };
};
export const createBreakAfterPlugin = createPluginFactory({
    key: KEY_ELEMENT_BREAK_AFTER,
    options: {
        rules: [{ hotkey: 'command+shift+enter' }, { hotkey: 'ctrl+shift+enter' }],
    },
    handlers: {
        onKeyDown: OnKeyDownBreakAfter,
    },
});
