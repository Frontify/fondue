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
import { ELEMENT_COLUMN_BREAK } from '../id';
import { setColumnBreak } from '../setColumnBreak';

export interface ColumnBreakToolbarButtonProps extends ToolbarButtonProps {
    pluginKey?: string;
}

export const ColumnBreakToolbarButton = ({
    id,
    pluginKey = ELEMENT_COLUMN_BREAK,
    ...props
}: ColumnBreakToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));
    const [isActive, setIsActive] = useState(!!editor?.selection && someNode(editor, { match: { columnBreak: true } }));

    return (
        <ToolbarButton
            active={isActive}
            onMouseDown={(event) => {
                getPreventDefaultHandler(setColumnBreak, editor, {
                    value: !isActive,
                    key: pluginKey,
                })(event);
                setIsActive(!isActive);
            }}
            {...props}
        />
    );
};
