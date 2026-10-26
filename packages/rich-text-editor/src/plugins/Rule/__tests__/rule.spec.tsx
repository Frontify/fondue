/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { NodeSelection } from 'prosemirror-state';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { RichTextReader } from '#/entries/reader';
import { type ContentNodeJSON } from '#/model';
import { columns, core, quote } from '#/plugins';
import {
    columnBreak,
    horizontalRule,
    image,
    layoutModel,
    mountLayout,
    press,
} from '#/plugins/__tests__/fixtures/layout';
import { para, storedIn, text } from '#/react/__tests__/fixtures/text';
import { setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const emptyParagraph = (): ContentNodeJSON => ({ type: 'paragraph', attrs: { lang: null } });
const quoted = (...content: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'blockquote',
    content: [...content],
});

/** Puts the caret in the document's last empty paragraph. */
const caretInEmptyParagraph = ({ view, runtime }: ReturnType<typeof mountLayout>) => {
    let at = 0;
    view.state.doc.descendants((node, pos) => {
        if (node.type.name === 'paragraph' && node.content.size === 0) {
            at = pos + 1;
        }
    });
    runtime.select({ anchor: at, head: at });
};

describe('blocks.rule', () => {
    it('inserts a horizontal rule after the paragraph that holds the caret, with the caret in the next block', () => {
        const mounted = mountLayout({ blocks: [para(text('Logo')), para(text('Colour'))] });
        setSelection(mounted.handle, { text: 'Logo', from: 2, to: 2 });

        expect(mounted.handle.execute('rule.insert').status).toBe('applied');

        expect(mounted.blocks()).toEqual([para(text('Logo')), horizontalRule(), para(text('Colour'))]);
        expect(mounted.view.state.selection.$from.parent.textContent).toBe('Colour');
    });

    it.each([
        ['a column break', columnBreak()],
        ['an image', image('asset-1')],
    ])('puts a gap cursor after a rule inserted before %s, so typing adds a paragraph and keeps it', (_name, leaf) => {
        const mounted = mountLayout({ columns: 2, blocks: [para(text('Logo')), leaf, para(text('Colour'))] });
        setSelection(mounted.handle, { text: 'Logo', from: 4, to: 4 });

        mounted.handle.execute('rule.insert');
        const kind = mounted.handle.getSummary().selection.kind;
        typeText(mounted.handle, 'x');

        expect(kind).toBe('gap');
        expect(mounted.blocks()).toEqual([
            para(text('Logo')),
            horizontalRule(),
            para(text('x')),
            leaf,
            para(text('Colour')),
        ]);
    });

    it('adds an empty paragraph after a rule that ends up last, with the caret in it', () => {
        const mounted = mountLayout({ blocks: [para(text('Logo'))] });
        setSelection(mounted.handle, { text: 'Logo', from: 4, to: 4 });

        mounted.handle.execute('rule.insert');
        typeText(mounted.handle, 'Next');

        expect(mounted.blocks()).toEqual([para(text('Logo')), horizontalRule(), para(text('Next'))]);
    });

    it('turns the empty paragraph that holds the caret into the rule', () => {
        const mounted = mountLayout({ blocks: [para(text('Logo')), para(), para(text('Colour'))] });
        caretInEmptyParagraph(mounted);

        mounted.handle.execute('rule.insert');

        expect(mounted.blocks()).toEqual([para(text('Logo')), horizontalRule(), para(text('Colour'))]);
    });

    it('puts the rule before a paragraph with the caret at its start', () => {
        const mounted = mountLayout({ blocks: [para(text('Logo')), para(text('Colour'))] });
        setSelection(mounted.handle, { text: 'Colour', from: 0, to: 0 });

        mounted.handle.execute('rule.insert');

        expect(mounted.blocks()).toEqual([para(text('Logo')), horizontalRule(), para(text('Colour'))]);
    });

    it('inserts the rule inside the quote that holds the caret', () => {
        const mounted = mountLayout({ blocks: [quoted(para(text('Quoted')))] });
        setSelection(mounted.handle, { text: 'Quoted', from: 6, to: 6 });

        mounted.handle.execute('rule.insert');

        expect(mounted.blocks()).toEqual([quoted(para(text('Quoted')), horizontalRule(), emptyParagraph())]);
    });

    it('runs rule.insert from the Divider toolbar item', async () => {
        const mounted = mountLayout({ blocks: [para(text('Logo'))], toolbar: [['rule.insert']] });
        setSelection(mounted.handle, { text: 'Logo', from: 4, to: 4 });

        await act(() => fireEvent.click(screen.getByRole('button', { name: 'Divider' })));

        expect(mounted.blocks()).toEqual([para(text('Logo')), horizontalRule(), emptyParagraph()]);
        expect(mounted.changes.map(({ commandId }) => commandId)).toEqual(['rule.insert']);
    });

    it.each(['---', '***', '___'])('turns %s and a space at the start of a paragraph into a rule', (marker) => {
        const mounted = mountLayout({ blocks: [para(text('Logo')), para()] });
        caretInEmptyParagraph(mounted);

        typeText(mounted.handle, `${marker} `);
        typeText(mounted.handle, 'Next');

        expect(mounted.blocks()).toEqual([para(text('Logo')), horizontalRule(), para(text('Next'))]);
    });

    it('keeps --- and a space as text when the rule is excluded, its feature is missing or the policy forbids it', () => {
        const typed = [para(text('Logo')), para(text('--- '))];
        const excluded = mountLayout({ blocks: [para(text('Logo')), para()], excludeRules: ['rule.dashes'] });
        caretInEmptyParagraph(excluded);
        typeText(excluded.handle, '--- ');
        const missing = mountLayout({
            model: layoutModel([core(), quote(), columns()]),
            blocks: [para(text('Logo')), para()],
        });
        caretInEmptyParagraph(missing);
        typeText(missing.handle, '--- ');
        const forbidden = mountLayout({
            blocks: [para(text('Logo')), para()],
            policy: { features: { 'blocks.rule': { create: false, edit: true, remove: true, paste: true } } },
        });
        caretInEmptyParagraph(forbidden);
        typeText(forbidden.handle, '--- ');

        expect(excluded.blocks()).toEqual(typed);
        expect(missing.blocks()).toEqual(typed);
        expect(forbidden.blocks()).toEqual(typed);
    });

    it('renders a rule as hr in the reader and toHTML', () => {
        const model = layoutModel();
        const document = storedIn(model, [para(text('Logo')), horizontalRule(), para(text('Colour'))]);

        const markup = renderToStaticMarkup(createElement(RichTextReader, { document, model }));

        expect(markup).toMatchSnapshot();
        expect(markup).toContain('<hr dir="auto"/>');
        expect(createCodecs(model).toHTML(document).html).toBe(markup);
    });
});

describe('leaf blocks', () => {
    // An image is selected inside its figure, which goes with it.
    it.each([
        ['a horizontal rule', horizontalRule(), 0],
        ['an image', image('asset-1'), 1],
        ['a column break', columnBreak(), 0],
    ])(
        'removes %s that is node-selected with Backspace and with Delete, each as one undo step',
        (_name, leaf, inside) => {
            const blocks = [para(text('Before')), leaf, para(text('After'))];
            const removed = ['Backspace', 'Delete'].map((key) => {
                const mounted = mountLayout({ columns: 2, blocks });
                const at = mounted.view.state.doc.child(0).nodeSize + inside;
                mounted.view.dispatch(
                    mounted.view.state.tr.setSelection(NodeSelection.create(mounted.view.state.doc, at)),
                );

                press(mounted, key);
                const after = mounted.blocks();
                mounted.handle.execute('history.undo');
                const undone = mounted.blocks();
                mounted.unmount();

                return { after, undone };
            });

            for (const { after, undone } of removed) {
                expect(after).toEqual([para(text('Before')), para(text('After'))]);
                expect(undone).toEqual(blocks);
            }
        },
    );
});
