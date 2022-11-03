import { useMemo } from 'react';
import {
    AsProps,
    HTMLPropsAs,
    createComponentAs,
    createElementAs,
    findNode,
    getPluginType,
    useEditorRef,
} from '@udecode/plate-core';
import { ELEMENT_BUTTON } from '../../createButtonPlugin';
import { TButtonElement } from '../../types';

export const useOpenButtonButton = (props: HTMLPropsAs<'a'>): HTMLPropsAs<'a'> => {
    const editor = useEditorRef();

    const entry = useMemo(
        () =>
            findNode<TButtonElement>(editor, {
                match: { type: getPluginType(editor, ELEMENT_BUTTON) },
            }),
        [editor],
    );

    if (!entry) {
        return {};
    }

    const [link] = entry;

    return {
        'aria-label': 'Open link in a new tab',
        target: '_blank',
        href: link.url,
        onMouseOver: (e) => {
            e.stopPropagation();
        },
        ...props,
    };
};

export const OpenButtonButton = createComponentAs<AsProps<'a'>>((props) => {
    const htmlProps = useOpenButtonButton(props);

    return createElementAs('a', htmlProps);
});
