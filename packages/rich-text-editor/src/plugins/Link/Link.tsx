/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

import { LinkFlyout } from './components/LinkFlyout';
import { type LinkValue } from './helpers/draft';
import styles from './link.module.scss';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    link?: LinkValue;
};

export const linkPlugin = (): RtePlugin => ({
    id: 'link',
    schema: [
        {
            kind: 'mark',
            type: 'link',
            attributes: {
                href: { parseFromDomAttribute: 'href' },
                // No parse rule: `target` is a string in HTML and a flag
                // here, so a pasted link keeps its href but not this.
                openInNewTab: { default: null },
            },
            // Outside every other mark, so a partly styled link still
            // renders as ONE anchor: an element stays open across text runs
            // only while the marks around it are the same, and a colour or
            // an emphasis inside would otherwise cut it up.
            nesting: -2,
            toDom: (attrs) => {
                const link = attrs as Partial<LinkValue>;
                return {
                    tag: 'a',
                    attrs: {
                        href: link.href ?? '',
                        class: styles.link ?? '',
                        ...(link.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                    },
                    children: true,
                };
            },
            renderComponent: ({ value, children }) => {
                const link = value as Partial<LinkValue>;
                return (
                    <a
                        href={link.href}
                        className={styles.link}
                        {...(link.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        {children}
                    </a>
                );
            },
        },
    ],
    toolbar: (api) => <LinkFlyout api={api} />,
});
