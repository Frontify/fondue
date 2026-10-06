/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';

import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { checkHref, type HrefResult } from '#/model';

type UrlFixture = { readonly input: string; readonly ok: boolean; readonly code?: string; readonly href?: string };

const fixtures = JSON.parse(
    readFileSync(new URL('../../fixtures/security/urls.json', import.meta.url), 'utf8'),
) as readonly UrlFixture[];

const expected = ({ ok, code, href }: UrlFixture): HrefResult => {
    if (ok) {
        return { ok: true, href: href ?? '' };
    }
    return { ok: false, code: code as Extract<HrefResult, { ok: false }>['code'] };
};

const encodeCharacter = (character: string, how: number) => {
    const code = character.codePointAt(0) ?? 0;
    switch (how) {
        case 1:
            return `&#${code};`;
        case 2:
            return `&#x${code.toString(16)};`;
        case 3:
            return `%${code.toString(16).padStart(2, '0')}`;
        default:
            return character;
    }
};

const obfuscatedScheme = (scheme: string) =>
    fc
        .record({
            cases: fc.array(fc.boolean(), { minLength: scheme.length, maxLength: scheme.length }),
            encodings: fc.array(fc.integer({ min: 0, max: 3 }), { minLength: scheme.length, maxLength: scheme.length }),
            breaks: fc.array(fc.constantFrom('', '', '\t', '\n', '\r'), {
                minLength: scheme.length,
                maxLength: scheme.length,
            }),
            leading: fc.array(fc.integer({ min: 0, max: 0x20 }), { maxLength: 4 }),
            colon: fc.constantFrom(':', '&colon;', '&#58;', '%3A'),
        })
        .map(({ cases, encodings, breaks, leading, colon }) => {
            const body = [...scheme]
                .map((character, index) => {
                    const cased = cases[index] === true ? character.toUpperCase() : character;
                    const encoding = encodings[index] ?? 0;
                    const lineBreak = breaks[index] ?? '';
                    return `${encodeCharacter(cased, encoding)}${lineBreak}`;
                })
                .join('');
            return `${String.fromCharCode(...leading)}${body}${colon}alert(1)`;
        });

describe('checkHref', () => {
    it('SPEC-rich-text-references/AC-002 rejects obfuscated javascript, data, vbscript and file schemes', () => {
        for (const scheme of ['javascript', 'data', 'vbscript', 'file']) {
            fc.assert(
                fc.property(obfuscatedScheme(scheme), (input) => {
                    expect(checkHref(input).ok).toBe(false);
                }),
                { numRuns: 500 },
            );
        }
    });

    it('SPEC-rich-text-references/AC-002 gives each security fixture its verdict', () => {
        for (const fixture of fixtures) {
            expect(checkHref(fixture.input), JSON.stringify(fixture.input)).toEqual(expected(fixture));
        }
    });

    it.each(['http://[::1', 'https://exa mple.com', 'https://example.com/\uD800', '\uDC00/brand'])(
        'SPEC-rich-text-references/AC-003 reports %j as unparsable',
        (input) => {
            expect(checkHref(input)).toEqual({ ok: false, code: 'unparsable' });
        },
    );

    it('SPEC-rich-text-references/AC-003 finds a lone surrogate where isWellFormed is missing', () => {
        const original = Object.getOwnPropertyDescriptor(String.prototype, 'isWellFormed');
        Reflect.deleteProperty(String.prototype, 'isWellFormed');
        try {
            expect('isWellFormed' in String.prototype).toBe(false);
            expect(checkHref('https://example.com/\uD800')).toEqual({ ok: false, code: 'unparsable' });
            expect(checkHref('https://example.com/\uD83D\uDE00')).toEqual({
                ok: true,
                href: 'https://example.com/\uD83D\uDE00',
            });
        } finally {
            if (original !== undefined) {
                Object.defineProperty(String.prototype, 'isWellFormed', original);
            }
        }
    });

    it.each(['/brand', '#top', 'guide.html', './a.pdf', '?q=a.b', '../guides/brand'])(
        'SPEC-rich-text-references/AC-004 keeps the relative reference %j unchanged',
        (input) => {
            expect(checkHref(input)).toEqual({ ok: true, href: input });
        },
    );

    it('SPEC-rich-text-references/AC-004 keeps the stored form, with only edge whitespace removed', () => {
        expect(checkHref('  /brand?x=%20y\t')).toEqual({ ok: true, href: '/brand?x=%20y' });
    });
});
