/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { JSDOM } from 'jsdom';
import { type Node } from 'prosemirror-model';
import { describe, expect, it } from 'vitest';

import { NO_COLORS } from '#/clipboard/import/colors';
import { importHtml } from '#/clipboard/import/html';
import { buildSchema } from '#/definition/schema';
import { core } from '#/features/core/feature';
import { compileContentModel, defaultLimits, defineFeature, type Feature, type ResourceLimits } from '#/model';
import { compiledModel } from '#/model/compile';

const { window } = new JSDOM('');
const requires = [{ id: 'core', version: 1 }];

/** The text runs of `html` imported with the model's function parse rules, each with its marks and their attributes. */
const runsOf = (features: readonly Feature[], html: string, limits: Partial<ResourceLimits> = {}) => {
    const model = compileContentModel([core(), ...features], { id: 'test.parse-rules', version: 1 });
    const merged: ResourceLimits = { ...defaultLimits };
    Object.assign(merged, limits);
    const { content } = importHtml(html, buildSchema(model), window as unknown as Window, {
        limits: merged,
        headingLevels: undefined,
        depth: 2,
        colors: NO_COLORS,
        rules: compiledModel(model).parseRules,
    });
    const runs: string[] = [];
    content.descendants((node: Node) => {
        if (node.text !== undefined) {
            const marks = node.marks.map((mark) => `${mark.type.name}${JSON.stringify(mark.attrs)}`);
            runs.push(`${node.text}|${marks.join(',')}`);
        }
    });
    return runs;
};

describe('the answers of function parse rules', () => {
    const checked = defineFeature({
        id: 'fixture.checked',
        version: 1,
        requires,
        marks: {
            checked_link: {
                attrs: { href: { type: 'url', required: true } },
                html: ['a', { href: { attr: 'href' } }, 0],
                parse: [],
            },
            checked_label: {
                attrs: { label: { type: 'string', required: true } },
                html: ['span', 0],
                parse: [],
            },
            checked_count: {
                attrs: { count: { type: 'integer', min: 1, default: 1 } },
                html: ['span', 0],
                parse: [],
            },
            checked_color: {
                attrs: {
                    tokenId: { type: 'id', nullable: true, default: null },
                    value: { type: 'color', nullable: true, default: null },
                },
                exactlyOne: ['tokenId', 'value'],
                html: ['span', 0],
                parse: [],
            },
        },
        parseRules: [
            { tag: 'a', mark: 'checked_link', value: (element) => ({ href: element.getAttribute('data-href') }) },
            { tag: 'q', mark: 'checked_label', value: (element) => ({ label: element.getAttribute('data-label') }) },
            { tag: 'em', mark: 'checked_count', value: (element) => ({ count: element.getAttribute('data-count') }) },
            { tag: 'u', mark: 'checked_color', value: () => ({ tokenId: 'brand.red', value: '#ff0000' }) },
            { tag: 's', mark: 'checked_color', value: () => ({ value: '#00ff00' }) },
        ],
    });

    it('meet the declarations of their mark, as a data rule must, or the mark goes and its text stays', () => {
        const html =
            '<p><a data-href="https://frontify.com/">kept</a><a data-href="javascript:alert(1)">script</a><a>missing</a>' +
            '<em data-count="3">typed</em><u>both</u><s>one</s></p>';

        expect(runsOf([checked()], html)).toEqual([
            'kept|checked_link{"href":"https://frontify.com/","unknownAttributes":null}',
            'scriptmissing|',
            'typed|checked_count{"count":1,"unknownAttributes":null}',
            'both|',
            'one|checked_color{"tokenId":null,"value":"#00ff00","unknownAttributes":null}',
        ]);
    });

    it('meet maxAttributeLength, as a data rule must, which an href is exempt from', () => {
        const long = 'a'.repeat(101);
        const href = `https://frontify.com/${long}`;

        expect(runsOf([checked()], `<p><q data-label="${long}">long</q></p>`, { maxAttributeLength: 100 })).toEqual([
            'long|',
        ]);
        expect(runsOf([checked()], `<p><a data-href="${href}">link</a></p>`, { maxAttributeLength: 100 })).toEqual([
            `link|checked_link{"href":"${href}","unknownAttributes":null}`,
        ]);
    });
});

describe('a function parse rule that answers null', () => {
    const refusing = defineFeature({
        id: 'fixture.refusing',
        version: 1,
        requires,
        marks: { refusing_mark: { attrs: {}, html: ['mark', 0], parse: [{ tag: 'mark' }] } },
        parseRules: [{ tag: 'mark', mark: 'refusing_mark', value: () => null }],
    });
    const reading = defineFeature({
        id: 'fixture.reading',
        version: 1,
        requires,
        marks: { reading_mark: { attrs: {}, html: ['mark', 0], parse: [{ tag: 'mark' }] } },
    });
    const ruling = defineFeature({
        id: 'fixture.ruling',
        version: 1,
        requires,
        marks: { ruling_mark: { attrs: {}, html: ['mark', 0], parse: [] } },
        parseRules: [{ tag: 'mark', mark: 'ruling_mark', value: () => ({}) }],
    });

    it('refuses only its own mark, so the data and function rules of other features still read the element', () => {
        expect(runsOf([refusing(), reading(), ruling()], '<p><mark>shared</mark></p>')).toEqual([
            'shared|reading_mark{"unknownAttributes":null},ruling_mark{"unknownAttributes":null}',
        ]);
    });
});
