import { focusEditor, useEditorRef, useHotkeys } from '@udecode/plate-core';
import { floatingButtonActions, floatingButtonSelectors } from './floatingButtonStore';

export const useFloatingButtonEscape = () => {
    const editor = useEditorRef();

    useHotkeys(
        'escape',
        () => {
            if (floatingButtonSelectors.mode() !== 'edit') {
                return;
            }

            if (floatingButtonSelectors.isEditing()) {
                floatingButtonActions.show('edit', editor.id);
                focusEditor(editor, editor.selection!);
                return;
            }

            floatingButtonActions.hide();
        },
        {
            enableOnTags: ['INPUT'],
            enableOnContentEditable: true,
        },
        [],
    );
};
