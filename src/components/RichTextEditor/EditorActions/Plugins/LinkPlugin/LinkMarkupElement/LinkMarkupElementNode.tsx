/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { HTMLPropsAs, LinkRootProps, useElementProps } from '@udecode/plate';
import { getUrlFromLinkOrLegacyLink } from '../utils';
import { TLinkElement } from '../types';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';

const useLink = (props: LinkRootProps): HTMLPropsAs<'a'> => {
    const _props = useElementProps<TLinkElement, 'a'>({
        ...props,
        elementToAttributes: (element) => ({
            href: getUrlFromLinkOrLegacyLink(element),
            target: element.target || '_blank',
        }),
    });

    return {
        ..._props,
        // quick fix: hovering <a> with href loses the editor focus
        onMouseOver: (e) => {
            e.stopPropagation();
        },
    };
};

export const DEFAULT_LINK_CLASSES = 'tw-text-text-interactive tw-underline tw-cursor-pointer';

export const LinkMarkupElementNode = (props: LinkRootProps) => {
    const htmlProps = useLink(props);
    const { designTokens } = useRichTextEditorContext();
    const { attributes, children } = props;

    return (
        <a
            {...attributes}
            href={htmlProps.href}
            target={htmlProps.target}
            className={designTokens.link ? '' : DEFAULT_LINK_CLASSES}
            style={designTokens.link}
        >
            {children}
        </a>
    );
};
