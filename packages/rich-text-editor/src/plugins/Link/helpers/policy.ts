/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeHref, LINK_SCHEMES, type LinkScheme } from '../../shared/helpers/href';

import { hostAndSubdomains, hostsAllowed, SAME_SITE_ONLY, schemesAllowed } from './strings';

export { type LinkScheme } from '../../shared/helpers/href';

/**
 * Which links an editor accepts. Given to `linkContent` or `linkPlugin`, the renderer and export enforce it too.
 * Without it they render any safe link. Mail and phone links name no host, and relative links stay on the site,
 * so hosts never refuse them.
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

const describeHosts = (hosts: readonly string[]): string => {
    const lowered = hosts.map((host) => host.toLowerCase());
    const phrases = lowered.flatMap((host) => {
        if (host.startsWith(SUBDOMAIN_WILDCARD)) {
            return [hostAndSubdomains(host.slice(SUBDOMAIN_WILDCARD.length))];
        }
        // The wildcard's phrase names this host already.
        if (lowered.includes(`${SUBDOMAIN_WILDCARD}${host}`)) {
            return [];
        }
        return [host];
    });
    if (phrases.length === 0) {
        return SAME_SITE_ONLY;
    }
    return hostsAllowed(phrases);
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
        sentences.push(schemesAllowed(allowedSchemes));
    }
    return sentences.join(' ');
};
