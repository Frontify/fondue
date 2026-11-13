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
import { inlineLooks, resolveVariables } from './inlineLooks';

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

/** The margins the document gives a spaced block: none above, the gap below. */
const documentMargins = (below: string) => ({ 'margin-top': '0', 'margin-bottom': below });

const OWN_MARGINS: HtmlAttributes = { [OWN_MARGINS_ATTRIBUTE]: '' };
const OWN_BLOCK: HtmlAttributes = { ...OWN_MARGINS, class: 'own' };
/** The gap above a block that owns its margins, as its class writes it. */
const OWN_GAP_ABOVE = '16px';
/** The same gap, written to follow the document's gap above where it sets one. */
const OWN_GAP_ABOVE_READ = `var(${DOCUMENT_GAP_VARIABLES.leading}, ${OWN_GAP_ABOVE})`;

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

        expect(specOf(node).attrs?.style).toBeUndefined();
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

        expect(specOf(first).attrs?.style).toEqual(documentMargins(BLOCK_GAP));
        expect(specOf(middle).attrs?.style).toEqual(documentMargins(BLOCK_GAP));
        expect(specOf(last).attrs?.style).toEqual(documentMargins('0'));
    });

    it('writes no custom property', () => {
        const [node] = inlineLooks([block('p'), block('p')], NO_STYLES);

        expect(Object.keys(specOf(node).attrs?.style ?? {}).filter((name) => name.startsWith('--'))).toEqual([]);
    });

    it('gives a block whose look reads the document gaps their value, or the look fallback where it sets none', () => {
        const contentStyles = { classes: { own: { 'margin-top': OWN_GAP_ABOVE_READ } }, plainTags: {} };

        const [first, middle, last] = inlineLooks(
            [block('p', [], OWN_BLOCK), block('p', [], OWN_BLOCK), block('p', [], OWN_BLOCK)],
            contentStyles,
        );

        expect(specOf(first).attrs?.style).toEqual({ 'margin-top': '0' });
        expect(specOf(middle).attrs?.style).toEqual({ 'margin-top': OWN_GAP_ABOVE });
        expect(specOf(last).attrs?.style).toEqual({ 'margin-top': OWN_GAP_ABOVE });
    });

    it('gives a block that owns its margins only the margins its look sets, none from the document', () => {
        const contentStyles = { classes: { own: { 'margin-top': OWN_GAP_ABOVE } }, plainTags: {} };

        const [first] = inlineLooks([block('p', [], OWN_BLOCK), block('p')], contentStyles);

        expect(specOf(first).attrs?.style).toEqual({ 'margin-top': OWN_GAP_ABOVE });
    });

    it('places blocks among elements alone, so text beside them does not count', () => {
        const [, heading, , paragraph] = inlineLooks(['text', block('h2'), 'text', block('p'), 'text'], NO_STYLES);

        expect(specOf(heading).attrs?.style).toEqual(documentMargins(BLOCK_GAP));
        expect(specOf(paragraph).attrs?.style).toEqual(documentMargins('0'));
    });

    it('spaces the content of an element marked apart as the document does', () => {
        const container = block('div', [block('p'), block('p')], marked('apart'));

        const [drawn] = inlineLooks([container], NO_STYLES);

        const [first, last] = contentOf(drawn);
        expect(specOf(first).attrs?.style).toEqual(documentMargins(BLOCK_GAP));
        expect(specOf(last).attrs?.style).toEqual(documentMargins('0'));
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
        expect(specOf(list).attrs?.style).toEqual(documentMargins(BLOCK_GAP));
        expect(specOf(drawnItem).attrs?.style).toBeUndefined();
        expect(specOf(drawnItem).children).toEqual(itemSpec.children);
        expect(specOf(paragraph).attrs?.style).toEqual(documentMargins('0'));
        expect(specOf(heading).attrs?.style).toEqual(documentMargins('0'));
        expect(specOf(drawnNested).attrs?.style).toEqual(documentMargins('0'));
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

describe('resolveVariables', () => {
    const MEDIUM_GAP = fondueToken('spacing-medium');
    const HEADING_GAP = `var(--rte-heading-gap, ${MEDIUM_GAP})`;
    const HEADING_MARGIN_TOP = `var(${DOCUMENT_GAP_VARIABLES.leading}, ${HEADING_GAP})`;

    it('replaces a read with the value the document knows', () => {
        expect(resolveVariables(HEADING_MARGIN_TOP, { [DOCUMENT_GAP_VARIABLES.leading]: '0' })).toBe('0');
    });

    it('replaces a read the document does not know with its fallback, however deep it is nested', () => {
        expect(resolveVariables(HEADING_MARGIN_TOP, {})).toBe(MEDIUM_GAP);
    });

    it('resolves reads inside a larger value', () => {
        const value = `calc(var(${DOCUMENT_GAP_VARIABLES.block}, 1px) + 2px)`;

        expect(resolveVariables(value, { [DOCUMENT_GAP_VARIABLES.block]: '3px' })).toBe('calc(3px + 2px)');
    });

    it('keeps a read of a host variable, and resolves the document variables in its fallback', () => {
        const value = `var(--host-gap, var(${DOCUMENT_GAP_VARIABLES.block}, 4px))`;

        expect(resolveVariables(value, {})).toBe('var(--host-gap, 4px)');
        expect(resolveVariables('var(--host-gap)', {})).toBe('var(--host-gap)');
    });

    it('throws for a document variable it does not know that has no fallback, rather than inventing a value', () => {
        expect(() => resolveVariables(`var(${DOCUMENT_GAP_VARIABLES.block})`, {})).toThrow(
            `${DOCUMENT_GAP_VARIABLES.block} is read without a fallback`,
        );
    });

    it('gives the first heading no gap above and a later one the medium gap, in the export', () => {
        const contentStyles = { classes: { heading: { 'margin-top': HEADING_MARGIN_TOP } }, plainTags: {} };

        const [first, later] = inlineLooks(
            [
                block('h2', [], { ...OWN_MARGINS, class: 'heading' }),
                block('h2', [], { ...OWN_MARGINS, class: 'heading' }),
            ],
            contentStyles,
        );

        expect(specOf(first).attrs?.style).toMatchObject({ 'margin-top': '0' });
        expect(specOf(later).attrs?.style).toMatchObject({ 'margin-top': MEDIUM_GAP });
    });
});
