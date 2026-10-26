/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import { compileContentModel, defaultLimits } from '#/model';
import { htmlModel } from '#/plugins/__tests__/fixtures/html';
import { core } from '#/plugins/Core/feature';
import { link } from '#/plugins/Link/feature';
import { buildSchema } from '#/runtime/definition/schema';
import { NO_COLORS } from '#/runtime/import/colors';
import { importHtml } from '#/runtime/import/html';

import { fromHTML } from '../fromHtml';

const { window } = new JSDOM('');
const dom = window as unknown as Window;
const model = htmlModel();

const textOf = (value: unknown): string => JSON.stringify(value);

describe('the HTML import of untrusted markup', () => {
    it.each([
        ['allowedHosts', link({ allowedHosts: ['frontify.com'] }), '<a href="https://evil.example">t</a>'],
        ['allowedSchemes', link({ allowedSchemes: ['https'] }), '<a href="http://frontify.com">t</a>'],
    ])('keeps the text and drops the link that %s refuses', (_name, feature, html) => {
        const narrowed = compileContentModel([core(), feature], { id: 'test.links', version: 1 });

        const result = fromHTML(html, narrowed, { window: dom });

        expect(result.status).toBe('editable');
        if (result.status !== 'editable') {
            return;
        }

        expect(textOf(result.document.content)).toContain('"text":"t"');
        expect(textOf(result.document.content)).not.toContain('"type":"link"');
    });

    it.each([
        ['a paragraph', '<ul><li style="mso-list:l0 level1 lfo1">A</li><p>LOST</p></ul>', 'LOST'],
        ['text', '<ul><li style="mso-list:l0 level1 lfo1">B</li>TEXT</ul>', 'TEXT'],
        [
            "a paragraph in an item's nested list",
            '<ul><li style="mso-list:l0 level1 lfo1">C<ul><p>NESTED</p></ul></li></ul>',
            'NESTED',
        ],
    ])('keeps %s that an Office list holds beside its items', (_name, html, kept) => {
        const { content } = importHtml(html, buildSchema(model), dom, {
            limits: defaultLimits,
            headingLevels: undefined,
            depth: 2,
            colors: NO_COLORS,
            rules: [],
        });

        expect(content.textBetween(0, content.size, '|')).toContain(kept);
    });

    it('reads an SVG or MathML element whose style the DOM does not model', () => {
        const result = fromHTML('<math><mi style="color:red">x</mi></math>', model, { window: dom });

        expect(result.status).toBe('editable');
        if (result.status !== 'editable') {
            return;
        }

        expect(textOf(result.document.content)).toContain('"text":"x"');
    });

    it('blocks an import over maxPasteBytes before it parses', () => {
        const result = fromHTML('<p>abcdef</p>', model, { window: dom, limits: { maxPasteBytes: 5 } });

        expect(result).toMatchObject({ status: 'blocked', reason: 'limit-exceeded' });
    });

    it.each([
        ['a RangeError', new RangeError('Maximum call stack size exceeded'), 'limit-exceeded'],
        ['another error', new Error('broken'), 'invalid'],
    ] as const)('blocks, and does not throw, when the parse throws %s', (_name, error, reason) => {
        // Markup nested 50,000 deep makes jsdom throw a RangeError after minutes, so the window throws at once.
        const throwing = {
            DOMParser: class {
                parseFromString(): never {
                    throw error;
                }
            },
        } as unknown as Window;

        const result = fromHTML('<div>x</div>', model, { window: throwing });

        expect(result).toMatchObject({ status: 'blocked', reason });
    });

    it('keeps a link longer than maxAttributeLength through fromHTML and the HTML import', () => {
        const href = `https://example.com/${'a'.repeat(280)}`;
        const html = `<p><a href="${href}">t</a></p>`;

        const result = fromHTML(html, model, { window: dom, limits: { maxAttributeLength: 100 } });
        const { content } = importHtml(html, buildSchema(model), dom, {
            limits: { ...defaultLimits, maxAttributeLength: 100 },
            headingLevels: undefined,
            depth: 2,
            colors: NO_COLORS,
            rules: [],
        });

        expect(textOf(result)).toContain(href);
        expect(JSON.stringify(content.toJSON())).toContain(href);
    });
});
