import {
    getPreventDefaultHandler,
    someNode,
    toggleNodeType,
    useEventPlateId,
    usePlateEditorState,
    withPlateEventProvider,
} from '@udecode/plate-core';
import { unwrapList } from '@udecode/plate-list';
import { BlockToolbarButtonProps, ToolbarButton } from '@udecode/plate-ui-toolbar';
import React from 'react';

export const CheckboxListToolbarButton = withPlateEventProvider(
    ({ id, type, inactiveType, active, ...props }: BlockToolbarButtonProps) => {
        id = useEventPlateId(id);
        const editor = usePlateEditorState(id)!;

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
