/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import {
    columnBreakPlugin,
    defaultPlugins,
    defineMark,
    type RteDocument,
    type RteDocumentWith,
    RichTextRenderer,
    type RtePlugin,
    serializeToHtml,
} from './index';

// The readonly view and export draw the same tree, so they are tested side by
// side: the renderer as React in the test DOM, export as the string it returns.

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const unmounts: (() => void)[] = [];
afterEach(() => {
    for (const unmount of unmounts.splice(0)) {
        act(unmount);
    }
});

const rendered = (element: React.ReactElement): HTMLElement => {
    const container = window.document.createElement('div');
    const root = createRoot(container);
    act(() => root.render(element));
    unmounts.push(() => root.unmount());
    return container;
};

/** Exported HTML, parsed so it can be queried like the rendered DOM. */
const exported = (html: string): HTMLElement => {
    const container = window.document.createElement('div');
    container.innerHTML = html;
    return container;
};

const paragraph = (
    children: Extract<RteDocument['blocks'][number], { type: 'paragraph' }>['children'],
): RteDocument => ({
    version: 1,
    blocks: [{ type: 'paragraph', children }],
});

/** A highlight whose readonly view is a component of its own. */
type HighlightMark = { highlight?: true };
const highlightPlugin: RtePlugin = {
    id: 'highlight',
    marks: {
        highlight: defineMark({
            toHtml: () => ({ tag: 'mark', children: true }),
            parse: [{ tag: 'mark' }],
            render: {
                component: ({ children }) => <span data-highlight-component="">{children}</span>,
            },
        }),
    },
};
const highlighted: RteDocumentWith<{ mark: HighlightMark }> = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: 'bright', highlight: true }] }],
};

describe('a mark with a render.component', () => {
    it('is drawn by its component in the readonly view', () => {
        const container = rendered(<RichTextRenderer value={highlighted} plugins={[highlightPlugin]} />);

        expect(container.querySelector('[data-highlight-component]')?.textContent).toBe('bright');
        expect(container.querySelector('mark')).toBeNull();
    });

    it('is drawn by its toHtml in export, never by the component', () => {
        const html = serializeToHtml(highlighted, { plugins: [highlightPlugin] });

        expect(html).toContain('<mark>bright</mark>');
        expect(html).not.toContain('data-highlight-component');
    });
});

describe('marks shared by neighbouring runs', () => {
    // `code` wraps `superscript` in the editor (the registry's nesting order),
    // so the editor draws one code element with the superscript inside it.
    const formula = paragraph([
        { text: 'E = mc', code: true },
        { text: '2', code: true, superscript: true },
        { text: ' tail', code: true },
    ]);

    it('are drawn once around the whole stretch, as the editor draws them', () => {
        for (const container of [
            rendered(<RichTextRenderer value={formula} />),
            exported(serializeToHtml(formula, { plugins: defaultPlugins })),
        ]) {
            const codes = container.querySelectorAll('code');
            expect(codes).toHaveLength(1);
            expect(codes[0]?.textContent).toBe('E = mc2 tail');
            expect(codes[0]?.querySelector('sup')?.textContent).toBe('2');
        }
    });

    it('make one link of a partly bold link', () => {
        const link = { href: 'https://example.com' };
        const doc = paragraph([
            { text: 'a ', link },
            { text: 'bold', link, bold: true },
            { text: ' link', link },
        ]);

        for (const container of [
            rendered(<RichTextRenderer value={doc} />),
            exported(serializeToHtml(doc, { plugins: defaultPlugins })),
        ]) {
            expect(container.querySelectorAll('a')).toHaveLength(1);
            expect(container.querySelector('a')?.textContent).toBe('a bold link');
        }
    });

    it('are drawn apart when their values differ', () => {
        const doc = paragraph([
            { text: 'one', link: { href: 'https://one.example' } },
            { text: 'two', link: { href: 'https://two.example' } },
        ]);

        expect(exported(serializeToHtml(doc, { plugins: defaultPlugins })).querySelectorAll('a')).toHaveLength(2);
    });
});

describe('a line break at the end of a block', () => {
    const doc = paragraph([{ text: 'line' }, { type: 'break' }]);

    it('keeps the empty line after it open, as the editor does', () => {
        for (const container of [
            rendered(<RichTextRenderer value={doc} />),
            exported(serializeToHtml(doc, { plugins: defaultPlugins })),
        ]) {
            expect(container.querySelectorAll('p > br')).toHaveLength(2);
        }
    });

    it('adds nothing when the break sits mid-block', () => {
        const midBlock = paragraph([{ text: 'one' }, { type: 'break' }, { text: 'two' }]);

        expect(exported(serializeToHtml(midBlock, { plugins: defaultPlugins })).querySelectorAll('br')).toHaveLength(1);
    });
});

describe('the element a document sits in', () => {
    const plugins = [...defaultPlugins, columnBreakPlugin({ columns: 3, gap: '24px' })];
    const doc = paragraph([{ text: 'Hello' }]);

    it('is the same in the readonly view and in export: document class, content classes, custom properties', () => {
        const view = rendered(<RichTextRenderer value={doc} plugins={plugins} />).firstElementChild;
        const exportRoot = exported(serializeToHtml(doc, { plugins })).firstElementChild;

        for (const root of [view, exportRoot]) {
            expect(root?.tagName).toBe('DIV');
            expect(root?.querySelector('p')?.textContent).toBe('Hello');
            expect((root as HTMLElement | null)?.style.getPropertyValue('--rte-columns')).toBe('3');
            expect((root as HTMLElement | null)?.style.getPropertyValue('--rte-column-gap')).toBe('24px');
        }
        expect(exportRoot?.className).toBe(view?.className);
        expect(view?.classList.length).toBe(2);
    });

    it('is left out of export with wrap: false', () => {
        expect(serializeToHtml(doc, { plugins, wrap: false })).toBe('<p>Hello</p>');
    });
});
