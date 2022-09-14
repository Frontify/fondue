/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { HTMLPropsAs, LinkRootProps, StyledElementProps, Value, useElementProps } from '@udecode/plate';
import { getUrlFromLinkOrLegacyLink } from '../utils';
import { TLinkElement } from '../types';

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

export const LINK_CLASSES = 'tw-text-text-interactive tw-underline tw-cursor-pointer';

export const LinkMarkupElementNode = (props: StyledElementProps<Value, TLinkElement>) => {
    const htmlProps = useLink(props as LinkRootProps);
    const { attributes, children } = props;

    return (
        <a {...attributes} href={htmlProps.href} target={htmlProps.target} className={LINK_CLASSES}>
            {children}
        </a>
    );
};
