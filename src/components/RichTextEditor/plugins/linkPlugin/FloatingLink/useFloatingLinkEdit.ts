import {
    ELEMENT_LINK,
    floatingLinkActions,
    FloatingLinkProps,
    floatingLinkSelectors,
    getAboveNode,
    getDefaultBoundingClientRect,
    getEndPoint,
    getPluginType,
    getRangeBoundingClientRect,
    getStartPoint,
    HTMLPropsAs,
    PlateEditor,
    someNode,
    useComposedRef,
    useEditorRef,
    useFloatingLinkSelectors,
    usePlateSelectors,
    useVirtualFloatingLink,
    Value,
} from '@udecode/plate';
import { useCallback, useEffect } from 'react';

const getUrlFromEditor = (editor: PlateEditor<Value>) => {
    let url = '';

    const linkNode = getAboveNode(editor, {
        match: { type: ELEMENT_LINK },
    });

    if (!Array.isArray(linkNode)) {
        return url;
    }

    if (linkNode[0].url) {
        url = linkNode[0].url as string;
    }

    // legacy link structure
    else if (linkNode[0].chosenLink) {
        const legacyLink = linkNode[0] as unknown as {
            chosenLink: {
                searchResult: {
                    link: string;
                };
            };
        };
        url = legacyLink.chosenLink.searchResult.link;
    }
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
            console.log('floatingLinkSelectors.url()');
            console.log(floatingLinkSelectors.url());
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
