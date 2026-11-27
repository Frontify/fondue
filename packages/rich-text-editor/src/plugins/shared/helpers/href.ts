/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ESCAPED_ENTITY_START, MARKDOWN_ENTITY_START } from '#/core';

/** The schemes a link may use. Everything else — `javascript:`, `data:` — never becomes one. */
const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/**
 * `localhost:3000`, `example.com:8080/x`: a host and a port, which reads like a
 * scheme but is not one. Only ever how something TYPED is read: in an href,
 * a browser takes `javascript:0/alert(1)` as a scheme, and so does `isSafeHref`.
 */
const HOST_AND_PORT = /^[^/:?#]+:\d+(?:[/?#]|$)/;

/**
 * The schemes a typed or pasted address may start with to become a link
 */
const LINKABLE_SCHEMES = 'https?://|mailto:|tel:';

/**
 * A web, mail or phone address as it is typed in text: a linkable scheme and everything up to the next space
 */
export const LINKABLE_ADDRESS = new RegExp(String.raw`(?:${LINKABLE_SCHEMES})[^\s]+`, 'i');

/**
 * What pasted text starts with to become a link: a web, mail or phone scheme
 */
const LINKABLE_PASTE = new RegExp(`^(?:${LINKABLE_SCHEMES})`, 'i');

/** Longer than any link someone means, and than most browsers keep. */
const MAX_HREF_LENGTH = 2048;

/** C0 and C1 control characters, which no link someone means contains. */
const CONTROL_CHARACTER = /[\u0000-\u001F\u007F-\u009F]/;

/** The scheme an href names, lower-cased with its colon, or null for a relative one. */
export const schemeOf = (href: string): string | null => {
    // Browsers ignore tabs, newlines and control characters in URLs, so `java\tscript:` must read as `javascript:`.
    const compact = href.replaceAll(/[\u0000- ]/g, '');
    return /^([a-z][a-z\d+.-]*:)/i.exec(compact)?.[1]?.toLowerCase() ?? null;
};

/**
 * Whether an href may reach markup: a web, mail or phone link, or a relative
 * one. Applied to pasted and stored links alike, so `javascript:` is never
 * clickable — and to anything a stored document holds, so a value that is not
 * a string at all is not one either.
 */
export const isSafeHref = (href: unknown): href is string => {
    if (typeof href !== 'string' || href.length > MAX_HREF_LENGTH || CONTROL_CHARACTER.test(href)) {
        return false;
    }
    const scheme = schemeOf(href);
    return scheme === null || SAFE_SCHEMES.has(scheme);
};

/** What makes a Markdown link destination need `<…>` around it. */
const DESTINATION_NEEDS_BRACKETS = /[\s()]/;

/** What a Markdown link destination escapes: the backslash and the angle brackets that would end or open it. */
const DESTINATION_ESCAPED = /[\\<>]/g;

/** An address as a Markdown link destination: wrapped in `<…>` when it holds a space or a parenthesis, and with an entity-like `&` escaped. */
export const markdownDestination = (href: string): string => {
    const escaped = href
        .replaceAll(DESTINATION_ESCAPED, (character) => `\\${character}`)
        .replaceAll(MARKDOWN_ENTITY_START, ESCAPED_ENTITY_START);
    if (DESTINATION_NEEDS_BRACKETS.test(href)) {
        return `<${escaped}>`;
    }

    return escaped;
};

export const isLinkablePaste = (text: string): boolean => LINKABLE_PASTE.test(text);

/** Paths and fragments within the site the document is shown on, kept as typed. */
const isRelative = (typed: string): boolean => /^(#|\/|\.\.?\/|\?)/.test(typed);

const isEmail = (typed: string): boolean => /^[^\s@/:]+@[^\s@/:]+\.[^\s@/:]+$/.test(typed);

/** A host someone means: a domain with a dot in it, an IP address, or the local machine. */
const isHost = (hostname: string): boolean =>
    hostname === 'localhost' || /\.[a-z\d-]{2,}$/i.test(hostname) || /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);

/**
 * What to store for what was typed, or null when it cannot be a link.
 * `example.com` and `localhost:3000` become https, `ana@example.com` becomes
 * `mailto:`, relative paths and fragments are kept; whitespace or a scheme other
 * than web, mail and phone is rejected.
 */
export const toHref = (typed: string): string | null => {
    const trimmed = typed.trim();
    if (trimmed === '' || /\s/.test(trimmed) || trimmed.length > MAX_HREF_LENGTH || CONTROL_CHARACTER.test(trimmed)) {
        return null;
    }
    if (isRelative(trimmed)) {
        return trimmed;
    }
    if (isEmail(trimmed)) {
        return `mailto:${trimmed}`;
    }
    const scheme = HOST_AND_PORT.test(trimmed) ? null : schemeOf(trimmed);
    const candidate = scheme === null ? `https://${trimmed}` : trimmed;
    if (scheme !== null && !SAFE_SCHEMES.has(scheme)) {
        return null;
    }
    let url: URL;
    try {
        url = new URL(candidate);
    } catch {
        return null;
    }
    if (url.protocol === 'http:' || url.protocol === 'https:') {
        return isHost(url.hostname) ? candidate : null;
    }
    // `mailto:` and `tel:` need something to write to or call.
    return url.pathname.length > 0 ? candidate : null;
};
