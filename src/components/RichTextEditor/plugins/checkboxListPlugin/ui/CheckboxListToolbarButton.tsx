import {
    BlockToolbarButtonProps,
    ToolbarButton,
    getPreventDefaultHandler,
    someNode,
    toggleNodeType,
    unwrapList,
    useEventPlateId,
    usePlateEditorState,
    withPlateEventProvider,
} from '@udecode/plate';
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
