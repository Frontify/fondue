/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, findNode, getEditorString, getPluginType } from '@udecode/plate-core';
import { floatingButtonActions } from '../components/FloatingButton/floatingButtonStore';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { TButtonElement } from '../types';

export const triggerFloatingButtonEdit = <V extends Value>(editor: PlateEditor<V>) => {
    const entry = findNode<TButtonElement>(editor, {
        match: { type: getPluginType(editor, ELEMENT_BUTTON) },
    });
    if (!entry) {
        return;
    }

    const [link, path] = entry;

    let text = getEditorString(editor, path);

    floatingButtonActions.url(link.url);

    floatingButtonActions.newTab(link.target === undefined);

    if (text === link.url) {
        text = '';
    }

    floatingButtonActions.text(text);

    floatingButtonActions.isEditing(true);
};
