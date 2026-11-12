/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildPluginRegistry, type HtmlAttributes } from '../core';
import { htmlSpecToDom } from '../editor/engines/prosemirror/htmlSpecToDom';
import {
    defineBlock,
    defineContent,
    definePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    type RtePlugin,
    serializeToHtml,
} from '../index';
import { documentTree } from '../renderer/documentTree';
import { toReact } from '../renderer/toReact';

// What a plugin's markup may carry is one core rule: the editor, the HTML
// export and the readonly view all take the same attributes and refuse the same ones.

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const teardown: (() => void)[] = [];

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
    vi.restoreAllMocks();
});

const attributesPlugin = (attrs: HtmlAttributes): RtePlugin =>
    definePlugin({
        id: 'attributes',
        content: defineContent({
            blocks: {
                carrier: defineBlock({
                    content: 'text',
                    toHtml: () => ({ tag: 'div', attrs, children: true }),
                    parse: [],
                }),
            },
        }),
    });

// A test-only block type outside the `RteBlock` union.
const value = { version: 1, blocks: [{ type: 'carrier', children: [{ text: 'text' }] }] } as unknown as RteDocument;

const BAG: HtmlAttributes = { 'data-x': 'y', popover: true, hidden: false, title: undefined };

/** Attributes the markup must refuse, as an untyped plugin could still write them. */
const REFUSED: [string, HtmlAttributes][] = [
    ['an event handler', { onclick: 'alert(1)' }],
    ['an event handler in capitals', { OnClick: 'alert(1)' }],
    ['a name with a space', { 'data x': 'y' }],
    ['a style that is not a map', { style: 'color: red' } as unknown as HtmlAttributes],
    ['a style map on another attribute', { title: { color: 'red' } } as unknown as HtmlAttributes],
];

const mountView = (view: () => React.ReactNode): HTMLElement => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    act(() => root.render(view()));
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    return container;
};

describe('the attributes of markup', () => {
    it('reach the editor, as any attribute by its name, a true boolean written and a false one left out', () => {
        const container = mountView(() => <RichTextEditor value={value} plugins={[attributesPlugin(BAG)]} />);

        const element = container.querySelector('[data-x]');

        expect(element?.getAttribute('data-x')).toBe('y');
        expect(element?.getAttribute('popover')).toBe('');
        expect(element?.hasAttribute('hidden')).toBe(false);
        expect(element?.hasAttribute('title')).toBe(false);
    });

    it('reach the HTML export', () => {
        const html = serializeToHtml(value, { plugins: [attributesPlugin(BAG)], wrap: false });

        expect(html).toBe('<div data-x="y" popover="">text</div>');
    });

    it('reach the readonly view, a true boolean written and a false one left out', () => {
        const plugin = attributesPlugin({ ...BAG, hidden: true, disabled: true });
        const container = mountView(() => <RichTextRenderer value={value} plugins={[plugin]} />);

        const element = container.querySelector('[data-x]');

        expect(element?.getAttribute('data-x')).toBe('y');
        expect(element?.hasAttribute('popover')).toBe(true);
        expect(element?.hasAttribute('hidden')).toBe(true);
        expect(element?.hasAttribute('disabled')).toBe(true);
        expect(element?.hasAttribute('title')).toBe(false);
    });

    it('reach the readonly view without a React warning, and leave a false boolean out', () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        const plugin = attributesPlugin({ 'data-x': 'y', popover: true, hidden: false });
        const container = mountView(() => <RichTextRenderer value={value} plugins={[plugin]} />);

        expect(container.querySelector('[data-x]')?.hasAttribute('hidden')).toBe(false);
        expect(error).not.toHaveBeenCalled();
    });

    it('may carry a style as a map of CSS properties', () => {
        const plugin = attributesPlugin({ style: { color: 'red' } });

        expect(serializeToHtml(value, { plugins: [plugin], wrap: false })).toBe('<div style="color: red;">text</div>');
    });
});

describe.each(REFUSED)('markup carrying %s', (_, attrs) => {
    const [name] = Object.keys(attrs);
    const refusal = new RegExp(`Attribute "${name}" on <div>`);

    it('throws from the editor, naming the attribute and the tag', () => {
        expect(() => htmlSpecToDom({ tag: 'div', attrs, children: true })).toThrow(refusal);
    });

    it('throws from the HTML export', () => {
        expect(() => serializeToHtml(value, { plugins: [attributesPlugin(attrs)], wrap: false })).toThrow(refusal);
    });

    it('throws from the readonly view', () => {
        const registry = buildPluginRegistry([attributesPlugin(attrs)]);

        expect(() => toReact(documentTree(value, registry, { useComponents: false }))).toThrow(refusal);
    });
});
