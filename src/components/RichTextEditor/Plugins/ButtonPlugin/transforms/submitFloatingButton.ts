/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';
import { PlateEditor, Value, focusEditor, getPluginOptions } from '@udecode/plate';
import { floatingButtonActions, floatingButtonSelectors } from '../components/FloatingButton/floatingButtonStore';
import { ButtonPlugin, ELEMENT_BUTTON } from '../createButtonPlugin';
import { upsertButton } from './index';

export const submitFloatingButton = <V extends Value>(editor: PlateEditor<V>) => {
    if (!editor.selection) {
        return;
    }

    const { forceSubmit } = getPluginOptions<ButtonPlugin, V>(editor, ELEMENT_BUTTON);
    const url = floatingButtonSelectors.url();

    const isValid = isValidUrl(url) || forceSubmit;
    if (!isValid) {
        return;
    }

    const text = floatingButtonSelectors.text();
    const buttonStyle = floatingButtonSelectors.buttonStyle();
    const target = floatingButtonSelectors.newTab() ? undefined : '_self';

    floatingButtonActions.hide();

    upsertButton(editor, {
        url,
        text,
        buttonStyle,
        target,
    });

    setTimeout(() => {
        focusEditor(editor, editor.selection ?? undefined);
    }, 0);

    return true;
};
