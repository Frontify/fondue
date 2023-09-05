/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent } from 'react';
import { HTMLPropsAs, LinkRootProps, useElementProps } from '@udecode/plate';
import { getUrlFromLinkOrLegacyLink } from '../utils';
import { TLinkElement } from '../types';
import { useRichTextEditorContext } from '@components/RichTextEditor/context';
import { LINK_PLUGIN } from '../id';

const useLink = (props: LinkRootProps): HTMLPropsAs<'a'> => {
    const _props = useElementProps<TLinkElement, 'a'>({
        ...props,
        elementToAttributes: (element) => ({
            href: getUrlFromLinkOrLegacyLink(element),
            target: element.target || '_self',
        }),
    });

    return {
        ..._props,
        // quick fix: hovering <a> with href loses the editor focus
        onMouseOver: (e: MouseEvent) => {
            e.stopPropagation();
        },
    };
};

export const LinkMarkupElementNode = (props: LinkRootProps) => {
    const htmlProps = useLink(props);
    const { attributes, children } = props;
    const { styles } = useRichTextEditorContext();

    return (
        <a {...attributes} href={htmlProps.href} target={htmlProps.target} style={styles[LINK_PLUGIN]}>
            {children}
        </a>
    );
};
