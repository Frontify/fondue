/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { NodeSelection } from 'prosemirror-state';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { columnBreak, layoutModel, mountLayout, onPlatform, press } from '#/features/__tests__/fixtures/layout';
import { type ContentNodeJSON } from '#/model';
import { para, storedIn, text } from '#/react/__tests__/fixtures/text';
import { RichTextReader } from '#/reader';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

const quoted = (...content: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'blockquote',
    content: [...content],
});
/** An empty paragraph as a snapshot writes it, with no `content`. */
const emptyParagraph = (): ContentNodeJSON => ({ type: 'paragraph', attrs: { lang: null } });
/** The columns of a surface with room for `count` of them. */
const room = (count: number) => ({ count, fits: true, label: 'Column break' });

/** The three paragraphs of a brand page, with `breaks` column breaks after the first one. */
const pageWith = (breaks: number): ContentNodeJSON[] => [
    para(text('Primary')),
    ...Array.from({ length: breaks }, columnBreak),
    para(text('Secondary')),
];

/** The `data-rte-column-break` and `aria-disabled` of each column break the surface shows. */
const shownBreaks = (surface: HTMLElement) =>
    [...surface.querySelectorAll('[data-rte-column-break]')].map((element) => [
        element.getAttribute('data-rte-column-break'),
        element.getAttribute('aria-disabled'),
    ]);

describe('layout.columns', () => {
    for (const apple of [true, false]) {
        const platform = apple ? 'an Apple platform with ⌘⇧Enter' : 'another platform with Ctrl+Shift+Enter';
        const own = apple ? { meta: true, shift: true } : { ctrl: true, shift: true };
        const foreign = apple ? { ctrl: true, shift: true } : { meta: true, shift: true };

        it(`inserts a column break after the top-level block that holds the selection end on ${platform}`, () => {
            onPlatform(apple);
            const mounted = mountLayout({
                columns: 2,
                blocks: [para(text('One')), quoted(para(text('Quoted')), para(text('More'))), para(text('Two'))],
            });
            setSelection(mounted.handle, { text: 'Quoted', from: 2, to: 2 });

            const prevented = press(mounted, 'Enter', own);

            expect(prevented).toBe(true);
            expect(mounted.blocks()).toEqual([
                para(text('One')),
                quoted(para(text('Quoted')), para(text('More'))),
                columnBreak(),
                para(text('Two')),
            ]);
            expect(mounted.changes.map(({ commandId }) => commandId)).toEqual(['column.break.insert']);
            expect(mounted.view.state.selection.$from.parent.textContent).toBe('Two');
        });

        it(`names the column break keys of ${platform} on the Column break toolbar item`, () => {
            onPlatform(apple);
            mountLayout({ columns: 2, blocks: [para(text('One'))], toolbar: [['column.break.insert']] });

            expect(screen.getByRole('button', { name: 'Column break' })).toHaveAttribute(
                'aria-keyshortcuts',
                apple ? 'Meta+Shift+Enter' : 'Control+Shift+Enter',
            );
        });

        it(`runs nothing with the other platform's column break keys on ${platform}`, () => {
            onPlatform(apple);
            const mounted = mountLayout({ columns: 2, blocks: [para(text('One')), para(text('Two'))] });
            setSelection(mounted.handle, { text: 'One', from: 1, to: 1 });

            press(mounted, 'Enter', foreign);

            expect(mounted.changes).toEqual([]);
            expect(mounted.blocks()).toEqual([para(text('One')), para(text('Two'))]);
        });
    }

    it('puts the break after the block where a selection across blocks ends, never splitting it', () => {
        const mounted = mountLayout({
            columns: 3,
            blocks: [para(text('One')), para(text('Two')), para(text('Three'))],
        });
        setSelection(mounted.handle, { text: 'One', from: 1, to: 1 });
        const { state } = mounted.view;
        const end = state.doc.child(0).nodeSize + 3;
        mounted.runtime.select({ anchor: 2, head: end });

        expect(mounted.handle.execute('column.break.insert').status).toBe('applied');

        expect(mounted.blocks()).toEqual([para(text('One')), para(text('Two')), columnBreak(), para(text('Three'))]);
    });

    it('adds an empty paragraph after a break inserted after the last block, with the caret in it', () => {
        const mounted = mountLayout({ columns: 2, blocks: [para(text('One'))] });
        setSelection(mounted.handle, { text: 'One', from: 3, to: 3 });

        mounted.handle.execute('column.break.insert');

        expect(mounted.blocks()).toEqual([para(text('One')), columnBreak(), emptyParagraph()]);
        expect(mounted.view.state.selection.$from.parent.content.size).toBe(0);
        expect(mounted.view.state.selection.$from.index(0)).toBe(2);
    });

    it('runs column.break.insert from the Column break toolbar item', async () => {
        const mounted = mountLayout({
            columns: 2,
            blocks: [para(text('One')), para(text('Two'))],
            toolbar: [['column.break.insert']],
        });
        setSelection(mounted.handle, { text: 'One', from: 1, to: 1 });

        await act(() => fireEvent.click(screen.getByRole('button', { name: 'Column break' })));

        expect(mounted.blocks()).toEqual([para(text('One')), columnBreak(), para(text('Two'))]);
        expect(mounted.changes.map(({ commandId }) => commandId)).toEqual(['column.break.insert']);
    });

    it.each([
        ['3 columns with 2 breaks', 3, 2],
        ['2 columns with 3 breaks', 2, 3],
        ['1 column and no break', 1, 0],
    ])('reports column.break.insert disabled and not applicable under %s', (_case, columns, breaks) => {
        const mounted = mountLayout({ columns, blocks: pageWith(breaks) });
        setSelection(mounted.handle, { text: 'Primary', from: 1, to: 1 });

        const queried = mounted.handle.query('column.break.insert');
        const executed = mounted.handle.execute('column.break.insert');

        expect(queried).toMatchObject({ enabled: false, disabledReason: 'not-applicable' });
        expect(executed).toEqual({ status: 'rejected', code: 'not-applicable' });
        expect(mounted.blocks()).toEqual(pageWith(breaks));
    });

    it('reports column.break.insert enabled while the document holds fewer breaks than the columns minus one', () => {
        const mounted = mountLayout({ columns: 3, blocks: pageWith(1) });
        setSelection(mounted.handle, { text: 'Primary', from: 1, to: 1 });

        expect(mounted.handle.query('column.break.insert')).toMatchObject({ enabled: true, disabledReason: null });
    });

    it('shows each break as a separator labelled Column break, inactive while the surface has no room for columns', () => {
        mountLayout({ columns: 2, blocks: pageWith(2) });

        const separators = screen.getAllByRole('separator', { name: 'Column break' });

        expect(separators).toHaveLength(2);
        for (const separator of separators) {
            expect(separator).toHaveAttribute('aria-disabled', 'true');
            expect(separator).toHaveAttribute('data-rte-column-break', 'inactive');
        }
    });

    it('labels the separator in the editor locale', () => {
        const mounted = mountLayout({ columns: 2, blocks: pageWith(1) });

        expect(mounted.view.dom.querySelector('[role="separator"]')).toHaveAttribute('aria-label', 'Column break');
    });

    it('activates the first columns minus one breaks while the surface has room, leaving later breaks inactive', () => {
        const mounted = mountLayout({ columns: 3, blocks: pageWith(3) });

        act(() => mounted.runtime.setColumns(room(3)));

        expect(shownBreaks(mounted.view.dom)).toEqual([
            ['active', null],
            ['active', null],
            ['inactive', 'true'],
        ]);
        act(() => mounted.runtime.setColumns(room(2)));
        expect(shownBreaks(mounted.view.dom)).toEqual([
            ['active', null],
            ['inactive', 'true'],
            ['inactive', 'true'],
        ]);
    });

    it('marks every break inactive while the surface is too narrow for its columns', () => {
        const mounted = mountLayout({ columns: 3, blocks: pageWith(2) });

        act(() => mounted.runtime.setColumns({ count: 3, fits: false, label: 'Column break' }));

        expect(shownBreaks(mounted.view.dom)).toEqual([
            ['inactive', 'true'],
            ['inactive', 'true'],
        ]);
    });

    it('writes the presentation columns and gap on the surface', () => {
        const mounted = mountLayout({ columns: 3, columnGap: '2rem', blocks: pageWith(1) });

        expect(mounted.view.dom).toHaveAttribute('data-rte-columns', '3');
        expect(mounted.view.dom.style.getPropertyValue('--rte-columns')).toBe('3');
        expect(mounted.view.dom.style.getPropertyValue('--rte-column-gap')).toBe('2rem');
    });

    it('writes no columns on the surface under one column', () => {
        const mounted = mountLayout({ columns: 1, blocks: pageWith(1) });

        expect(mounted.view.dom).not.toHaveAttribute('data-rte-columns');
        expect(mounted.view.dom.style.getPropertyValue('--rte-columns')).toBe('');
    });

    it('removes a break with Backspace right after it, as one undo step', () => {
        const mounted = mountLayout({ columns: 2, blocks: pageWith(1) });
        setSelection(mounted.handle, { text: 'Secondary', from: 0, to: 0 });

        press(mounted, 'Backspace');
        const removed = mounted.blocks();
        mounted.handle.execute('history.undo');

        expect(removed).toEqual(pageWith(0));
        expect(mounted.blocks()).toEqual(pageWith(1));
    });

    it('removes a break with Backspace from the empty paragraph after it, which the base keymap would select', () => {
        const blocks = [para(text('Primary')), columnBreak(), para()];
        const mounted = mountLayout({ columns: 2, blocks });
        mounted.runtime.select({
            anchor: mounted.view.state.doc.content.size - 1,
            head: mounted.view.state.doc.content.size - 1,
        });

        press(mounted, 'Backspace');

        expect(mounted.blocks()).toEqual([para(text('Primary')), emptyParagraph()]);
    });

    it('removes a node-selected break with Delete, as one undo step', () => {
        const mounted = mountLayout({ columns: 2, blocks: pageWith(1) });
        const at = mounted.view.state.doc.child(0).nodeSize;
        mounted.view.dispatch(mounted.view.state.tr.setSelection(NodeSelection.create(mounted.view.state.doc, at)));

        press(mounted, 'Delete');
        const removed = mounted.blocks();
        mounted.handle.execute('history.undo');

        expect(removed).toEqual(pageWith(0));
        expect(mounted.blocks()).toEqual(pageWith(1));
    });

    it('opens a document with three breaks under two columns without changing or removing any break', () => {
        const mounted = mountLayout({ columns: 2, blocks: pageWith(3) });

        act(() => mounted.runtime.setColumns(room(2)));
        mounted.rerenderWithColumns(1);
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        expect(mounted.changes).toEqual([]);
        expect(mounted.handle.getSummary().commitSequence).toBe(0);
        expect(mounted.handle.getSnapshot().document.content).toEqual(mounted.document.content);
    });

    it('renders the reader as N columns in a container, with the first N - 1 breaks active', () => {
        const model = layoutModel();
        const markup = renderToStaticMarkup(
            createElement(RichTextReader, {
                document: storedIn(model, pageWith(3)),
                model,
                presentation: { columns: 3, columnGap: '24px', contentClassName: 'host-columns' },
            }),
        );

        expect(markup).toMatchSnapshot();
        expect(markup.match(/data-rte-column-break="active"/g)).toHaveLength(2);
    });

    it('renders the reader with no column container under one column', () => {
        const model = layoutModel();
        const markup = renderToStaticMarkup(
            createElement(RichTextReader, {
                document: storedIn(model, pageWith(1)),
                model,
                presentation: { columns: 1 },
            }),
        );

        expect(markup).not.toContain('fondue-rte-columns');
        expect(markup).not.toContain('data-rte-column-break="active"');
    });

    it('writes the columns and column-gap wrapper in toHTML, with the active breaks breaking a column inline', () => {
        const model = layoutModel();
        const { html } = createCodecs(model).toHTML(storedIn(model, pageWith(2)), { columns: 2, columnGap: '2rem' });

        expect(html).toMatchSnapshot();
        expect(html.startsWith('<div style="columns:2;column-gap:2rem"><div class="fondue-rte-content">')).toBe(true);
        expect(html.match(/break-after:column/g)).toHaveLength(1);
    });

    it.each([
        ['one column', { columns: 1 }],
        ['no columns', {}],
    ])('writes no wrapper in toHTML with %s', (_case, options) => {
        const model = layoutModel();
        const { html } = createCodecs(model).toHTML(storedIn(model, pageWith(1)), options);

        expect(html.startsWith('<div class="fondue-rte-content">')).toBe(true);
    });

    it('writes column-gap normal for a gap that is no px or rem length, so no style text reaches the output', () => {
        const model = layoutModel();
        const { html } = createCodecs(model).toHTML(storedIn(model, pageWith(1)), {
            columns: 2,
            columnGap: '1px;background:red',
        });

        expect(html.startsWith('<div style="columns:2;column-gap:normal">')).toBe(true);
    });
});
