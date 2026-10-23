/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { createCodecs } from '#/codecs';
import {
    COLOR_TOKENS,
    linked,
    marked,
    plain,
    STYLE_MAP,
    styled,
    styledDocument,
    styledHeading,
    styleModel,
} from '#/features/__tests__/fixtures/styles';
import { renderReader } from '#/reader/__tests__/helpers/helpers';

const model = styleModel();
const codecs = createCodecs(model);
const presentation = { styles: STYLE_MAP, colorTokens: COLOR_TOKENS };

const classesOf = (html: string) => [...html.matchAll(/ class="([^"]*)"/g)].map(([, value]) => value);
const recipeClass = /^rte-style-[0-9a-f]{12}$/;

describe('toHTML with brand styles', () => {
    it('writes the recipe class of a hover style on its link, returns the stylesheet with the hover declaration as css, and opens a link with openInNewWindow false in the same tab', () => {
        const document = styledDocument(model, [styled(null, plain('Read the '), linked('guide', 'brand.button'))]);

        const { html, css } = codecs.toHTML(document, { inlineStyles: STYLE_MAP });
        const reader = renderReader(document, model, { presentation });
        const linkClasses = /<a [^>]*class="([^"]*)"/.exec(html)?.slice(1);
        const [linkClass] = linkClasses ?? [];

        expect(linkClass).toMatch(recipeClass);
        expect(css).toContain(`.${linkClass}:hover{background-color:#1e3a8a}`);
        expect(reader).toContain(`class="${linkClass}"`);
        expect(reader).toContain(`.${linkClass}:hover{background-color:#1e3a8a}`);
        expect(html).not.toContain('target=');
    });

    it('writes data-rte-style and only the recipe class for a styleId, never an id, and a style attribute only from validated values', () => {
        const document = styledDocument(model, [
            styledHeading('brand.title', 2, plain('Title')),
            styled('brand.lead', plain('Lead '), marked('red', 'font_color', { tokenId: 'brand.red', value: null })),
            styled('brand.unknown', marked('half', 'highlight', { tokenId: null, value: '#fde68a80' })),
            styled(null, linked('link', null)),
        ]);

        const { html } = codecs.toHTML(document, { inlineStyles: STYLE_MAP, colorTokens: COLOR_TOKENS });
        const styles = [...html.matchAll(/ style="([^"]*)"/g)].map(([, value]) => value ?? '');

        expect(html).not.toMatch(/ id="/);
        expect(
            classesOf(html).filter((value) => value !== 'fondue-rte-content' && !recipeClass.test(value ?? '')),
        ).toEqual([]);
        expect(html).toContain('<h2 data-rte-style="brand.title" dir="auto" class="rte-style-');
        expect(html).toContain('<p data-rte-style="brand.unknown" dir="auto">');
        expect(styles).toEqual([
            'font-family:Georgia, serif;font-size:32px;font-weight:700;color:#1d4ed8',
            'font-family:Arial, sans-serif;font-size:20px;font-weight:300;line-height:1.5',
            'color:#c0392b',
            'background-color:#fde68a80',
            'text-decoration:none;text-decoration-line:underline',
        ]);
    });

    it('writes each used recipe inline for a heading style, the default link style and a button link style', () => {
        const document = styledDocument(model, [
            styledHeading('brand.title', 1, plain('Brand guide')),
            styled(null, plain('See the '), linked('basics', null), plain(' or '), linked('start', 'brand.button')),
        ]);

        const { html, css } = codecs.toHTML(document, { inlineStyles: STYLE_MAP });

        expect(html.replaceAll(/rte-style-[0-9a-f]{12}/g, 'rte-style-*')).toMatchSnapshot();
        expect(css.split('\n').length).toBeGreaterThan(0);
    });

    it('writes text-decoration-line underline for a link recipe of textDecoration none with inlineStyles', () => {
        const document = styledDocument(model, [styled(null, linked('basics', null))]);

        const { html } = codecs.toHTML(document, { inlineStyles: STYLE_MAP });

        expect(html).toContain('style="text-decoration:none;text-decoration-line:underline"');
    });

    it('writes a literal colour inline, a token colour inline with data-rte-color, and a missing token as data-rte-color only', () => {
        const document = styledDocument(model, [
            styled(
                null,
                marked('literal', 'font_color', { tokenId: null, value: '#0f766e' }),
                marked('token', 'font_color', { tokenId: 'brand.blue', value: null }),
                marked('gone', 'font_color', { tokenId: 'brand.gone', value: null }),
                marked('mark', 'highlight', { tokenId: 'brand.sun', value: null }),
            ),
        ]);

        const { html } = codecs.toHTML(document, { colorTokens: COLOR_TOKENS });

        expect(html).toContain('<span style="color:#0f766e">literal</span>');
        expect(html).toContain('<span data-rte-color="brand.blue" style="color:#1d4ed8">token</span>');
        expect(html).toContain('<span data-rte-color="brand.gone">gone</span>');
        expect(html).toContain('<mark data-rte-color="brand.sun" style="background-color:#fde68a">mark</mark>');
    });

    it('writes data-rte-style on a link with a styleId, and none on a link without one', () => {
        const document = styledDocument(model, [
            styled(null, linked('start', 'brand.button'), plain(' '), linked('basics', null)),
        ]);

        const plainHtml = codecs.toHTML(document).html;
        const { html } = codecs.toHTML(document, { inlineStyles: STYLE_MAP });

        expect(plainHtml).toContain(
            '<a href="https://frontify.com/" rel="noopener" data-rte-style="brand.button">start</a>',
        );
        expect(plainHtml).toContain('<a href="https://frontify.com/" rel="noopener">basics</a>');
        expect(html).toMatch(
            /<a href="https:\/\/frontify\.com\/" rel="noopener" data-rte-style="brand\.button" class="rte-style-/,
        );
    });

    it('skips a styles entry whose recipe is not an object, writing the others', () => {
        const styles = [
            { id: 'brand.lead', label: 'Lead', appliesTo: ['paragraph'], deprecated: false, recipe: null },
            ...STYLE_MAP,
        ] as unknown as typeof STYLE_MAP;
        const document = styledDocument(model, [styled('brand.lead', plain('Lead'))]);

        const { html } = codecs.toHTML(document, { inlineStyles: styles });

        expect(html).toContain('style="font-family:Arial, sans-serif;font-size:20px;font-weight:300;line-height:1.5"');
    });

    it('writes no class and an empty css without inlineStyles, keeping data-rte-style', () => {
        const document = styledDocument(model, [styled('brand.lead', plain('Lead'))]);

        const { html, css } = codecs.toHTML(document);

        expect(html).toBe('<div class="fondue-rte-content"><p data-rte-style="brand.lead" dir="auto">Lead</p></div>');
        expect(css).toBe('');
    });
});
