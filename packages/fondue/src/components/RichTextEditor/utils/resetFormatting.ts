/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor } from '@udecode/plate-core';
import { Value, setElements } from '@udecode/slate';
import { removeMark } from '@udecode/slate-utils';
import { unwrapList } from '@udecode/plate-list';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

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
