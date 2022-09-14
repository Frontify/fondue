/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect } from 'react';
import {
    ELEMENT_LINK,
    FloatingLinkProps,
    HTMLPropsAs,
    floatingLinkActions,
    floatingLinkSelectors,
    getAboveNode,
    getDefaultBoundingClientRect,
    getEndPoint,
    getPluginType,
    getRangeBoundingClientRect,
    getStartPoint,
    someNode,
    useComposedRef,
    useEditorRef,
    useFloatingLinkSelectors,
    usePlateSelectors,
    useVirtualFloatingLink,
} from '@udecode/plate';
import { getUrlFromEditor } from '../utils';

export const useFloatingLinkEdit = ({ floatingOptions, ...props }: FloatingLinkProps): HTMLPropsAs<'div'> => {
    const editor = useEditorRef();
    const keyEditor = usePlateSelectors(editor.id).keyEditor();
    const mode = useFloatingLinkSelectors().mode();
    const open = useFloatingLinkSelectors().open();

    const getBoundingClientRect = useCallback(() => {
        const entry = getAboveNode(editor, {
            match: { type: getPluginType(editor, ELEMENT_LINK) },
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

    const { update, style, floating } = useVirtualFloatingLink({
        open: isOpen,
        getBoundingClientRect,
        ...floatingOptions,
    });

    useEffect(() => {
        const url = getUrlFromEditor(editor);
        if (url) {
            floatingLinkActions.url(url);
        }
        if (
            editor.selection &&
            someNode(editor, {
                match: { type: getPluginType(editor, ELEMENT_LINK) },
            })
        ) {
            floatingLinkActions.show('edit');

            update();
            return;
        }

        if (floatingLinkSelectors.mode() === 'edit') {
            floatingLinkActions.hide();
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
