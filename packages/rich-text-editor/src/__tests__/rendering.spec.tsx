/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    columnBreakPlugin,
    defaultPlugins,
    defineContent,
    defineMark,
    definePlugin,
    linkPlugin,
    type RteDocument,
    type RteDocumentWith,
    RichTextRenderer,
    type RtePlugin,
    serializeToHtml,
} from '../index';
import { NEW_TAB_NOTE_ATTRIBUTE } from '../plugins/Link/helpers/newTab';
import linkStyles from '../plugins/Link/link.module.scss';

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
const highlightPlugin: RtePlugin = definePlugin({
    id: 'highlight',
    content: defineContent({
        marks: {
            highlight: defineMark({
                toHtml: () => ({ tag: 'mark', children: true }),
                parse: [{ tag: 'mark' }],
                render: {
                    component: ({ children }) => <span data-highlight-component="">{children}</span>,
                },
            }),
        },
    }),
});
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

describe('a mark stored as false or null', () => {
    // A host flipping a mark off by value rather than removing the key.
    const doc = paragraph([{ text: 'plain', bold: false, italic: null } as unknown as { text: string }]);

    it('is not carried: the text is drawn bare', () => {
        for (const container of [
            rendered(<RichTextRenderer value={doc} />),
            exported(serializeToHtml(doc, { plugins: defaultPlugins })),
        ]) {
            expect(container.querySelector('strong, em')).toBeNull();
            expect(container.querySelector('p')?.textContent).toBe('plain');
        }
    });
});

describe('a node no plugin defines', () => {
    // Stored by a plugin this view was not given, or by a newer version.
    const doc = {
        version: 1,
        blocks: [
            {
                type: 'paragraph',
                children: [{ text: 'before ' }, { type: 'embed', id: 'x' }, { text: 'after', glow: true }],
            },
            { type: 'callout', children: [{ text: 'inside a callout' }] },
            { type: 'tabs', children: [{ type: 'paragraph', children: [{ text: 'in a tab' }] }] },
            { type: 'divider' },
        ],
    } as unknown as RteDocument;

    it('is skipped, keeping the rest of the document and the text it holds', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

        for (const container of [
            rendered(<RichTextRenderer value={doc} />),
            exported(serializeToHtml(doc, { plugins: defaultPlugins, wrap: false })),
        ]) {
            expect(container.textContent).toBe('before afterinside a calloutin a tab');
            // The unknown container keeps its known block inside a plain `div`.
            const inDiv = container.querySelectorAll('div > p');
            expect(inDiv[inDiv.length - 1]?.textContent).toBe('in a tab');
        }
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown block type "callout"'));
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown inline type "embed"'));
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown mark type "glow"'));
        warn.mockRestore();
    });
});

describe('a list holding a block no plugin defines among its items', () => {
    const item = (children: unknown[]) => ({ type: 'listItem', children: [{ type: 'paragraph', children }] });
    const doc = {
        version: 1,
        blocks: [
            {
                type: 'numberedList',
                children: [
                    item([{ text: 'one' }]),
                    { type: 'callout', children: [{ text: 'two' }] },
                    item([{ text: 'three', link: { href: 'https://example.com' } }]),
                ],
            },
        ],
    } as unknown as RteDocument;

    it('draws the block as an item of its own, keeping the known items as they are', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

        for (const container of [
            rendered(<RichTextRenderer value={doc} />),
            exported(serializeToHtml(doc, { plugins: defaultPlugins, wrap: false })),
        ]) {
            expect(container.querySelectorAll('ol > :not(li)')).toHaveLength(0);
            expect([...container.querySelectorAll('ol > li')].map((li) => li.textContent)).toEqual([
                'one',
                'two',
                'three',
            ]);
            expect(container.querySelector('ol > li a')?.getAttribute('href')).toBe('https://example.com');
        }
        warn.mockRestore();
    });
});

describe('a link in a reading view and in export', () => {
    const NEW_TAB_NOTE = ' (opens in new tab)';
    const both = (doc: RteDocument, plugins: readonly RtePlugin[] = defaultPlugins): HTMLElement[] => [
        rendered(<RichTextRenderer value={doc} plugins={plugins} />),
        exported(serializeToHtml(doc, { plugins })),
    ];

    it('is written without its target when the policy refuses it', () => {
        const doc = paragraph([
            { text: 'out', link: { href: 'https://example.com' } },
            { text: 'in', link: { href: 'https://frontify.com' } },
        ]);

        for (const container of both(doc, [linkPlugin({ allowedHosts: ['frontify.com'] })])) {
            const [refused, allowed] = [...container.querySelectorAll('a')];
            expect(refused?.hasAttribute('href')).toBe(false);
            expect(allowed?.getAttribute('href')).toBe('https://frontify.com');
        }
    });

    it('says the new-tab note with the words a host passes', () => {
        const doc = paragraph([{ text: 'neu', link: { href: 'https://example.com', openInNewTab: true } }]);
        const plugins = [linkPlugin({ labels: { newTabNote: ' (öffnet in neuem Tab)' } })];

        const container = rendered(<RichTextRenderer value={doc} plugins={plugins} />);

        expect(container.querySelector('a')?.textContent).toBe('neu (öffnet in neuem Tab)');
    });

    it('says in the reading view that it opens in a new tab, after its text and inside the anchor, only when it does', () => {
        const doc = paragraph([
            { text: 'new', link: { href: 'https://example.com', openInNewTab: true } },
            { text: 'same', link: { href: 'https://example.com/b' } },
        ]);

        const container = rendered(<RichTextRenderer value={doc} />);
        const [newTab, sameTab] = [...container.querySelectorAll('a')];
        expect(newTab?.textContent).toBe(`new${NEW_TAB_NOTE}`);
        const note = newTab?.querySelector('span');
        expect(note?.textContent).toBe(NEW_TAB_NOTE);
        expect(note?.hasAttribute(NEW_TAB_NOTE_ATTRIBUTE)).toBe(true);
        expect(note?.classList.contains(linkStyles.visuallyHidden ?? '')).toBe(true);
        expect(newTab?.lastElementChild?.tagName).toBe('SPAN');
        expect(sameTab?.textContent).toBe('same');
        expect(sameTab?.querySelector('span')).toBeNull();
    });

    it('keeps a focused link in the reading view focused when its parent renders again with a new link plugin', () => {
        const doc = paragraph([{ text: 'docs', link: { href: 'https://example.com', openInNewTab: true } }]);
        const container = window.document.createElement('div');
        window.document.body.append(container);
        const root = createRoot(container);
        act(() => root.render(<RichTextRenderer value={doc} plugins={[linkPlugin()]} />));
        container.querySelector('a')?.focus();

        act(() => root.render(<RichTextRenderer value={doc} plugins={[linkPlugin()]} />));

        expect(window.document.activeElement).toBe(container.querySelector('a'));
        act(() => root.unmount());
        container.remove();
    });

    it('exports a link that opens a new tab with its target and rel, and no text of its own', () => {
        const doc = paragraph([{ text: 'new', link: { href: 'https://example.com', openInNewTab: true } }]);

        const anchor = exported(serializeToHtml(doc, { plugins: defaultPlugins })).querySelector('a');

        expect(anchor?.textContent).toBe('new');
        expect(anchor?.getAttribute('target')).toBe('_blank');
        expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
        expect(anchor?.querySelector('span')).toBeNull();
    });

    it('keeps one anchor for a link split across styled runs, with one note in the reading view', () => {
        const link = { href: 'https://example.com', openInNewTab: true as const };
        const doc = paragraph([
            { text: 'a ', link },
            { text: 'bold', link, bold: true },
        ]);
        const [reading, exportedHtml] = both(doc);

        expect(reading?.querySelectorAll('a')).toHaveLength(1);
        expect(reading?.textContent).toBe(`a bold${NEW_TAB_NOTE}`);
        expect(exportedHtml?.querySelectorAll('a')).toHaveLength(1);
        expect(exportedHtml?.textContent).toBe('a bold');
    });
});
