/* eslint-disable @typescript-eslint/no-explicit-any */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { BreakAfterButton } from './BreakAfterButton';
import { Plugin, PluginProps } from '../Plugin';
import {
    KeyboardHandlerReturnType,
    getBlockAbove,
    getHandler,
    getNode,
    getPointBefore,
    getPreventDefaultHandler,
    queryNode,
    someNode,
} from '@udecode/plate-core';
import isHotkey from 'is-hotkey';
import { setBreakAfter } from './utils/setBreakAfter';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { isBreakAfterEnabled } from './BreakAfterButton/BreakAfterToolbarButton';
import { debounce } from '@utilities/debounce';

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
    const { style } = useRichTextEditorContext();
    const columns = Number(style?.columns) ?? 1;

    return (event) => {
        const isActive = someNode(editor, { match: { breakAfterColumn: true } });
        const entry = getBlockAbove(editor);

        if (!entry) {
            return;
        }

        for (const { hotkey, query } of rules) {
            if (
                isHotkey(hotkey, event as any) &&
                queryNode(entry, query) &&
                isBreakAfterEnabled(editor, columns, isActive)
            ) {
                return getPreventDefaultHandler(setBreakAfter, editor, {
                    value: !isActive,
                })(event);
            }
        }

        switch (event.key) {
            case 'Enter':
                if (event.shiftKey) {
                    break;
                }
                if (isActive) {
                    getHandler(setBreakAfter, editor, {
                        value: false,
                    })();
                    debounce(() => {
                        getHandler(setBreakAfter, editor, {
                            value: true,
                        })();
                    }, 1)();
                }
                break;

            case 'Backspace':
                if (editor.selection.anchor.offset !== 0) {
                    break;
                }
                const location = getPointBefore(editor, editor.selection);
                const isListElement = someNode(editor, { match: { type: 'li' }, at: editor.selection });
                const isElementBeforeIsActive = someNode(editor, {
                    match: { breakAfterColumn: true },
                    at: location,
                });
                if (isElementBeforeIsActive && !isListElement) {
                    getPreventDefaultHandler(setBreakAfter, editor, {
                        value: false,
                        at: location,
                    })(event);
                    break;
                }
                if (isActive) {
                    debounce(() => {
                        getHandler(setBreakAfter, editor, {
                            value: true,
                        })();
                    }, 1)();
                }
                break;

            case 'Delete':
                const anchor = editor.selection.anchor;
                if (anchor.offset === getNode(editor, anchor.path).text.length) {
                    getPreventDefaultHandler(setBreakAfter, editor, {
                        value: false,
                    })(event);
                }
                break;
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
