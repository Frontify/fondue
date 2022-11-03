import { PlateEditor, Value, focusEditor, getPluginOptions } from '@udecode/plate-core';
import { floatingButtonActions, floatingButtonSelectors } from '../components/FloatingButton/floatingButtonStore';
import { ButtonPlugin, ELEMENT_BUTTON } from '../createButtonPlugin';
import { upsertButton } from './index';

/**
 * Insert button if url is valid.
 * Text is url if empty.
 * Close floating button.
 * Focus editor.
 */
export const submitFloatingButton = <V extends Value>(editor: PlateEditor<V>) => {
    if (!editor.selection) {
        return;
    }

    const { isUrl, forceSubmit } = getPluginOptions<ButtonPlugin, V>(editor, ELEMENT_BUTTON);

    const url = floatingButtonSelectors.url();
    console.log('submitFloatingButton', url);

    const isValid = isUrl?.(url) || forceSubmit;
    if (!isValid) {
        return;
    }

    const text = floatingButtonSelectors.text();
    const target = floatingButtonSelectors.newTab() ? undefined : '_self';

    floatingButtonActions.hide();

    upsertButton(editor, {
        url,
        text,
        target,
        isUrl: (_url) => (forceSubmit || !isUrl ? true : isUrl(_url)),
    });

    setTimeout(() => {
        focusEditor(editor, editor.selection!);
    }, 0);

    return true;
};
