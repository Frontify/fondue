/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, getEditorString, getPluginType, isRangeAcrossBlocks, someNode } from '@udecode/plate';
import { floatingButtonActions, floatingButtonSelectors } from '../components/FloatingButton/floatingButtonStore';
import { ELEMENT_BUTTON } from '../createButtonPlugin';

/**
 * Trigger floating button.
 *
 * Do not trigger when:
 * - selection is across blocks
 * - selection has more than one leaf node
 * - lowest selection is not text
 * - selection has a button node
 */
export const triggerFloatingButtonInsert = <V extends Value>(
    editor: PlateEditor<V>,
    {
        focused,
    }: {
        focused?: boolean;
    } = {},
) => {
    if (floatingButtonSelectors.mode()) {
        return;
    }

    if (!focused) {
        return;
    }

    if (isRangeAcrossBlocks(editor, { at: editor.selection })) {
        return;
    }

    const hasButton = someNode(editor, {
        match: { type: getPluginType(editor, ELEMENT_BUTTON) },
    });
    if (hasButton) {
        return;
    }

    floatingButtonActions.text(getEditorString(editor, editor.selection));
    floatingButtonActions.show('insert', editor.id);
};
