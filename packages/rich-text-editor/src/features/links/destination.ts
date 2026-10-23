/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReferenceValue } from '#/bridge/plugin';
import { checkHref, type HrefPolicy } from '#/model';

const SCHEME = /^[a-z][a-z\d+.-]*:/i;
const HOST = /^[a-z\d-]+(?:\.[a-z\d-]+)+$/i;

/**
 * A typed destination with `https://` before it when it has no scheme and no space, does not start with `/`, `.`, `#`
 * or `?`, and its part before the first `/`, `?` or `#` is a dotted host name, so `frontify.com/brand` and
 * `guide.html` become absolute while `/docs/v1.2`, `./a.pdf`, `#top` and `?q=a.b` stay relative.
 */
export const withScheme = (typed: string): string => {
    const text = typed.trim();
    if (text === '' || SCHEME.test(text) || /\s/.test(text) || /^[/.#?]/.test(text)) {
        return text;
    }
    const host = text.split(/[/?#]/, 1)[0] ?? '';
    if (!HOST.test(host)) {
        return text;
    }
    return `https://${text}`;
};

/** A search result the link popover lists: its label and its checked `href`. */
export interface Destination {
    readonly key: string;
    readonly label: string;
    readonly href: string;
}

/** The results that carry an `href` passing the URL check and the feature's policy, which only those can link to. */
export const destinationsOf = (items: readonly ReferenceValue[], policy: HrefPolicy | undefined): Destination[] =>
    items.flatMap((item) => {
        if (typeof item.href !== 'string') {
            return [];
        }
        const checked = checkHref(item.href, policy);
        if (!checked.ok) {
            return [];
        }
        return [{ key: `${item.resourceType} ${item.resourceId}`, label: item.labelSnapshot, href: checked.href }];
    });
