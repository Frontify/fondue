/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    CHILD_SPACING_ATTRIBUTE,
    type ChildSpacing,
    type ContentStyles,
    DOCUMENT_GAP_VARIABLES,
    fondueToken,
    type HtmlAttributes,
    type HtmlSpec,
    OWN_MARGINS_ATTRIBUTE,
} from '#/core';

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
const HOST_MARGINS = { 'margin-top': '10px', 'margin-bottom': '20px' };

/** The margins the document gives a spaced block that does not own them: none above, the gap below. */
const documentMargins = (below: string) => ({ 'margin-top': '0', 'margin-bottom': below });

/** The gap variables, the one below then the one above. */
const gaps = (below: string, leading: string) => ({
    [DOCUMENT_GAP_VARIABLES.block]: below,
    [DOCUMENT_GAP_VARIABLES.leading]: leading,
});

const TIGHT_GAPS = gaps('0', '0');

const OWN_MARGINS: HtmlAttributes = { [OWN_MARGINS_ATTRIBUTE]: '' };

const marked = (spacing: ChildSpacing): HtmlAttributes => ({ [CHILD_SPACING_ATTRIBUTE]: spacing });

/** An element nested in no spaced container, so only its classes' styles show. */
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

/** The nodes inlined inside an element without the child-spacing mark, so the document spaces none of them. */
const inlineUnspaced = (nodes: DrawnNode[], contentStyles: Required<ContentStyles>): DrawnNode[] =>
    contentOf(inlineLooks([block('div', nodes)], contentStyles)[0]);

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

        const [text, first, second] = inlineUnspaced(['text', plain, unknown], CLASS_STYLES);

        expect(text).toBe('text');
        expect(specOf(first)).toBe(plain.spec);
        expect(specOf(second)).toBe(unknown.spec);
    });

    it('does not read a class named like an object property as a style', () => {
        const constructorClass = element({ class: 'constructor' });

        const [node] = inlineUnspaced([constructorClass], CLASS_STYLES);

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
        const [node] = inlineUnspaced([block('span')], PLAIN_P_STYLES);

        expect(specOf(node)).toEqual({ tag: 'span', attrs: {}, children: true });
    });
});

describe('inlineLooks spacing', () => {
    it('gives the first block no gap above and the last none below, and margins from the gap below', () => {
        const [first, middle, last] = inlineLooks([block('p'), block('ul'), block('div')], NO_STYLES);

        expect(specOf(first).attrs?.style).toEqual({ ...gaps(BLOCK_GAP, '0'), ...documentMargins(BLOCK_GAP) });
        expect(specOf(middle).attrs?.style).toEqual({ ...gaps(BLOCK_GAP, 'initial'), ...documentMargins(BLOCK_GAP) });
        expect(specOf(last).attrs?.style).toEqual({ ...gaps('0', 'initial'), ...documentMargins('0') });
    });

    it('hands a block that owns its margins the gaps alone, and its class style reads them', () => {
        const heading = { 'margin-top': `var(${DOCUMENT_GAP_VARIABLES.leading}, 16px)` };
        const contentStyles = { classes: { heading }, plainTags: {} };

        const [, drawn] = inlineLooks(
            [block('p'), block('h2', [], { ...OWN_MARGINS, class: 'heading' })],
            contentStyles,
        );

        expect(specOf(drawn).attrs?.style).toEqual({ ...gaps('0', 'initial'), ...heading });
    });

    it('places blocks among elements alone, so text beside them does not count', () => {
        const [, heading, , paragraph] = inlineLooks(['text', block('h2'), 'text', block('p'), 'text'], NO_STYLES);

        expect(specOf(heading).attrs?.style).toMatchObject(gaps(BLOCK_GAP, '0'));
        expect(specOf(paragraph).attrs?.style).toMatchObject(gaps('0', 'initial'));
    });

    it('spaces the content of an element marked apart as the document does', () => {
        const container = block('div', [block('p'), block('p')], marked('apart'));

        const [drawn] = inlineLooks([container], NO_STYLES);

        const [first, last] = contentOf(drawn);
        expect(specOf(first).attrs?.style).toEqual({ ...gaps(BLOCK_GAP, '0'), ...documentMargins(BLOCK_GAP) });
        expect(specOf(last).attrs?.style).toEqual({ ...gaps('0', 'initial'), ...documentMargins('0') });
    });

    it('gives the content of a tight element no gaps, and reads the mark where the content goes', () => {
        const itemSpec: HtmlSpec = {
            tag: 'li',
            children: [{ tag: 'input' }, { tag: 'div', attrs: marked('tight'), children: true }],
        };
        const nested = block('ul');
        const item: HtmlNode = { kind: 'html', spec: itemSpec, content: [block('p'), block('h2'), nested] };

        const [list] = inlineLooks([block('ul', [item]), block('p')], NO_STYLES);

        const [drawnItem] = contentOf(list);
        const [paragraph, heading, drawnNested] = contentOf(drawnItem);
        expect(specOf(list).attrs?.style).toEqual({ ...gaps(BLOCK_GAP, '0'), ...documentMargins(BLOCK_GAP) });
        expect(specOf(drawnItem).attrs?.style).toBeUndefined();
        expect(specOf(drawnItem).children).toEqual(itemSpec.children);
        expect(specOf(paragraph).attrs?.style).toEqual({ ...TIGHT_GAPS, ...documentMargins('0') });
        expect(specOf(heading).attrs?.style).toEqual({ ...TIGHT_GAPS, ...documentMargins('0') });
        expect(specOf(drawnNested).attrs?.style).toEqual({ ...TIGHT_GAPS, ...documentMargins('0') });
    });

    it('leaves the content of an element without the mark unspaced', () => {
        const [drawn] = inlineLooks([block('div', [block('p')])], NO_STYLES);

        expect(specOf(contentOf(drawn)[0]).attrs?.style).toBeUndefined();
    });

    it('throws for a mark that names no spacing, rather than spacing by a guess', () => {
        const container = block('div', [block('p')], { [CHILD_SPACING_ATTRIBUTE]: 'loose' });

        expect(() => inlineLooks([container], NO_STYLES)).toThrow(`Unknown ${CHILD_SPACING_ATTRIBUTE} value "loose".`);
    });

    it('keeps a host margin as given, also on the last block and in a tight container', () => {
        const contentStyles = { classes: { spaced: HOST_MARGINS }, plainTags: {} };
        const item = block('li', [block('p', [], { class: 'spaced' })], marked('tight'));

        const [, last] = inlineLooks([block('h1'), block('h2', [], { class: 'spaced' })], contentStyles);
        const [list] = inlineLooks([block('ul', [item])], contentStyles);

        const [paragraph] = contentOf(contentOf(list)[0]);
        expect(specOf(last).attrs?.style).toMatchObject(HOST_MARGINS);
        expect(specOf(paragraph).attrs?.style).toMatchObject(HOST_MARGINS);
    });

    it('lets the element own style win over the gaps', () => {
        const [node] = inlineLooks([block('p', [], { style: { 'margin-bottom': '4px' } })], NO_STYLES);

        expect(specOf(node).attrs?.style).toMatchObject({ 'margin-top': '0', 'margin-bottom': '4px' });
    });
});
