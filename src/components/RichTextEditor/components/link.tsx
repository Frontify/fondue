import { HTMLPropsAs, LinkRootProps, StyledElementProps, TLinkElement, useElementProps, Value } from '@udecode/plate';
import React from 'react';

export type LinkOrLegacyLink = {
    url?: string;
    chosenLink?: {
        searchResult?: {
            link?: string;
        };
    };
};

export const getUrlFromLinkOrLegacyLink = (element: TLinkElement): string => {
    const link = element as unknown as LinkOrLegacyLink;
    return link.url || link.chosenLink?.searchResult?.link || '';
};

const useLink = (props: LinkRootProps): HTMLPropsAs<'a'> => {
    console.log('here', props);
    const _props = useElementProps<TLinkElement, 'a'>({
        ...props,
        elementToAttributes: (element) => ({
            href: getUrlFromLinkOrLegacyLink(element),
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

export const LinkElement = (props: StyledElementProps<Value, TLinkElement>) => {
    const htmlProps = useLink(props as LinkRootProps);
    const { attributes, children } = props;

    return (
        <a {...attributes} href={htmlProps.href} className={LINK_CLASSES}>
            {children}
        </a>
    );
};
