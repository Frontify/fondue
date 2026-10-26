/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import { type ReaderNodeProps, type ReaderRenderers } from '#/reader/define';

// Read by screen readers and never seen.
const VISUALLY_HIDDEN: CSSProperties = {
    position: 'absolute',
    inlineSize: 1,
    blockSize: 1,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
};

/**
 * A link whose `href` passed the URL check again, or its text alone; a new-window link opens with no opener and says
 * so in the reader's locale, out of sight.
 */
const Link = ({ attrs, children, context }: ReaderNodeProps) => {
    const checked = typeof attrs.href === 'string' ? context.checkHref(attrs.href) : undefined;
    if (checked === undefined || !checked.ok) {
        return <>{children}</>;
    }

    if (attrs.openInNewWindow !== true) {
        return (
            <a href={checked.href} rel="noopener">
                {children}
            </a>
        );
    }

    return (
        <a href={checked.href} rel="noopener noreferrer" target="_blank">
            {children}
            <span style={VISUALLY_HIDDEN} data-rte-hidden-text="">
                {` ${context.t('RichTextEditor_linkNewWindow')}`}
            </span>
        </a>
    );
};

export const linkReader: ReaderRenderers = { link: Link };

/** The feature these renderers belong to. */
export const readerFeature = 'links';
