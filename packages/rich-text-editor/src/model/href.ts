/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isWellFormed } from './well-formed';

export interface HrefPolicy {
    /** A subset of `https`, `http`, `mailto` and `tel`. */
    readonly allowedSchemes?: readonly ('https' | 'http' | 'mailto' | 'tel')[];
    /** Lowercase hostnames: `h` matches only `h`; `*.h` matches `h` and hosts ending in `.h`. */
    readonly allowedHosts?: readonly string[];
}
export type HrefResult =
    | { readonly ok: true; readonly href: string }
    | {
          readonly ok: false;
          readonly code: 'unsafe-scheme' | 'unparsable' | 'too-long' | 'credentials' | 'host-not-allowed';
      };
type HrefFailure = Extract<HrefResult, { ok: false }>;

const BASE = 'https://base.invalid/';
const MAX_LENGTH = 2048;
const SAFE_SCHEMES = new Set(['https:', 'http:', 'mailto:', 'tel:']);
const EDGE_CONTROLS = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
const CONTROL = /[\u0000-\u001F\u007F-\u009F]/;
/**
 * Every HTML5 named reference whose value is ASCII, keyed by its case-sensitive name. Only ASCII can form a URL
 * delimiter or a scheme letter, and the full table would exceed the `./model` size budget.
 */
const NAMED_REFERENCES: Readonly<Record<string, string>> = {
    AMP: '&',
    DiacriticalGrave: '`',
    GT: '>',
    Hat: '^',
    LT: '<',
    NewLine: '\n',
    QUOT: '"',
    Tab: '\t',
    UnderBar: '_',
    VerticalLine: '|',
    amp: '&',
    apos: "'",
    ast: '*',
    bsol: '\\',
    colon: ':',
    comma: ',',
    commat: '@',
    dollar: '$',
    equals: '=',
    excl: '!',
    fjlig: 'fj',
    grave: '`',
    gt: '>',
    lbrace: '{',
    lbrack: '[',
    lcub: '{',
    lowbar: '_',
    lpar: '(',
    lsqb: '[',
    lt: '<',
    midast: '*',
    num: '#',
    percnt: '%',
    period: '.',
    plus: '+',
    quest: '?',
    quot: '"',
    rbrace: '}',
    rbrack: ']',
    rcub: '}',
    rpar: ')',
    rsqb: ']',
    semi: ';',
    sol: '/',
    verbar: '|',
    vert: '|',
};
const LEGACY_REFERENCE = /^(?:amp|lt|gt|quot|AMP|LT|GT|QUOT)/;

const decodeNamed = (name: string, semicolon: string) => {
    if (semicolon !== '' && Object.hasOwn(NAMED_REFERENCES, name)) {
        return NAMED_REFERENCES[name];
    }
    const legacy = LEGACY_REFERENCE.exec(name)?.[0];
    return legacy === undefined ? undefined : `${NAMED_REFERENCES[legacy]}${name.slice(legacy.length)}${semicolon}`;
};

const decodeReferences = (text: string) =>
    text.replaceAll(
        /&#(x[\da-f]+|\d+);?|&([a-z\d]+)(;?)/gi,
        (match, numeric: string | undefined, name: string = '', semicolon: string = '') => {
            if (numeric !== undefined) {
                const code =
                    numeric.startsWith('x') || numeric.startsWith('X')
                        ? parseInt(numeric.slice(1), 16)
                        : Number(numeric);
                return code > 0x10ffff ? match : String.fromCodePoint(code);
            }
            return decodeNamed(name, semicolon) ?? match;
        },
    );

const decodePercent = (text: string) =>
    text.replaceAll(/(%[\da-f]{2})+/gi, (run) => {
        try {
            return decodeURIComponent(run);
        } catch {
            return run;
        }
    });

/** Parses the URL, then rejects an unsafe scheme or embedded credentials. */
const parse = (input: string): URL | HrefFailure => {
    let url: URL;
    try {
        url = new URL(input, BASE);
    } catch {
        return { ok: false, code: 'unparsable' };
    }
    if (!SAFE_SCHEMES.has(url.protocol)) {
        return { ok: false, code: 'unsafe-scheme' };
    }
    if (url.username !== '' || url.password !== '') {
        return { ok: false, code: 'credentials' };
    }
    return url;
};

const hostAllowed = (hostname: string, entries: readonly string[]) =>
    entries.some((entry) => {
        if (entry.startsWith('*.')) {
            const suffix = entry.slice(2);
            return hostname === suffix || hostname.endsWith(`.${suffix}`);
        }
        return hostname === entry;
    });

const checkPolicy = (url: URL, { allowedSchemes, allowedHosts }: HrefPolicy): HrefFailure | undefined => {
    if (allowedSchemes !== undefined && !allowedSchemes.some((scheme) => `${scheme}:` === url.protocol)) {
        return { ok: false, code: 'unsafe-scheme' };
    }
    const absolute = url.hostname !== '' && url.hostname !== 'base.invalid';
    if (allowedHosts !== undefined && absolute && !hostAllowed(url.hostname, allowedHosts)) {
        return { ok: false, code: 'host-not-allowed' };
    }
    return undefined;
};

/** The one URL check; it fails closed, and a policy only narrows it. */
export const checkHref = (input: string, policy?: HrefPolicy): HrefResult => {
    const trimmed = input.replaceAll(EDGE_CONTROLS, '');
    if (CONTROL.test(trimmed) || !isWellFormed(trimmed)) {
        return { ok: false, code: 'unparsable' };
    }
    if (trimmed.length > MAX_LENGTH) {
        return { ok: false, code: 'too-long' };
    }
    const url = parse(trimmed);
    if (!(url instanceof URL)) {
        return url;
    }
    const decoded = parse(decodePercent(decodeReferences(trimmed)));
    if (!(decoded instanceof URL)) {
        return decoded;
    }
    if (policy === undefined) {
        return { ok: true, href: trimmed };
    }
    const refused = checkPolicy(url, policy) ?? checkPolicy(decoded, policy);
    return refused ?? { ok: true, href: trimmed };
};
