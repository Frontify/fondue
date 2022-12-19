/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ToolbarButton,
    ToolbarButtonProps,
    getPreventDefaultHandler,
    someNode,
    useEventPlateId,
    usePlateEditorState,
} from '@udecode/plate';
import React from 'react';
import { KEY_ELEMENT_BREAK_AFTER } from '../BreakAfterPlugin';
import { setBreakAfter } from '../utils/setBreakAfter';

export const BreakAfterToolbarButton = ({ id, pluginKey = KEY_ELEMENT_BREAK_AFTER, ...props }: ToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));
    const isActive = !!editor?.selection && someNode(editor, { match: { breakAfterColumn: true } });

    return (
        <ToolbarButton
            active={isActive}
            tooltip={getTooltip('Add column break.\n[shift+ctrl+return]')}
            onMouseDown={getPreventDefaultHandler(setBreakAfter, editor, {
                value: !isActive,
                key: pluginKey,
            })}
            {...props}
        />
    );
};

const getTooltip = (content: string) => ({
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
});
