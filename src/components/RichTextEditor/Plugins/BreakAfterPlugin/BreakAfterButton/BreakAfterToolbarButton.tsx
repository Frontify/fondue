/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ToolbarButton,
    ToolbarButtonProps,
    getPreventDefaultHandler,
    someNode,
    useEventPlateId,
    usePlateEditorState,
} from '@udecode/plate';
import React, { useState } from 'react';
import { ELEMENT_BREAK_AFTER } from '../id';
import { setBreakAfter } from '../setBreakAfter';

export interface BreakAfterToolbarButtonProps extends ToolbarButtonProps {
    pluginKey?: string;
}

export const BreakAfterToolbarButton = ({
    id,
    pluginKey = ELEMENT_BREAK_AFTER,
    ...props
}: BreakAfterToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));
    const [isActive, setIsActive] = useState(
        !!editor?.selection && someNode(editor, { match: { breakAfterColumn: true } }),
    );

    return (
        <ToolbarButton
            active={isActive}
            onMouseDown={(event) => {
                getPreventDefaultHandler(setBreakAfter, editor, {
                    value: !isActive,
                    key: pluginKey,
                })(event);
                setIsActive(!isActive);
            }}
            {...props}
        />
    );
};
