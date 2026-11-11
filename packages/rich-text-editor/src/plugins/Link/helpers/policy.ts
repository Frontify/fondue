/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeHref } from '../../shared/helpers/href';

/**
 * The schemes a link may use.
 */
export type LinkScheme = 'https' | 'http' | 'mailto' | 'tel';

/**
 * Which links an editor accepts, kept in the content so the renderer and the
 * export enforce it too. Hosts apply to web links only; a relative link points
 * at the site the document is shown on, so it is always allowed.
 */
export type LinkPolicy = {
    /**
     * The schemes a link may use.
     * @default ['https', 'http', 'mailto', 'tel']
     */
    allowedSchemes?: readonly LinkScheme[];
    /**
     * An exact host (`frontify.com`) or any subdomain of one, not the apex (`*.frontify.com`). Without it, any host is allowed.
     */
    allowedHosts?: readonly string[];
};

const ALL_SCHEMES: readonly LinkScheme[] = ['https', 'http', 'mailto', 'tel'];

/**
 * Starts a host pattern that also matches its subdomains.
 */
const SUBDOMAIN_WILDCARD = '*.';

/**
 * The scheme `//host/x` takes, and with `HTTP` the web schemes that host limits apply to.
 */
const HTTPS: LinkScheme = 'https';

const HTTP: LinkScheme = 'http';

/**
 * A leading `scheme:`, which makes a link absolute.
 */
const SCHEME_PREFIX = /^[a-z][a-z\d+.-]*:/i;

const hostMatches = (pattern: string, hostname: string): boolean => {
    const allowed = pattern.toLowerCase();
    if (allowed.startsWith(SUBDOMAIN_WILDCARD)) {
        return hostname.endsWith(allowed.slice(1)) && hostname.length > allowed.length - 1;
    }
    return hostname === allowed;
};

const isRelative = (typed: string): boolean => !SCHEME_PREFIX.test(typed) && !typed.startsWith('//');

const parseAbsolute = (typed: string): URL | null => {
    try {
        // `//host/x` follows the scheme of the page, so it is judged as https.
        return new URL(typed.startsWith('//') ? `${HTTPS}:${typed}` : typed);
    } catch {
        return null;
    }
};

/**
 * Whether the href is safe to write and the policy accepts it. Anything unreadable is refused.
 */
export const allowsHref = (policy: LinkPolicy, href: unknown): href is string => {
    if (!isSafeHref(href)) {
        return false;
    }
    // Browsers read a backslash as a slash, so `/\host` leaves the site as `//host` does.
    const typed = href.trim().replaceAll('\\', '/');
    if (isRelative(typed)) {
        return true;
    }
    const url = parseAbsolute(typed);
    if (url === null) {
        return false;
    }
    const { allowedSchemes = ALL_SCHEMES, allowedHosts } = policy;
    const scheme = url.protocol.slice(0, -1);
    if (!allowedSchemes.some((allowed) => allowed === scheme)) {
        return false;
    }
    if (allowedHosts === undefined || (scheme !== HTTPS && scheme !== HTTP)) {
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
        if (host.startsWith(SUBDOMAIN_WILDCARD)) {
            const apex = host.slice(SUBDOMAIN_WILDCARD.length);
            // Folded into the apex's phrase when both are allowed.
            if (lowered.includes(apex)) {
                return [];
            }
            return [`subdomains of ${apex}`];
        }
        if (lowered.includes(`${SUBDOMAIN_WILDCARD}${host}`)) {
            return [`${host} or its subdomains`];
        }
        return [host];
    });
    if (phrases.length === 0) {
        return 'Enter a link within this site.';
    }
    return `Enter a link to ${joinOr(phrases)}.`;
};

/**
 * What the policy allows, for the message shown when a typed link is refused. Empty when it holds no limit to name.
 */
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
