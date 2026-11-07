/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeHref } from '../../shared/helpers/href';

/** The schemes a link may use. */
export type LinkScheme = 'https' | 'http' | 'mailto' | 'tel';

/**
 * Which links an editor accepts, kept in the content so the renderer and the
 * export enforce it too. Hosts apply to web links only; a relative link points
 * at the site the document is shown on, so it is always allowed.
 */
export type LinkPolicy = {
    /** Default: every scheme. */
    allowedSchemes?: readonly LinkScheme[];
    /** An exact host (`frontify.com`) or any subdomain of one, not the apex (`*.frontify.com`). Default: any host. */
    allowedHosts?: readonly string[];
};

const ALL_SCHEMES: readonly LinkScheme[] = ['https', 'http', 'mailto', 'tel'];

const hostMatches = (pattern: string, hostname: string): boolean => {
    const allowed = pattern.toLowerCase();
    if (allowed.startsWith('*.')) {
        return hostname.endsWith(allowed.slice(1)) && hostname.length > allowed.length - 1;
    }
    return hostname === allowed;
};

/** Whether the href is safe to write and the policy accepts it. Anything unreadable is refused. */
export const allowsHref = (policy: LinkPolicy, href: unknown): href is string => {
    if (!isSafeHref(href)) {
        return false;
    }
    const { allowedSchemes = ALL_SCHEMES, allowedHosts } = policy;
    // Browsers read a backslash as a slash, so `/\host` leaves the site as `//host` does.
    const typed = href.trim().replaceAll('\\', '/');
    if (!/^[a-z][a-z\d+.-]*:/i.test(typed) && !typed.startsWith('//')) {
        return true;
    }
    let url: URL;
    try {
        // `//host/x` follows the scheme of the page, so it is judged as https.
        url = new URL(typed.startsWith('//') ? `https:${typed}` : typed);
    } catch {
        return false;
    }
    const scheme = url.protocol.slice(0, -1);
    if (!allowedSchemes.some((allowed) => allowed === scheme)) {
        return false;
    }
    if (allowedHosts === undefined || (scheme !== 'https' && scheme !== 'http')) {
        return true;
    }
    return allowedHosts.some((pattern) => hostMatches(pattern, url.hostname));
};

const joinOr = (items: readonly string[]): string => {
    if (items.length < 2) {
        return items.join('');
    }
    return `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`;
};

const describeHosts = (hosts: readonly string[]): string => {
    const lowered = hosts.map((host) => host.toLowerCase());
    const phrases = lowered.flatMap((host) => {
        if (host.startsWith('*.')) {
            const apex = host.slice(2);
            // Folded into the apex's phrase when both are allowed.
            return lowered.includes(apex) ? [] : [`subdomains of ${apex}`];
        }
        return [lowered.includes(`*.${host}`) ? `${host} or its subdomains` : host];
    });
    if (phrases.length === 0) {
        return 'Enter a link within this site.';
    }
    return `Enter a link to ${joinOr(phrases)}.`;
};

/** What the policy allows, for the message shown when a typed link is refused. Empty when it holds no limit to name. */
export const describeAllowed = ({ allowedSchemes, allowedHosts }: LinkPolicy): string => {
    const sentences: string[] = [];
    if (allowedHosts !== undefined) {
        sentences.push(describeHosts(allowedHosts));
    }
    if (allowedSchemes !== undefined && !ALL_SCHEMES.every((scheme) => allowedSchemes.includes(scheme))) {
        sentences.push(`Links may use ${joinOr(allowedSchemes)}.`);
    }
    return sentences.join(' ');
};
