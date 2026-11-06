/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark } from '#/core';

import { isSafeHref } from '../shared/helpers/href';

import { type LinkValue } from './helpers/value';
import styles from './link.module.scss';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    link?: LinkValue;
};

const newTabAttrs = (link: Partial<LinkValue> | null | undefined): Record<string, string> =>
    link?.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {};

/**
 * A link is a mark: the text stays text, and the target rides along on it.
 *
 * Only web, mail and phone links (and relative ones) are links: anything else
 * pasted in stays plain text, and a stored one is written out without its
 * target, so a `javascript:` URL is never clickable.
 */
export const linkContent = defineContent({
    marks: {
        link: defineMark<LinkValue>({
            // Outside every other mark, so a partly styled link still renders
            // as ONE anchor: an element stays open across text runs only while
            // the marks around it are the same, and a colour or an emphasis
            // inside would otherwise cut it up.
            nesting: -2,
            // Typing at the end of a link does not extend it.
            inclusive: false,

            /** The link everywhere but while editing: readonly, export, copy. */
            toHtml: (value) => {
                // A stored document may hold anything here (`{}`, `true`), so
                // nothing about its shape is taken on trust.
                const link = typeof value === 'object' ? (value as Partial<LinkValue> | null) : null;
                const href = link?.href;
                return {
                    tag: 'a',
                    attrs: {
                        ...(isSafeHref(href) ? { href } : {}),
                        class: styles.link,
                        ...newTabAttrs(link),
                    },
                    children: true,
                };
            },

            parse: [
                {
                    tag: 'a[href]',
                    value: (element) => {
                        const href = element.getAttribute('href') ?? '';
                        return isSafeHref(href)
                            ? {
                                  href,
                                  ...(element.getAttribute('target') === '_blank'
                                      ? { openInNewTab: true as const }
                                      : {}),
                              }
                            : null;
                    },
                },
            ],
        }),
    },
});
