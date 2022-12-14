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
            tooltip={{
                className: 'tw-bg-black tw-text-white tw-p-2 tw-rounded tw-shadow-lg', // todo: use correct tooltip styling (https://app.clickup.com/t/39qrpev)
                content: (
                    <span>
                        Add column break.
                        <br />
                        [shift+ctrl+return]
                    </span>
                ),
            }}
            onMouseDown={getPreventDefaultHandler(setBreakAfter, editor, {
                value: !isActive,
                key: pluginKey,
            })}
            {...props}
        />
    );
};
