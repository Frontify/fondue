/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent } from 'react';
import { HTMLPropsAs, LinkRootProps, useElementProps } from '@udecode/plate';
import { getUrlFromLinkOrLegacyLink } from '../utils';
import { TLinkElement } from '../types';
import { getTextStyleCssProperties } from '../../';

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
        onMouseOver: (e: MouseEvent) => {
            e.stopPropagation();
        },
    };
};

export const LinkMarkupElementNode = (props: LinkRootProps) => {
    const htmlProps = useLink(props);
    const { attributes, children } = props;

    console.log('LinkMarkupElementNode', props);

    return (
        <a {...attributes} href={htmlProps.href} target={htmlProps.target} style={getTextStyleCssProperties('link')}>
            {children}
        </a>
    );
};
