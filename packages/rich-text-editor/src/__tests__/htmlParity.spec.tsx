/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from '../core';
import {
    columnBreakPlugin,
    defaultPlugins,
    defineMark,
    mentionPlugin,
    type RteDocument,
    type RteDocumentWith,
    type RtePlugin,
    serializeToHtml,
} from '../index';
import { documentTree } from '../renderer/documentTree';
import { toReact } from '../renderer/toReact';

// A node's `toHtml` reaches the page as React elements (readonly view) and as
// attributes written directly (editor, HTML export). This holds the one place
// the two translate the `HtmlSpec` differently — attributes to React props —
// to the same output. Drawn with `react-dom/client`, never `react-dom/server`.

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const plugins = [
    ...defaultPlugins,
    mentionPlugin({ items: [], href: (mention) => (mention.kind === 'all' ? undefined : `/people/${mention.id}`) }),
    columnBreakPlugin(),
];

/** Every block, mark and inline the shipped plugins write. */
const doc: RteDocumentWith<{ block: { type: 'columnBreak' } }> = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading2', children: [{ text: 'A heading' }] },
        { type: 'textStyle', style: 'imageCaption', children: [{ text: 'A caption' }] },
        {
            type: 'paragraph',
            align: 'center',
            children: [
                { text: 'bold', bold: true },
                { text: 'italic', italic: true },
                { text: 'underline', underline: true },
                { text: 'struck', strikethrough: true },
                { text: 'code', code: true },
                { text: 'sub', subscript: true },
                { text: 'sup', superscript: true },
                { text: 'red', fontColor: { color: 'rgb(255, 0, 0)' } },
                { text: 'link', link: { href: 'https://example.com', openInNewTab: true } },
                { type: 'break' },
                { type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' },
                { type: 'mention', id: 'design', username: 'design', name: 'Design team', kind: 'group' },
                { type: 'mention', id: 'all', username: 'all', name: 'Everyone', kind: 'all' },
            ],
        },
        { type: 'paragraph', children: [{ text: '' }] },
        { type: 'quote', children: [{ text: 'A quote' }] },
        {
            type: 'numberedList',
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'One' }] }] }],
        },
        {
            type: 'checkList',
            children: [
                { type: 'checkItem', checked: true, children: [{ type: 'paragraph', children: [{ text: 'Done' }] }] },
                { type: 'checkItem', checked: false, children: [{ type: 'paragraph', children: [{ text: 'Open' }] }] },
            ],
        },
        { type: 'columnBreak' },
    ],
};

/** The React path, rendered into the test DOM. */
const drawnWithReact = (value: RteDocument | typeof doc, withPlugins: readonly RtePlugin[] = plugins): string => {
    const container = window.document.createElement('div');
    const root = createRoot(container);
    act(() => {
        root.render(toReact(documentTree(value, buildPluginRegistry(withPlugins), { useComponents: false })));
    });
    const html = container.innerHTML;
    act(() => root.unmount());
    return html;
};

/**
 * Markup as the DOM reads it, attributes sorted: their order means nothing in
 * HTML, and React sets some (`checked`) after the rest.
 */
const normalized = (html: string): string => {
    const container = window.document.createElement('div');
    container.innerHTML = html;
    for (const element of container.querySelectorAll('*')) {
        const attributes = [...element.attributes].map(({ name, value }) => [name, value] as const);
        for (const [name] of attributes) {
            element.removeAttribute(name);
        }
        for (const [name, value] of [...attributes].sort(([left], [right]) => left.localeCompare(right))) {
            element.setAttribute(name, value);
        }
    }
    return container.innerHTML;
};

describe('toHtml drawn by React and written out directly', () => {
    it('is the same HTML for every shipped node', () => {
        expect(normalized(drawnWithReact(doc))).toBe(normalized(serializeToHtml(doc, { plugins, wrap: false })));
    });
});

describe('a style value that could break out of its declaration', () => {
    // A plugin passing a stored value straight into `style`; the core drops
    // what it must not write, the same way on both paths.
    const tintPlugin: RtePlugin = {
        id: 'tint',
        marks: {
            tint: defineMark<{ color: string }>({
                defaults: { color: 'inherit' },
                toHtml: ({ color }) => ({
                    tag: 'span',
                    attrs: { style: { color, 'font-weight': 'bold' } },
                    children: true,
                }),
                parse: [],
            }),
        },
    };
    const tinted = (color: string): RteDocumentWith<{ mark: { tint?: { color: string } } }> => ({
        version: 1,
        blocks: [{ type: 'paragraph', children: [{ text: 'x', tint: { color } }] }],
    });

    it.each([
        'red; background: blue',
        'red} p { color: blue',
        'url(https://example.com/track.png)',
        'URL(x)',
        'expression(alert(1))',
        'red\\3b',
        '</style><script>',
    ])('is dropped from the style, keeping the rest: %s', (color) => {
        const exported = serializeToHtml(tinted(color), { plugins: [tintPlugin], wrap: false });

        expect(exported).toBe('<p><span style="font-weight: bold;">x</span></p>');
        expect(normalized(drawnWithReact(tinted(color), [tintPlugin]))).toBe(normalized(exported));
    });

    it('keeps an ordinary value', () => {
        const exported = serializeToHtml(tinted('rgb(255, 0, 0)'), { plugins: [tintPlugin], wrap: false });

        expect(exported).toContain('color: rgb(255, 0, 0);');
        expect(normalized(drawnWithReact(tinted('rgb(255, 0, 0)'), [tintPlugin]))).toBe(normalized(exported));
    });
});
