/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type HtmlAttributes, type HtmlSpec } from '#/core';

import { type DrawnNode } from './documentTree';
import { inlineLooks } from './inlineLooks';

type HtmlNode = Extract<DrawnNode, { kind: 'html' }>;
type ComponentNode = Extract<DrawnNode, { kind: 'component' }>;

const CONTENT_STYLES = {
    big: { 'font-size': '24px', color: 'red' },
    bold: { 'font-weight': '700', color: 'blue' },
};

const BLOCK_GAP = 'var(--spacing-x-small)';
const HEADING_GAP = 'var(--spacing-medium)';
const HOST_MARGINS = { 'margin-top': '10px', 'margin-bottom': '20px' };

/** A `span` by default, which the document does not space, so only its classes' styles show. */
const element = (attrs: HtmlAttributes, content: DrawnNode[] = [], tag: HtmlSpec['tag'] = 'span'): HtmlNode => ({
    kind: 'html',
    spec: { tag, attrs, children: true },
    content,
});

const block = (tag: HtmlSpec['tag'], content: DrawnNode[] = [], attrs: HtmlAttributes = {}): HtmlNode =>
    element(attrs, content, tag);

const elementOf = (node: DrawnNode | undefined): HtmlNode => {
    if (typeof node === 'string' || node === undefined || node.kind !== 'html') {
        throw new Error('Expected an element node');
    }
    return node;
};

const specOf = (node: DrawnNode | undefined): HtmlSpec => elementOf(node).spec;

const contentOf = (node: DrawnNode | undefined): DrawnNode[] => elementOf(node).content;

describe('inlineLooks', () => {
    it('writes the style of the class and keeps the class', () => {
        const [node] = inlineLooks([element({ class: 'big' })], CONTENT_STYLES);

        expect(node).toMatchObject({ spec: { attrs: { class: 'big', style: CONTENT_STYLES.big } } });
    });

    it('merges the styles of several classes, a later class over an earlier one', () => {
        const [node] = inlineLooks([element({ class: 'big  bold' })], CONTENT_STYLES);

        expect(node).toMatchObject({
            spec: { attrs: { style: { 'font-size': '24px', 'font-weight': '700', color: 'blue' } } },
        });
    });

    it('lets the element own style win over its classes', () => {
        const styled = element({ class: 'big', style: { color: 'green', 'text-align': 'center' } });
        const [node] = inlineLooks([styled], CONTENT_STYLES);

        expect(node).toMatchObject({
            spec: { attrs: { style: { 'font-size': '24px', color: 'green', 'text-align': 'center' } } },
        });
    });

    it('reaches nested elements and the content of components', () => {
        const component: ComponentNode = {
            kind: 'component',
            component: () => null,
            props: {},
            content: [element({ class: 'bold' })],
        };

        const [node] = inlineLooks([element({ class: 'big' }, [component])], CONTENT_STYLES);

        expect(node).toMatchObject({
            spec: { attrs: { style: CONTENT_STYLES.big } },
            content: [{ kind: 'component', content: [{ spec: { attrs: { style: CONTENT_STYLES.bold } } }] }],
        });
    });

    it('leaves strings and elements without a styled class as they are', () => {
        const plain = element({});
        const unknown = element({ class: 'other', style: { color: 'green' } });

        const [text, first, second] = inlineLooks(['text', plain, unknown], CONTENT_STYLES);

        expect(text).toBe('text');
        expect(specOf(first)).toBe(plain.spec);
        expect(specOf(second)).toBe(unknown.spec);
    });

    it('does not read a class named like an object property as a style', () => {
        const constructorClass = element({ class: 'constructor' });

        const [node] = inlineLooks([constructorClass], CONTENT_STYLES);

        expect(specOf(node)).toBe(constructorClass.spec);
    });
});

describe('inlineLooks spacing', () => {
    it('gives every block the gap below but the last, which gets none', () => {
        const [first, last] = inlineLooks([block('p'), block('ul')], {});

        expect(specOf(first).attrs?.style).toEqual({ 'margin-top': '0', 'margin-bottom': BLOCK_GAP });
        expect(specOf(last).attrs?.style).toEqual({ 'margin-top': '0', 'margin-bottom': '0' });
    });

    it('gives a heading the gap above, but not the first one', () => {
        const [first, , later] = inlineLooks([block('h1'), block('p'), block('h2'), block('p')], {});

        expect(specOf(first).attrs?.style).toMatchObject({ 'margin-top': '0' });
        expect(specOf(later).attrs?.style).toMatchObject({ 'margin-top': HEADING_GAP, 'margin-bottom': BLOCK_GAP });
    });

    it('places blocks among elements alone, so text beside them does not count', () => {
        const [, heading, , paragraph] = inlineLooks(['text', block('h2'), 'text', block('p'), 'text'], {});

        expect(specOf(heading).attrs?.style).toMatchObject({ 'margin-top': '0' });
        expect(specOf(paragraph).attrs?.style).toMatchObject({ 'margin-bottom': '0' });
    });

    it('gives blocks inside a list item no gaps, nested ones included, while the list keeps its own', () => {
        const nested = block('ul', [block('li', [block('p')])]);
        const item = block('li', [element({}, [block('p'), block('h2'), nested], 'div')]);

        const [list] = inlineLooks([block('ul', [item]), block('p')], {});

        const [drawnItem] = contentOf(list);
        const [label] = contentOf(drawnItem);
        const [paragraph, heading, drawnNested] = contentOf(label);
        const noGaps = { 'margin-top': '0', 'margin-bottom': '0' };
        expect(specOf(list).attrs?.style).toEqual({ 'margin-top': '0', 'margin-bottom': BLOCK_GAP });
        expect(specOf(paragraph).attrs?.style).toEqual(noGaps);
        expect(specOf(heading).attrs?.style).toEqual(noGaps);
        expect(specOf(drawnNested).attrs?.style).toEqual(noGaps);
        expect(specOf(label).attrs?.style).toBeUndefined();
    });

    it('keeps a host margin as given, also on the last block and in a list item', () => {
        const contentStyles = { spaced: HOST_MARGINS };

        const [, last] = inlineLooks([block('h1'), block('h2', [], { class: 'spaced' })], contentStyles);
        const [list] = inlineLooks([block('ul', [block('li', [block('p', [], { class: 'spaced' })])])], contentStyles);

        const [paragraph] = contentOf(contentOf(list)[0]);
        expect(specOf(last).attrs?.style).toEqual(HOST_MARGINS);
        expect(specOf(paragraph).attrs?.style).toEqual(HOST_MARGINS);
    });

    it('lets the element own style win over the gaps', () => {
        const [node] = inlineLooks([block('p', [], { style: { 'margin-bottom': '4px' } })], {});

        expect(specOf(node).attrs?.style).toEqual({ 'margin-top': '0', 'margin-bottom': '4px' });
    });
});
