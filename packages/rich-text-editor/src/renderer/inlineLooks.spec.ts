/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { fondueToken, type HtmlAttributes, type HtmlSpec, OWN_MARGINS_ATTRIBUTE } from '#/core';

import { type DrawnNode } from './documentTree';
import { inlineLooks } from './inlineLooks';

type HtmlNode = Extract<DrawnNode, { kind: 'html' }>;
type ComponentNode = Extract<DrawnNode, { kind: 'component' }>;

const CONTENT_STYLES = {
    big: { 'font-size': '24px', color: 'red' },
    bold: { 'font-weight': '700', color: 'blue' },
};
const CLASS_STYLES = { classes: CONTENT_STYLES, plainTags: {} };
const NO_STYLES = { classes: {}, plainTags: {} };
const PLAIN_P_STYLES = { classes: CONTENT_STYLES, plainTags: { p: { 'font-size': '13px', color: 'green' } } };

const BLOCK_GAP = fondueToken('spacing-x-small');
const HEADING_GAP = fondueToken('spacing-medium');
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
        const [node] = inlineLooks([element({ class: 'big' })], CLASS_STYLES);

        expect(node).toMatchObject({ spec: { attrs: { class: 'big', style: CONTENT_STYLES.big } } });
    });

    it('merges the styles of several classes, a later class over an earlier one', () => {
        const [node] = inlineLooks([element({ class: 'big  bold' })], CLASS_STYLES);

        expect(node).toMatchObject({
            spec: { attrs: { style: { 'font-size': '24px', 'font-weight': '700', color: 'blue' } } },
        });
    });

    it('lets the element own style win over its classes', () => {
        const styled = element({ class: 'big', style: { color: 'green', 'text-align': 'center' } });
        const [node] = inlineLooks([styled], CLASS_STYLES);

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

        const [node] = inlineLooks([element({ class: 'big' }, [component])], CLASS_STYLES);

        expect(node).toMatchObject({
            spec: { attrs: { style: CONTENT_STYLES.big } },
            content: [{ kind: 'component', content: [{ spec: { attrs: { style: CONTENT_STYLES.bold } } }] }],
        });
    });

    it('leaves strings and elements without a styled class as they are', () => {
        const plain = element({});
        const unknown = element({ class: 'other', style: { color: 'green' } });

        const [text, first, second] = inlineLooks(['text', plain, unknown], CLASS_STYLES);

        expect(text).toBe('text');
        expect(specOf(first)).toBe(plain.spec);
        expect(specOf(second)).toBe(unknown.spec);
    });

    it('does not read a class named like an object property as a style', () => {
        const constructorClass = element({ class: 'constructor' });

        const [node] = inlineLooks([constructorClass], CLASS_STYLES);

        expect(specOf(node)).toBe(constructorClass.spec);
    });
});

describe('inlineLooks plain tags', () => {
    it('writes the style of a tag on an element that does not own its margins', () => {
        const [node] = inlineLooks([block('p')], PLAIN_P_STYLES);

        expect(specOf(node).attrs?.style).toMatchObject({ 'font-size': '13px', color: 'green' });
    });

    it('leaves out an element that carries the margin marker', () => {
        const [node] = inlineLooks([block('p', [], { [OWN_MARGINS_ATTRIBUTE]: '' })], PLAIN_P_STYLES);

        expect(specOf(node).attrs?.style).not.toHaveProperty('font-size');
    });

    it('lets the style of a class win over the style of its tag', () => {
        const [node] = inlineLooks([block('p', [], { class: 'big' })], PLAIN_P_STYLES);

        expect(specOf(node).attrs?.style).toMatchObject(CONTENT_STYLES.big);
    });

    it('leaves an element of a tag no content styled as it is', () => {
        const [node] = inlineLooks([block('span')], PLAIN_P_STYLES);

        expect(specOf(node)).toEqual({ tag: 'span', attrs: {}, children: true });
    });
});

describe('inlineLooks spacing', () => {
    it('gives every block the gap below but the last, which gets none', () => {
        const [first, last] = inlineLooks([block('p'), block('ul')], NO_STYLES);

        expect(specOf(first).attrs?.style).toEqual({ 'margin-top': '0', 'margin-bottom': BLOCK_GAP });
        expect(specOf(last).attrs?.style).toEqual({ 'margin-top': '0', 'margin-bottom': '0' });
    });

    it('gives a heading the gap above, but not the first one', () => {
        const [first, , later] = inlineLooks([block('h1'), block('p'), block('h2'), block('p')], NO_STYLES);

        expect(specOf(first).attrs?.style).toMatchObject({ 'margin-top': '0' });
        expect(specOf(later).attrs?.style).toMatchObject({ 'margin-top': HEADING_GAP, 'margin-bottom': BLOCK_GAP });
    });

    it('places blocks among elements alone, so text beside them does not count', () => {
        const [, heading, , paragraph] = inlineLooks(['text', block('h2'), 'text', block('p'), 'text'], NO_STYLES);

        expect(specOf(heading).attrs?.style).toMatchObject({ 'margin-top': '0' });
        expect(specOf(paragraph).attrs?.style).toMatchObject({ 'margin-bottom': '0' });
    });

    it('gives blocks inside a list item no gaps, nested ones included, while the list keeps its own', () => {
        const nested = block('ul', [block('li', [block('p')])]);
        const item = block('li', [element({}, [block('p'), block('h2'), nested], 'div')]);

        const [list] = inlineLooks([block('ul', [item]), block('p')], NO_STYLES);

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
        const contentStyles = { classes: { spaced: HOST_MARGINS }, plainTags: {} };

        const [, last] = inlineLooks([block('h1'), block('h2', [], { class: 'spaced' })], contentStyles);
        const [list] = inlineLooks([block('ul', [block('li', [block('p', [], { class: 'spaced' })])])], contentStyles);

        const [paragraph] = contentOf(contentOf(list)[0]);
        expect(specOf(last).attrs?.style).toEqual(HOST_MARGINS);
        expect(specOf(paragraph).attrs?.style).toEqual(HOST_MARGINS);
    });

    it('lets the element own style win over the gaps', () => {
        const [node] = inlineLooks([block('p', [], { style: { 'margin-bottom': '4px' } })], NO_STYLES);

        expect(specOf(node).attrs?.style).toEqual({ 'margin-top': '0', 'margin-bottom': '4px' });
    });
});
