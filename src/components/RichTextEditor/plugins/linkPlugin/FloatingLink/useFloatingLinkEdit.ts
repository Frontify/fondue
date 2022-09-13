/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getUrlFromLinkOrLegacyLink } from '@components/RichTextEditor/components';
import {
    ELEMENT_LINK,
    FloatingLinkProps,
    HTMLPropsAs,
    PlateEditor,
    Value,
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
import { useCallback, useEffect } from 'react';

export const getUrlFromEditor = (editor: PlateEditor<Value>) => {
    let url = '';

    const linkNode = getAboveNode(editor, {
        match: { type: ELEMENT_LINK },
    });

    if (!Array.isArray(linkNode)) {
        return url;
    }

    url = getUrlFromLinkOrLegacyLink(linkNode[0] as any);
    return url;
};

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
        if (getUrlFromEditor(editor)) {
            floatingLinkActions.url(getUrlFromEditor(editor));
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
