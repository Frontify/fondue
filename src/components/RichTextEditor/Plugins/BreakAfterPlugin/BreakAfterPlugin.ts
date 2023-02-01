/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { createPluginFactory } from '@udecode/plate';
import {
    KeyboardHandlerReturnType,
    PlateEditor,
    getBlockAbove,
    getHandler,
    getNode,
    getPointBefore,
    getPreventDefaultHandler,
    someNode,
} from '@udecode/plate-core';
import { Plugin, PluginProps } from '../Plugin';
import { BreakAfterButton } from './BreakAfterButton';
import { isBreakAfterEnabled } from './BreakAfterButton/BreakAfterToolbarButton';
import { setBreakAfter } from './utils/setBreakAfter';

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
const OnKeyDownBreakAfter = (editor: PlateEditor): KeyboardHandlerReturnType => {
    const { style } = useRichTextEditorContext();
    const columns = Number(style?.columns) ?? 1;

    return (event) => {
        const isActive = someNode(editor, { match: { breakAfterColumn: true } });
        const entry = getBlockAbove(editor);

        if (!entry) {
            return;
        }

        switch (event.key) {
            case 'Enter':
                handleEnterKeyEvent(editor, columns, isActive, event);
                break;

            case 'Backspace':
                handleBackSpaceKeyEvent(editor, isActive, event);
                break;

            case 'Delete':
                const anchor = editor.selection?.anchor;
                if (anchor) {
                    const nodeText = getNode(editor, anchor?.path)?.text as string;
                    const textLength = nodeText?.length ?? 0;
                    if (anchor.offset === textLength && isActive) {
                        getPreventDefaultHandler(setBreakAfter, editor, {
                            value: false,
                        })(event);
                    }
                }

                break;
        }
    };
};

export const createBreakAfterPlugin = createPluginFactory({
    key: KEY_ELEMENT_BREAK_AFTER,
    options: {
        columns: 2,
    },
    handlers: {
        onKeyDown: OnKeyDownBreakAfter,
    },
});

const handleBackSpaceKeyEvent = (editor: PlateEditor, isActive: boolean, event: React.KeyboardEvent<Element>) => {
    if (editor?.selection?.anchor.offset !== 0) {
        return;
    }
    const pointBefore = getPointBefore(editor, editor?.selection);
    const isListElement = someNode(editor, { match: { type: 'li' }, at: editor.selection });
    const isElementBeforeIsActive = someNode(editor, {
        match: { breakAfterColumn: true },
        at: pointBefore,
    });

    if (isElementBeforeIsActive && !isListElement) {
        return getPreventDefaultHandler(setBreakAfter, editor, {
            value: false,
            at: pointBefore,
        })(event);
    }
    if (isActive) {
        getHandler(setBreakAfter, editor, {
            value: true,
            at: pointBefore,
        })();
    }
};

const handleEnterKeyEvent = (
    editor: PlateEditor,
    columns: number,
    isActive: boolean,
    event: React.KeyboardEvent<Element>,
) => {
    if (event.shiftKey && event.ctrlKey && isBreakAfterEnabled(editor, columns, isActive)) {
        console.log(isBreakAfterEnabled(editor, columns, isActive));
        console.log('handle enter key event', columns);
        return getPreventDefaultHandler(setBreakAfter, editor, {
            value: !isActive,
        })(event);
    }
    if (event.shiftKey) {
        return;
    }
    if (isActive) {
        getPreventDefaultHandler(() => {
            editor.insertBreak();
            setBreakAfter(editor, {
                value: false,
            });
        })(event);
    }
};
