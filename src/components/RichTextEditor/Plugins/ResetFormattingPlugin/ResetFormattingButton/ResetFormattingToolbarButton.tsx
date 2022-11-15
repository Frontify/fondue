import {
    ELEMENT_PARAGRAPH,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    ToolbarButton,
    ToolbarButtonProps,
    removeMark,
    setElements,
    unwrapList,
    useEventPlateId,
    usePlateEditorState,
    withPlateProvider,
} from '@udecode/plate';
import React from 'react';

export const ResetFormattingToolbarButton = withPlateProvider(({ id, ...props }: ToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));

    return (
        <ToolbarButton
            onMouseDown={() => {
                if (!editor || !editor.selection) {
                    return;
                }

                removeMark(editor, {
                    key: [MARK_BOLD, MARK_ITALIC, MARK_CODE, MARK_UNDERLINE, MARK_STRIKETHROUGH],
                });

                unwrapList(editor, {});

                setElements(editor, {
                    type: ELEMENT_PARAGRAPH,
                    align: undefined,
                });
            }}
            {...props}
        />
    );
});
