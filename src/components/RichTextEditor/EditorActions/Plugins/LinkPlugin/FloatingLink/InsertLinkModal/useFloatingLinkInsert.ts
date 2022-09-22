/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';
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
import { useFocused } from 'slate-react';

export const useFloatingLinkInsert = ({ floatingOptions, ...props }: FloatingLinkProps): HTMLPropsAs<'div'> => {
    const editor = useEditorRef();
    const focused = useFocused();
    const mode = useFloatingLinkSelectors().mode();
    const open = useFloatingLinkSelectors().open();

    const { triggerFloatingLinkHotkeys } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);

    useHotkeys(
        triggerFloatingLinkHotkeys!,
        () => {
            triggerFloatingLinkInsert(editor, {
                focused,
            });
        },
        {
            enableOnContentEditable: true,
        },
        [focused],
    );

    const ref = useOnClickOutside(() => {
        if (floatingLinkSelectors.mode() === 'insert') {
            floatingLinkActions.hide();
            focusEditor(editor, editor.selection!);
        }
    });

    const { update, style, floating } = useVirtualFloatingLink({
        open: open && mode === 'insert',
        getBoundingClientRect: getSelectionBoundingClientRect,
        whileElementsMounted: () => {
            //do nothing
        },
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
            zIndex: 501,
        },
        ...props,
        ref: useComposedRef<HTMLElement | null>(props.ref, floating, ref),
    };
};
