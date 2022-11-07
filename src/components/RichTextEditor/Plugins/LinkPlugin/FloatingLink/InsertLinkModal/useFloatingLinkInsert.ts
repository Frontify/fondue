import { useEffect } from 'react';
import {
    ELEMENT_LINK,
    FloatingLinkProps,
    HTMLPropsAs,
    LinkPlugin,
    floatingLinkActions,
    getPluginOptions,
    triggerFloatingLinkInsert,
    useComposedRef,
    useEditorRef,
    useFloatingLinkEscape,
    useFloatingLinkSelectors,
    useHotkeys,
    useVirtualFloatingLink,
} from '@udecode/plate';
import { getSelectionBoundingClientRect } from '@udecode/plate-floating';
import { useFocused } from 'slate-react';

export const useFloatingLinkInsert = ({ floatingOptions, ...props }: FloatingLinkProps): HTMLPropsAs<'div'> => {
    const editor = useEditorRef();
    const focused = useFocused();
    const mode = useFloatingLinkSelectors().mode();
    const open = useFloatingLinkSelectors().isOpen(editor.id);

    const { triggerFloatingLinkHotkeys } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);

    useHotkeys(
        triggerFloatingLinkHotkeys!,
        (e) => {
            e.preventDefault();

            triggerFloatingLinkInsert(editor, {
                focused,
            });
        },
        {
            enableOnContentEditable: true,
        },
        [focused],
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
        ref: useComposedRef<HTMLElement | null>(props.ref, floating),
    };
};
