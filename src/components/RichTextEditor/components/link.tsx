import { LinkRootProps, StyledElementProps, TLinkElement, Value, useLink } from '@udecode/plate';
import React from 'react';

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
