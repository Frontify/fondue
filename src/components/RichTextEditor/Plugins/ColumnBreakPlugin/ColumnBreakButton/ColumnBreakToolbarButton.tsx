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
    const active = !!editor?.selection && someNode(editor, { match: { columnBreak: true } });
    const [isActive, setIsActive] = useState(active ? true : false);

    return (
        <ToolbarButton
            active={isActive}
            onMouseDown={(event) => {
                const setActive = getPreventDefaultHandler(setColumnBreak, editor, {
                    value: isActive ? false : true,
                    key: pluginKey,
                });
                setActive(event);
                setIsActive(isActive ? false : true);
            }}
            {...props}
        />
    );
};
