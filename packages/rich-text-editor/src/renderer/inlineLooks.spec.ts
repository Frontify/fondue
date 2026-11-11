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

const element = (attrs: HtmlAttributes, content: DrawnNode[] = []): HtmlNode => ({
    kind: 'html',
    spec: { tag: 'p', attrs, children: true },
    content,
});

const specOf = (node: DrawnNode | undefined): HtmlSpec => {
    if (typeof node === 'string' || node === undefined || node.kind !== 'html') {
        throw new Error('Expected an element node');
    }
    return node.spec;
};

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
