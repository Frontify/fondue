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
];

/** An attribute every stored-value case carries, so the test can find the drawn element on each surface. */
const KEPT = 'data-keep';

const toUntyped = (attrs: Record<string, unknown>): HtmlAttributes => attrs as unknown as HtmlAttributes;

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

    it('write a true boolean with the same value in the editor, the HTML export and the readonly view', () => {
        const plugin = attributesPlugin({ 'data-x': 'y', popover: true, hidden: true, disabled: true });
        const editor = mountView(() => <RichTextEditor value={value} plugins={[plugin]} />).querySelector('[data-x]');
        const view = mountView(() => <RichTextRenderer value={value} plugins={[plugin]} />).querySelector('[data-x]');
        const exported = window.document.createElement('div');
        exported.innerHTML = serializeToHtml(value, { plugins: [plugin], wrap: false });

        for (const name of ['popover', 'hidden', 'disabled']) {
            expect(editor?.getAttribute(name)).toBe('');
            expect(view?.getAttribute(name)).toBe('');
            expect(exported.querySelector('[data-x]')?.getAttribute(name)).toBe('');
        }
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

/** The element each surface draws for the markup, so a stored value is judged the same on all three. */
const drawnBy = (attrs: HtmlAttributes): Record<string, Element | null | undefined> => {
    const plugin = attributesPlugin(attrs);
    const exported = window.document.createElement('div');
    exported.innerHTML = serializeToHtml(value, { plugins: [plugin], wrap: false });
    return {
        editor: mountView(() => <RichTextEditor value={value} plugins={[plugin]} />).querySelector(`[${KEPT}]`),
        export: exported.querySelector(`[${KEPT}]`),
        view: mountView(() => <RichTextRenderer value={value} plugins={[plugin]} />).querySelector(`[${KEPT}]`),
    };
};

describe('a stored value in the attributes of markup', () => {
    it('is left out when it is null or undefined, without a warning', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const surfaces = drawnBy(toUntyped({ [KEPT]: 'y', 'data-null': null, 'data-undefined': undefined }));

        for (const element of Object.values(surfaces)) {
            expect(element?.getAttribute(KEPT)).toBe('y');
            expect(element?.hasAttribute('data-null')).toBe(false);
            expect(element?.hasAttribute('data-undefined')).toBe(false);
        }
        expect(warn).not.toHaveBeenCalled();
    });

    it('is written as a string when it is a number', () => {
        const surfaces = drawnBy(toUntyped({ [KEPT]: 'y', 'data-count': 3 }));

        for (const element of Object.values(surfaces)) {
            expect(element?.getAttribute('data-count')).toBe('3');
        }
    });

    it('is left out with one development warning when it is anything else, a style that is not a map included', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const surfaces = drawnBy(
            toUntyped({ [KEPT]: 'y', 'data-object-value': { color: 'red' }, title: ['a'], style: 'color: red' }),
        );

        for (const element of Object.values(surfaces)) {
            expect(element?.getAttribute(KEPT)).toBe('y');
            expect(element?.hasAttribute('data-object-value')).toBe(false);
            expect(element?.hasAttribute('title')).toBe(false);
            expect(element?.hasAttribute('style')).toBe(false);
        }
        const leftOut = warn.mock.calls.filter(([message]) => String(message).includes('was left out'));
        expect(leftOut).toHaveLength(3);
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
