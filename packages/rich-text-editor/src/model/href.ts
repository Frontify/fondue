/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject } from './declarations';
import { isWellFormed } from './well-formed';

/** The rules for which link targets are allowed: schemes, hosts and relative links. */
export interface HrefPolicy {
    /** A subset of `https`, `http`, `mailto` and `tel`. */
    readonly allowedSchemes?: readonly ('https' | 'http' | 'mailto' | 'tel')[];
    /** Lowercase hostnames: `h` matches only `h`; `*.h` matches `h` and hosts ending in `.h`. */
    readonly allowedHosts?: readonly string[];
}
/** The outcome of checking a link target: the allowed address, or the reason it is refused. */
export type HrefResult =
    | { readonly ok: true; readonly href: string }
    | {
          readonly ok: false;
          readonly code: 'unsafe-scheme' | 'unparsable' | 'too-long' | 'credentials' | 'host-not-allowed';
      };
type HrefFailure = Extract<HrefResult, { ok: false }>;

const BASE = 'https://base.invalid/';
const OTHER_BASE = 'https://other.invalid/';
const MAX_LENGTH = 2048;
const SAFE_SCHEMES = new Set(['https:', 'http:', 'mailto:', 'tel:']);
const LAST_EDGE_CONTROL = 0x20;
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

// Against the base an `http:` or `https:` with no `//` reads as a path, which a browser on an `http:` page resolves to a host.
const SCHEME_WITHOUT_AUTHORITY = /^https?:(?![/\\]{2})/i;

/** Parses the URL, then rejects an unsafe scheme or embedded credentials. */
const parse = (input: string): URL | HrefFailure => {
    if (SCHEME_WITHOUT_AUTHORITY.test(input)) {
        return { ok: false, code: 'unparsable' };
    }
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

/** A host entry in the ASCII form a parsed URL's `hostname` takes, such as `xn--mnchen-3ya.example`, or `undefined`. */
const asciiHost = (host: string): string | undefined => {
    try {
        return new URL(`https://${host}/`).hostname;
    } catch {
        return undefined;
    }
};

const hostAllowed = (hostname: string, entries: readonly string[]) =>
    entries.some((entry) => {
        if (entry.startsWith('*.')) {
            const suffix = asciiHost(entry.slice(2));
            return suffix !== undefined && (hostname === suffix || hostname.endsWith(`.${suffix}`));
        }
        return hostname === asciiHost(entry);
    });

/** Removes the C0 controls and spaces at both ends, as URL parsing does, in one linear pass. */
const stripEdgeControls = (input: string): string => {
    let start = 0;
    let end = input.length;
    while (start < end && input.charCodeAt(start) <= LAST_EDGE_CONTROL) {
        start += 1;
    }
    while (end > start && input.charCodeAt(end - 1) <= LAST_EDGE_CONTROL) {
        end -= 1;
    }
    return input.slice(start, end);
};

/** Whether `input` names its own host, rather than taking the base's: a second base gives it the same host. */
const namesHost = (input: string, url: URL): boolean => {
    try {
        return new URL(input, OTHER_BASE).hostname === url.hostname;
    } catch {
        return true;
    }
};

const checkPolicy = (
    input: string,
    url: URL,
    { allowedSchemes, allowedHosts }: HrefPolicy,
): HrefFailure | undefined => {
    if (allowedSchemes !== undefined && !allowedSchemes.some((scheme) => `${scheme}:` === url.protocol)) {
        return { ok: false, code: 'unsafe-scheme' };
    }
    const absolute = url.hostname !== '' && namesHost(input, url);
    if (allowedHosts !== undefined && absolute && !hostAllowed(url.hostname, allowedHosts)) {
        return { ok: false, code: 'host-not-allowed' };
    }
    return undefined;
};

/** The one URL check; it fails closed, and a policy only narrows it. */
export const checkHref = (input: string, policy?: HrefPolicy): HrefResult => {
    const trimmed = stripEdgeControls(input);
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
    const plain = decodePercent(decodeReferences(trimmed));
    const decoded = parse(plain);
    if (!(decoded instanceof URL)) {
        return decoded;
    }
    if (policy === undefined) {
        return { ok: true, href: trimmed };
    }
    const refused = checkPolicy(trimmed, url, policy) ?? checkPolicy(plain, decoded, policy);
    return refused ?? { ok: true, href: trimmed };
};

const SCHEMES = new Set(['https', 'http', 'mailto', 'tel']);

const listOf = (value: unknown): readonly string[] | undefined => {
    if (!Array.isArray(value)) {
        return undefined;
    }
    return value.filter((item): item is string => typeof item === 'string');
};

/**
 * The URL policy of a feature's `allowedSchemes` and `allowedHosts` options, or `undefined` when it sets neither, so
 * only the default check applies. A null option sets nothing.
 * Public so the shipped features and the core share it.
 */
export const hrefPolicyOf = (options: JsonObject): HrefPolicy | undefined => {
    const schemes = listOf(options.allowedSchemes);
    const hosts = listOf(options.allowedHosts);
    if (schemes === undefined && hosts === undefined) {
        return undefined;
    }
    let policy: HrefPolicy = {};
    if (schemes !== undefined) {
        policy = {
            allowedSchemes: schemes.filter((scheme): scheme is 'https' | 'http' | 'mailto' | 'tel' =>
                SCHEMES.has(scheme),
            ),
        };
    }
    if (hosts !== undefined) {
        policy = { ...policy, allowedHosts: hosts.map((host) => host.toLowerCase()) };
    }
    return policy;
};
