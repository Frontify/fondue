/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from './core';
import { documentTree } from './renderer/documentTree';
import { toReact } from './renderer/toReact';

import {
    columnBreakPlugin,
    defaultPlugins,
    filterByName,
    mentionPlugin,
    type RteDocument,
    type RteDocumentWith,
    serializeToHtml,
} from './index';

/**
 * Every node's `toHtml` reaches the page two ways: as React elements in the
 * readonly view, and as attributes written out directly by the editor and the
 * HTML export. Both read the same `HtmlSpec`; this holds the one place they
 * translate it differently — attributes to React props — to the other.
 *
 * Drawn with `react-dom/client` into the test DOM, never `react-dom/server`.
 */

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const plugins = [
    ...defaultPlugins,
    mentionPlugin({ items: filterByName([]), href: (mention) => `/people/${mention.id}` }),
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
const drawnWithReact = (value: RteDocument | typeof doc): string => {
    const container = window.document.createElement('div');
    const root = createRoot(container);
    act(() => {
        root.render(toReact(documentTree(value, buildPluginRegistry(plugins), { useComponents: false })));
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
        expect(normalized(drawnWithReact(doc))).toBe(normalized(serializeToHtml(doc, { plugins })));
    });
});
