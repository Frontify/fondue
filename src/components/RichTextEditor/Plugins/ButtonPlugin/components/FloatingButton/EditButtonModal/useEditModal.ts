/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect } from 'react';
import {
    HTMLPropsAs,
    getAboveNode,
    getDefaultBoundingClientRect,
    getEndPoint,
    getPluginType,
    getRangeBoundingClientRect,
    getStartPoint,
    someNode,
    useComposedRef,
    useEditorRef,
    usePlateSelectors,
} from '@udecode/plate';
import { getUrlFromEditor } from '../../../utils/getUrl';
import { ELEMENT_BUTTON } from '../../../createButtonPlugin';
import { floatingButtonActions, floatingButtonSelectors, useFloatingButtonSelectors } from '../floatingButtonStore';
import { useVirtualFloatingButton } from '../useVirtualFloatingButton';
import { FloatingButtonProps } from '../FloatingButton';

export const useEditModal = ({ floatingOptions, ...props }: FloatingButtonProps): HTMLPropsAs<'div'> => {
    const editor = useEditorRef();
    const keyEditor = usePlateSelectors(editor.id).keyEditor();
    const mode = useFloatingButtonSelectors().mode();
    const open = useFloatingButtonSelectors().open();

    const getBoundingClientRect = useCallback(() => {
        const entry = getAboveNode(editor, {
            match: { type: getPluginType(editor, ELEMENT_BUTTON) },
        });

        if (entry) {
            const [, path] = entry;
            return getRangeBoundingClientRect(editor, {
                anchor: getStartPoint(editor, path),
                focus: getEndPoint(editor, path),
            });
        }

        return getDefaultBoundingClientRect();
    }, [editor]);

    const isOpen = open && mode === 'edit';

    const { update, style, floating } = useVirtualFloatingButton({
        open: isOpen,
        getBoundingClientRect,
        ...floatingOptions,
    });

    useEffect(() => {
        const url = getUrlFromEditor(editor);
        if (url) {
            floatingButtonActions.url(url);
        }
        if (
            editor.selection &&
            someNode(editor, {
                match: { type: getPluginType(editor, ELEMENT_BUTTON) },
            })
        ) {
            floatingButtonActions.show('edit');

            update();
            return;
        }

        if (floatingButtonSelectors.mode() === 'edit') {
            floatingButtonActions.hide();
        }
    }, [editor, keyEditor, update]);

    return {
        style: {
            ...style,
            zIndex: 1,
        },
        ...props,
        ref: useComposedRef<HTMLElement | null>(props.ref, floating),
    };
};
