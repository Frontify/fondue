/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LINK,
    FloatingLinkProps,
    HTMLPropsAs,
    LinkPlugin,
    floatingLinkActions,
    floatingLinkSelectors,
    focusEditor,
    getPluginOptions,
    getSelectionBoundingClientRect,
    triggerFloatingLinkInsert,
    useComposedRef,
    useEditorRef,
    useFloatingLinkEscape,
    useFloatingLinkSelectors,
    useHotkeys,
    useOnClickOutside,
    useVirtualFloatingLink,
} from '@udecode/plate';
import { useEffect } from 'react';
import { useFocused } from 'slate-react';

export const useFloatingLinkInsert = ({ floatingOptions, ...props }: FloatingLinkProps): HTMLPropsAs<'div'> => {
    const editor = useEditorRef();
    const focused = useFocused();
    const mode = useFloatingLinkSelectors().mode();
    const open = useFloatingLinkSelectors().isOpen(editor.id);

    const { triggerFloatingLinkHotkeys } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);

    useHotkeys(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        triggerFloatingLinkHotkeys!,
        (e) => {
            if (triggerFloatingLinkInsert(editor, { focused })) {
                e.preventDefault();
            }
        },
        {
            enableOnContentEditable: true,
        },
        [focused],
    );

    const ref = useOnClickOutside(
        (event) => {
            const isClickedWithinModal = (event.target as HTMLElement).closest('.link-tree-container');
            if (floatingLinkSelectors.mode() === 'insert' && !isClickedWithinModal) {
                floatingLinkActions.hide();
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                focusEditor(editor, editor.selection!);
            }
        },
        {
            disabled: !open,
        },
    );

    const { update, style, floating } = useVirtualFloatingLink({
        editorId: editor.id,
        open: open && mode === 'insert',
        getBoundingClientRect: getSelectionBoundingClientRect,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        whileElementsMounted: () => {},
        ...floatingOptions,
    });

    // wait for update before focusing input
    useEffect(() => {
        if (open) {
            update();
            floatingLinkActions.updated(true);
        } else {
            floatingLinkActions.updated(false);
        }
    }, [open, update]);

    useFloatingLinkEscape();

    return {
        style: {
            ...style,
            zIndex: 1,
        },
        ...props,
        ref: useComposedRef<HTMLElement | null>(props.ref, floating, ref),
    };
};
