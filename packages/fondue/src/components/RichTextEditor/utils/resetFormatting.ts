/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_PARAGRAPH,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    PlateEditor,
    Value,
    removeMark,
    setElements,
    unwrapList,
} from '@udecode/plate';

export const resetFormatting = (editor: PlateEditor<Value>) => {
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
};
