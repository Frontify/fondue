/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AnchorHTMLAttributes } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = (props: AnchorProps) => {
    const pageContext = usePageContext();
    const { urlPathname } = pageContext;
    const { href } = props;
    const isActive = !href || href === '/' ? urlPathname === href : urlPathname.startsWith(href);
    const className = [props.className, isActive && 'is-active'].filter(Boolean).join(' ');
    return <a {...props} className={className} data-route-active={isActive} />;
};
