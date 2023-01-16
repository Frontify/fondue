/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    PlateEditor,
    ToolbarButton,
    ToolbarButtonProps,
    Value,
    getPreventDefaultHandler,
    someNode,
    useEventPlateId,
    usePlateEditorState,
} from '@udecode/plate';
import React from 'react';
import { KEY_ELEMENT_BREAK_AFTER } from '../BreakAfterPlugin';
import { setBreakAfter } from '../utils/setBreakAfter';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';

export const BreakAfterToolbarButton = ({ id, pluginKey = KEY_ELEMENT_BREAK_AFTER, ...props }: ToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));
    const isActive = !!editor?.selection && someNode(editor, { match: { breakAfterColumn: true } });
    const { style } = useRichTextEditorContext();

    return (
        <ToolbarButton
            active={isActive}
            tooltip={getTooltip('Break After Column.\n[shift+ctrl+return]')}
            onMouseDown={(event) =>
                enableColumnBreak(editor, Number(style?.columns) ?? 1)
                    ? getPreventDefaultHandler(setBreakAfter, editor, {
                          value: !isActive,
                          key: pluginKey,
                      })(event)
                    : undefined
            }
            {...props}
        />
    );
};

const getTooltip = (content: string) => ({
    className: 'tw-bg-black tw-text-white tw-py-2 tw-px-3 -tw-mb-1 tw-rounded tw-shadow-lg tw-text-xs',
    content: content.split('\n').map((item) => {
        return (
            <span key={item}>
                {item}
                <br />
            </span>
        );
    }),
});

export const enableColumnBreak = (editor: PlateEditor, columns?: number): boolean => {
    const isActive = someNode(editor, { match: { breakAfterColumn: true } });

    const countColumnBreaks = (children: Value): number => {
        let count = 0;
        if (!children) {
            return count;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const findBreakAfterRecursive = (childNodes: any): void => {
            if (!Array.isArray(childNodes)) {
                return;
            }
            // cannot return for..of array thats why we use forEach
            // eslint-disable-next-line unicorn/no-array-for-each, @typescript-eslint/no-explicit-any
            return childNodes.forEach((child: { children: any; breakAfterColumn: boolean }) => {
                if (child.breakAfterColumn) {
                    count++;
                    return;
                }
                if (child.children) {
                    return findBreakAfterRecursive(child.children);
                }
            });
        };
        findBreakAfterRecursive(children);
        return count;
    };

    return countColumnBreaks(editor.children) < (columns ?? 1) - 1 || isActive;
};
