/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BlockToolbarButtonProps,
    ToolbarButton,
    getPreventDefaultHandler,
    someNode,
    toggleNodeType,
    unwrapList,
    useEventPlateId,
    usePlateEditorState,
    withPlateProvider,
} from '@udecode/plate';
import React from 'react';

export const CheckboxListToolbarButton = withPlateProvider(
    ({ id, type, inactiveType, active, ...props }: BlockToolbarButtonProps) => {
        const editor = usePlateEditorState(useEventPlateId(id));

        const isActive = active ?? (!!editor?.selection && someNode(editor, { match: { type } }));

        return (
            <ToolbarButton
                active={isActive}
                onMouseDown={(event) => {
                    if (!editor || !editor.selection) {
                        return;
                    }

                    if (!isActive) {
                        unwrapList(editor, {});
                    }

                    getPreventDefaultHandler(toggleNodeType, editor, {
                        activeType: type,
                        inactiveType,
                    })(event);
                }}
                {...props}
            />
        );
    },
);
