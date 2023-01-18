/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { BasePlacement } from '@popperjs/core';
import {
    PlateEditor,
    ToolbarButton,
    ToolbarButtonProps,
    getNodeEntries,
    getPreventDefaultHandler,
    someNode,
    useEventPlateId,
    usePlateEditorState,
} from '@udecode/plate';
import React from 'react';
import { buttonClassNames } from '../../helper';
import { KEY_ELEMENT_BREAK_AFTER } from '../BreakAfterPlugin';
import { setBreakAfter } from '../utils/setBreakAfter';

export const BreakAfterToolbarButton = ({ id, pluginKey = KEY_ELEMENT_BREAK_AFTER, ...props }: ToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));
    const isActive = !!editor?.selection && someNode(editor, { match: { breakAfterColumn: true } });
    const { style } = useRichTextEditorContext();
    const columnCount = Number(style?.columns) || 1;
    const canBreakAfter = isBreakAfterEnabled(editor, columnCount, isActive);

    return (
        <ToolbarButton
            active={isActive}
            tooltip={getTooltip(
                canBreakAfter ? 'Break After Column.\n[shift+ctrl+return]' : 'Already at maximum number of columns',
            )}
            onMouseDown={(event) =>
                canBreakAfter
                    ? getPreventDefaultHandler(setBreakAfter, editor, {
                          value: !isActive,
                          key: pluginKey,
                      })(event)
                    : undefined
            }
            {...props}
            classNames={{
                root: `${buttonClassNames.root} ${canBreakAfter ? '' : '!tw-cursor-not-allowed !tw-opacity-50'}`,
                active: buttonClassNames.active,
            }}
        />
    );
};

const getTooltip = (content: string, placement?: BasePlacement) => ({
    className:
        'tw-bg-text tw-border tw-border-line-strong tw-text-box-neutral-strong-inverse tw-py-2 tw-px-3 -tw-mb-1 tw-rounded tw-shadow-lg tw-text-xs',
    content: content.split('\n').map((item) => {
        return (
            <span key={item}>
                {item}
                <br />
            </span>
        );
    }),
    placement,
});

const getBreakAfterCount = (editor: PlateEditor): number => {
    const nodeEntries = getNodeEntries(editor, { at: [], match: { breakAfterColumn: true } });
    return Array.from(nodeEntries).length;
};

export const isBreakAfterEnabled = (editor: PlateEditor, columnCount: number, isButtonActive: boolean): boolean =>
    getBreakAfterCount(editor) + 1 < columnCount || isButtonActive;
