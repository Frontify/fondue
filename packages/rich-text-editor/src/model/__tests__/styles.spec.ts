/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { type PresentationStyle, resolveStyle, type StyleRecipe, styleSheetOf } from '#/model';
import { colorOf, cssValue } from '#/model/styles';

const linkStyle = (recipe: StyleRecipe, id = 'brand.link'): PresentationStyle => ({
    id,
    label: id,
    appliesTo: ['link'],
    deprecated: false,
    recipe,
});
const underlined = (recipe: StyleRecipe) =>
    resolveStyle([linkStyle(recipe)], 'link', 'brand.link').style?.declarations.at(-1);

describe('the style resolver', () => {
    it('resolves a style ID to its recipe, a null ID to the paragraph and link defaults, and an unknown or deprecated ID to the default as unknown', () => {
        const styles: PresentationStyle[] = [
            { id: 'paragraph', label: 'Body', appliesTo: ['paragraph'], deprecated: false, recipe: { fontSize: 16 } },
            { id: 'brand.lead', label: 'Lead', appliesTo: ['paragraph'], deprecated: false, recipe: { fontSize: 20 } },
            { id: 'brand.old', label: 'Old', appliesTo: ['paragraph'], deprecated: true, recipe: { fontSize: 18 } },
        ];
        const fontSizeOf = (styleId: string | null, type = 'paragraph') => {
            const { style, unknown } = resolveStyle(styles, type, styleId);

            return [style?.declarations, unknown];
        };

        expect(fontSizeOf('brand.lead')).toEqual([[['font-size', '20px']], false]);
        expect(fontSizeOf(null)).toEqual([[['font-size', '16px']], false]);
        expect(fontSizeOf('brand.missing')).toEqual([[['font-size', '16px']], true]);
        expect(fontSizeOf('brand.old')).toEqual([[['font-size', '16px']], true]);
        expect(fontSizeOf(null, 'heading')).toEqual([undefined, false]);
        expect(fontSizeOf('brand.missing', 'heading')).toEqual([undefined, true]);
    });

    it.each<[string, StyleRecipe]>([
        ['a link recipe of textDecoration none', { textDecoration: 'none' }],
        ['a colour-only link style', { color: '#c0392b' }],
        ['a link style with no underline and no outline', { textDecoration: 'none', outline: 'none' }],
        ['a link style with a transparent background', { textDecoration: 'none', backgroundColor: 'transparent' }],
        ['a link style with only a background position', { textDecoration: 'none', backgroundPosition: 'left bottom' }],
        [
            'a link style whose gradient background is clipped to the text',
            { textDecoration: 'none', backgroundImage: 'linear-gradient(red, blue)', backgroundClip: 'text' },
        ],
        ['a link style with a transparent outline', { textDecoration: 'none', outline: '2px solid transparent' }],
        ['a link style with a zero-width border', { textDecoration: 'none', border: '0 solid #000' }],
        ['a link style with a hidden border', { textDecoration: 'none', borderStyle: 'hidden', borderWidth: 2 }],
        [
            'a link style whose only background is an image the resolver drops',
            { textDecoration: 'none', backgroundImage: 'url(https://tracker.test/a.png)' },
        ],
    ])('keeps the underline on %s', (_, recipe) => {
        expect(underlined(recipe)).toEqual(['text-decoration-line', 'underline']);
    });

    it('sets the underline on the default link recipe, after its own decoration so it wins', () => {
        const { style } = resolveStyle([linkStyle({ textDecoration: 'none' }, 'link')], 'link', null);

        expect(style?.declarations).toEqual([
            ['text-decoration', 'none'],
            ['text-decoration-line', 'underline'],
        ]);
    });

    it.each<[string, StyleRecipe]>([
        ['a background colour', { textDecoration: 'none', backgroundColor: '#1d4ed8', color: '#fff' }],
        ['a gradient background', { textDecoration: 'none', backgroundImage: 'linear-gradient(red, blue)' }],
        ['a solid border', { textDecoration: 'none', border: '1px solid #1d4ed8' }],
        ['an outline', { textDecoration: 'none', outline: '2px dashed #1d4ed8' }],
    ])('leaves out the underline of a button link style with %s', (_, recipe) => {
        expect(underlined(recipe)).not.toEqual(['text-decoration-line', 'underline']);
    });

    it('gives the same recipe the same class and a changed recipe another', () => {
        const classOf = (recipe: StyleRecipe) =>
            resolveStyle([{ id: 'a', label: 'A', appliesTo: ['paragraph'], deprecated: false, recipe }], 'p', 'a').style
                ?.className;

        expect(classOf({ fontSize: 20 })).toBe(classOf({ fontSize: 20 }));
        expect(classOf({ fontSize: 20 })).not.toBe(classOf({ fontSize: 22 }));
        expect(classOf({ fontSize: 20 })).toMatch(/^rte-style-[0-9a-f]{12}$/);
    });

    it('writes one stylesheet with a class per recipe and its hover rule, and none for deprecated styles', () => {
        const css = styleSheetOf([
            { id: 'a', label: 'A', appliesTo: ['paragraph'], deprecated: false, recipe: { fontSize: 20 } },
            {
                id: 'b',
                label: 'B',
                appliesTo: ['link'],
                deprecated: false,
                recipe: { backgroundColor: '#1d4ed8', hover: { backgroundColor: '#1e3a8a' } },
            },
            { id: 'c', label: 'C', appliesTo: ['paragraph'], deprecated: true, recipe: { fontSize: 99 } },
        ]);

        expect(css).toMatch(/\.rte-style-[0-9a-f]{12}\{font-size:20px\}/);
        expect(css).toMatch(/\.rte-style-[0-9a-f]{12}:hover\{background-color:#1e3a8a\}/);
        expect(css).not.toContain('99px');
        expect(styleSheetOf([])).toBe('');
    });

    it.each([
        ['a declaration break', 'red; position: fixed'],
        ['a rule break', 'red} body {display: none'],
        ['an element close', '</style><script>'],
        ['a resource load', 'url(https://tracker.test/a.png)'],
        ['an import', '@import "x"'],
        ['a comment', 'red /* x */'],
        ['an escape', '\\72 ed'],
        ['an unbalanced quote', '"Inter'],
        ['an important flag', 'red !important'],
        ['an unknown function', 'expression(alert(1))'],
    ])('drops a recipe value with %s', (_, value) => {
        expect(cssValue('color', value)).toBe(undefined);
        expect(styleSheetOf([linkStyle({ color: value })])).not.toContain(value);
    });

    it('drops every declaration that positions, layers or transforms its element, and every negative margin, from a recipe and its hover', () => {
        const placing: StyleRecipe = {
            position: 'fixed',
            inset: 0,
            insetInlineStart: 0,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2_147_483_647,
            transform: 'translateY(-100%)',
            WebkitTransform: 'scale(2)',
            translate: '10px',
            rotate: '45deg',
            scale: 2,
            marginTop: -40,
            margin: '0 -2px',
            // Untyped in csstype, as a host's JSON can still send it.
            ...({ WebkitMarginBefore: '-100vh' } as StyleRecipe),
            WebkitMarginStart: -8,
            marginInlineStart: 'calc(0px - 1em)',
        };
        const { style } = resolveStyle(
            [linkStyle({ ...placing, opacity: 0, marginBottom: 8, hover: { ...placing, color: '#1e3a8a' } }, 'p')],
            'paragraph',
            'p',
        );

        const hover = style?.hover;
        expect([style?.declarations, hover]).toEqual([
            [
                ['opacity', '0'],
                ['margin-bottom', '8px'],
            ],
            [['color', '#1e3a8a']],
        ]);
    });

    it('skips a styles entry that is not an object, has no appliesTo list or whose recipe is not one', () => {
        const styles = [
            null,
            'brand.lead',
            { id: 'brand.lead', label: 'Lead', appliesTo: ['paragraph'], deprecated: false, recipe: null },
            { id: 'brand.lead', label: 'Lead', appliesTo: null, deprecated: false, recipe: { fontSize: 32 } },
            { id: 'brand.lead', label: 'Lead', appliesTo: ['paragraph'], deprecated: false, recipe: { fontSize: 20 } },
        ] as unknown as PresentationStyle[];

        expect(resolveStyle(styles, 'paragraph', 'brand.lead').style?.declarations).toEqual([['font-size', '20px']]);
        expect(styleSheetOf(styles)).toMatch(/^\.rte-style-[0-9a-f]{12}\{font-size:20px\}\n/);
    });

    it('keeps the CSS values a brand recipe uses', () => {
        expect([
            cssValue('fontFamily', '"Inter", Arial, sans-serif'),
            cssValue('fontSize', 20),
            cssValue('fontWeight', 700),
            cssValue('lineHeight', 1.5),
            cssValue('color', 'rgb(0 0 0 / 50%)'),
            cssValue('color', 'var(--brand-color)'),
            cssValue('margin', 0),
        ]).toEqual(['"Inter", Arial, sans-serif', '20px', '700', '1.5', 'rgb(0 0 0 / 50%)', 'var(--brand-color)', '0']);
    });

    it('gives a colour mark its literal value, else its token value, and nothing for a missing or unsafe token', () => {
        const tokens = [
            { id: 'brand.red', label: 'Red', value: '#c0392b', usage: ['font_color' as const] },
            { id: 'brand.bad', label: 'Bad', value: 'red;background:url(x)', usage: ['font_color' as const] },
        ];

        expect(colorOf(tokens, { tokenId: null, value: '#00000080' })).toBe('#00000080');
        expect(colorOf(tokens, { tokenId: 'brand.red', value: null })).toBe('#c0392b');
        expect(colorOf(tokens, { tokenId: 'brand.gone', value: null })).toBe(undefined);
        expect(colorOf(tokens, { tokenId: 'brand.bad', value: null })).toBe(undefined);
    });
});

describe('the content CSS', () => {
    it('underlines every link of the content', () => {
        const css = readFileSync(new URL('../../styles/content.css', import.meta.url), 'utf8');
        const rule = /:where\(\.fondue-rte-content a\)\s*\{([^}]*)\}/.exec(css);

        expect(rule?.[1]).toContain('text-decoration-line: underline;');
    });
});
