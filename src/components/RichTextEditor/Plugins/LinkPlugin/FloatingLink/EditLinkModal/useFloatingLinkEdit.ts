/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect } from 'react';
import {
    ELEMENT_LINK,
    FloatingLinkProps,
    HTMLPropsAs,
    LinkPlugin,
    floatingLinkActions,
    floatingLinkSelectors,
    getAboveNode,
    getDefaultBoundingClientRect,
    getEndPoint,
    getPluginOptions,
    getPluginType,
    getRangeBoundingClientRect,
    getStartPoint,
    someNode,
    triggerFloatingLinkEdit,
    useComposedRef,
    useEditorRef,
    useFloatingLinkEnter,
    useFloatingLinkEscape,
    useFloatingLinkSelectors,
    useHotkeys,
    usePlateSelectors,
    useVirtualFloatingLink,
} from '@udecode/plate';
import { getUrlFromEditor } from '../../utils';

export const useFloatingLinkEdit = ({ floatingOptions, ...props }: FloatingLinkProps): HTMLPropsAs<'div'> => {
    const editor = useEditorRef();
    const keyEditor = usePlateSelectors().keyEditor();
    const mode = useFloatingLinkSelectors().mode();
    const open = useFloatingLinkSelectors().isOpen(editor.id);

    const { triggerFloatingLinkHotkeys = 'command+k, ctrl+k' } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);

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
        editorId: editor.id,
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
            floatingLinkActions.show('edit', editor.id);
            update();
            return;
        }

        if (floatingLinkSelectors.mode() === 'edit') {
            floatingLinkActions.hide();
        }
    }, [editor, keyEditor, update]);

    useHotkeys(
        triggerFloatingLinkHotkeys,
        (e) => {
            e.preventDefault();

            if (floatingLinkSelectors.mode() === 'edit') {
                triggerFloatingLinkEdit(editor);
            }
        },
        {
            enableOnContentEditable: true,
        },
        [],
    );

    useFloatingLinkEnter();

    useFloatingLinkEscape();

    return {
        style: {
            ...style,
            zIndex: 1,
        },
        ...props,
        ref: useComposedRef<HTMLElement | null>(props.ref, floating),
    };
};
