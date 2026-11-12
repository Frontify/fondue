/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeHref, LINK_SCHEMES, type LinkScheme } from '../../shared/helpers/href';

export { type LinkScheme } from '../../shared/helpers/href';

/**
 * Which links an editor accepts, kept in the content so the renderer and the
 * export enforce it too, when they are given the same `linkPlugin` or `linkContent`;
 * without it, they render any safe link. Hosts apply to every link that names one; a mail or
 * phone address names none, and a relative link points at the site the document is shown on,
 * so both are always allowed by host.
 */
export type LinkPolicy = {
    /**
     * The schemes a link may use.
     * @default ['https', 'http', 'mailto', 'tel']
     */
    allowedSchemes?: readonly LinkScheme[];
    /**
     * An exact host (`frontify.com`), or a host and any subdomain of it (`*.frontify.com`). Without it, any host is allowed.
     */
    allowedHosts?: readonly string[];
};

/**
 * Starts a host pattern that matches its host and every subdomain of it.
 */
const SUBDOMAIN_WILDCARD = '*.';

/**
 * The scheme `//host/x` takes.
 */
const HTTPS: LinkScheme = 'https';

/**
 * A leading `scheme:`, which makes a link absolute.
 */
const SCHEME_PREFIX = /^[a-z][a-z\d+.-]*:/i;

const hostMatches = (pattern: string, hostname: string): boolean => {
    const allowed = pattern.toLowerCase();
    if (allowed.startsWith(SUBDOMAIN_WILDCARD)) {
        const host = allowed.slice(SUBDOMAIN_WILDCARD.length);
        return hostname === host || hostname.endsWith(`.${host}`);
    }
    return hostname === allowed;
};

const isRelative = (typed: string): boolean => !SCHEME_PREFIX.test(typed) && !typed.startsWith('//');

const parseAbsolute = (typed: string): URL | null => {
    let address = typed;
    if (typed.startsWith('//')) {
        // `//host/x` follows the scheme of the page, so it is judged as https.
        address = `${HTTPS}:${typed}`;
    }
    try {
        return new URL(address);
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
    const { allowedSchemes = LINK_SCHEMES, allowedHosts } = policy;
    const scheme = url.protocol.slice(0, -1);
    // Widened so a scheme read from a URL, which is any string, can be looked up.
    const permittedSchemes: readonly string[] = allowedSchemes;
    if (!permittedSchemes.includes(scheme)) {
        return false;
    }
    // `mailto:a@b.co` has no host, but `mailto://evil.example/x` has one, which is checked like any other.
    if (allowedHosts === undefined || url.hostname === '') {
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
            return [`${host.slice(SUBDOMAIN_WILDCARD.length)} (or a subdomain)`];
        }
        // The wildcard's phrase names this host already.
        if (lowered.includes(`${SUBDOMAIN_WILDCARD}${host}`)) {
            return [];
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
    if (allowedSchemes !== undefined && !LINK_SCHEMES.every((scheme) => allowedSchemes.includes(scheme))) {
        sentences.push(`Links may use ${joinOr(allowedSchemes)}.`);
    }
    return sentences.join(' ');
};
