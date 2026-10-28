/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { NodeSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { createElement, createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { defineReactPresentation } from '#/entries/authoring';
import { RichTextReader } from '#/entries/reader';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { deDE } from '#/locales/de-DE';
import { type ContentNodeJSON } from '#/model';
import {
    columnBreak,
    layoutFeatures,
    layoutModel,
    mountLayout,
    onPlatform,
    press,
} from '#/plugins/__tests__/fixtures/layout';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { bulletList } from '#/plugins/BulletList/feature';
import { checkList } from '#/plugins/CheckList/feature';
import { listItem } from '#/plugins/ListItem/feature';
import { orderedList } from '#/plugins/OrderedList/feature';
import { para, storedIn, text } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
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
/** The columns of a surface with room for `count` of them, or too narrow for them. */
const room = (count: number, fits = true) => ({
    count,
    fits,
    label: 'Column break',
    inactiveLabel: 'Column break, inactive',
});

/** The three paragraphs of a brand page, with `breaks` column breaks after the first one. */
const pageWith = (breaks: number): ContentNodeJSON[] => [
    para(text('Primary')),
    ...Array.from({ length: breaks }, columnBreak),
    para(text('Secondary')),
];

/** The `data-rte-column-break`, `aria-label` and `aria-disabled` of each column break the surface shows. */
const shownBreaks = (surface: HTMLElement) =>
    [...surface.querySelectorAll('[data-rte-column-break]')].map((element) => [
        element.getAttribute('data-rte-column-break'),
        element.getAttribute('aria-label'),
        element.getAttribute('aria-disabled'),
    ]);
const ACTIVE = ['active', 'Column break', null];
const INACTIVE = ['inactive', 'Column break, inactive', null];

/** Starts a composition as the browser does, so ProseMirror's own handler sets `view.composing`, and composes `typed`. */
const compose = (view: EditorView, typed: string) => {
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    // ProseMirror marks the composed text it reads from the DOM with its composition ID.
    view.dispatch(view.state.tr.insertText(typed).setMeta('composition', 1));
};

/** Runs the microtask, then the 20 ms timer after which input has settled. */
const settleInput = async () => {
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(20);
};

/** A list of `type` whose one item holds `content`, as a snapshot writes it. */
const listOf = (type: 'bullet_list' | 'ordered_list' | 'task_list', content: ContentNodeJSON): ContentNodeJSON => {
    if (type === 'task_list') {
        return {
            type,
            content: [{ type: 'task_item', attrs: { nodeId: 'task-1', checked: false }, content: [content] }],
        };
    }

    return { type, content: [{ type: 'list_item', content: [content] }] };
};

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

    it('names each break Column break, inactive, with no aria-disabled, while the surface has no room for columns', () => {
        mountLayout({ columns: 2, blocks: pageWith(2) });

        const separators = screen.getAllByRole('separator', { name: 'Column break, inactive' });

        expect(separators).toHaveLength(2);
        for (const separator of separators) {
            expect(separator).not.toHaveAttribute('aria-disabled');
            expect(separator).toHaveAttribute('data-rte-column-break', 'inactive');
        }
    });

    it('labels the separator in the editor locale', () => {
        const mounted = mountLayout({ columns: 2, blocks: pageWith(1) });

        expect(mounted.view.dom.querySelector('[role="separator"]')).toHaveAttribute(
            'aria-label',
            'Column break, inactive',
        );
    });

    it('paints the breaks in the editor locale before the ready frame', () => {
        const model = layoutModel();
        const ref = createRef<EditorHandle>();
        const { container } = render(
            <RichTextEditor
                aria-label="Notizen"
                locale={deDE}
                definition={defineEditor({ id: 'test.layout', model, plugins: pluginsFor(model) })}
                presentation={defineReactPresentation({ columns: 3, toolbar: [] })}
                defaultValue={{ documentId: 'document-1', revision: null, document: storedIn(model, pageWith(1)) }}
                ref={ref}
            />,
        );
        const runtime = ref.current === null ? undefined : runtimeOf(ref.current);

        expect(runtime?.handle.getSummary().phase).toBe('mounting');
        expect(container.querySelector('[role="separator"]')).toHaveAttribute('aria-label', 'Spaltenumbruch, inaktiv');
    });

    it('activates the first columns minus one breaks while the surface has room, leaving later breaks inactive', () => {
        const mounted = mountLayout({ columns: 3, blocks: pageWith(3) });

        act(() => mounted.runtime.setColumns(room(3)));

        expect(shownBreaks(mounted.view.dom)).toEqual([ACTIVE, ACTIVE, INACTIVE]);
        act(() => mounted.runtime.setColumns(room(2)));
        expect(shownBreaks(mounted.view.dom)).toEqual([ACTIVE, INACTIVE, INACTIVE]);
    });

    it('marks every break inactive while the surface is too narrow for its columns', () => {
        const mounted = mountLayout({ columns: 3, blocks: pageWith(2) });

        act(() => mounted.runtime.setColumns(room(3, false)));

        expect(shownBreaks(mounted.view.dom)).toEqual([INACTIVE, INACTIVE]);
    });

    it('keeps the break decorations of a column change during a composition until input settles', async () => {
        const mounted = mountLayout({ columns: 2, blocks: pageWith(1) });
        setSelection(mounted.handle, { text: 'Primary', from: 7, to: 7 });
        act(() => compose(mounted.view, 'x'));

        act(() => mounted.runtime.setColumns(room(2)));
        // A later composed character redraws the view, which must still draw the columns from before.
        act(() => mounted.view.dispatch(mounted.view.state.tr.insertText('y').setMeta('composition', 1)));
        const composing = shownBreaks(mounted.view.dom);
        act(() => {
            mounted.view.dom.dispatchEvent(new CompositionEvent('compositionend'));
        });
        await act(settleInput);

        expect(composing).toEqual([INACTIVE]);
        expect(shownBreaks(mounted.view.dom)).toEqual([ACTIVE]);
    });

    it('measures a resize during a composition once input settles, changing nothing on the surface before', async () => {
        const observers: ResizeObserverCallback[] = [];
        vi.stubGlobal(
            'ResizeObserver',
            class {
                constructor(callback: ResizeObserverCallback) {
                    observers.push(callback);
                }
                observe() {}
                disconnect() {}
            },
        );
        const mounted = mountLayout({ columns: 2, columnGap: '16px', blocks: pageWith(1) });
        setSelection(mounted.handle, { text: 'Primary', from: 7, to: 7 });
        act(() => compose(mounted.view, 'x'));

        vi.spyOn(mounted.view.dom, 'clientWidth', 'get').mockReturnValue(1000);
        act(() => {
            for (const callback of observers) {
                callback([], {} as ResizeObserver);
            }
        });
        const composing = {
            fit: mounted.view.dom.hasAttribute('data-rte-columns-fit'),
            breaks: shownBreaks(mounted.view.dom),
        };
        act(() => {
            mounted.view.dom.dispatchEvent(new CompositionEvent('compositionend'));
        });
        await act(settleInput);
        vi.unstubAllGlobals();

        expect(composing).toEqual({ fit: false, breaks: [INACTIVE] });
        expect(mounted.view.dom).toHaveAttribute('data-rte-columns-fit', '');
        expect(shownBreaks(mounted.view.dom)).toEqual([ACTIVE]);
    });

    it('keeps the surface columns through a presentation change during a composition, and writes the new ones after', async () => {
        const mounted = mountLayout({ columns: 2, columnGap: '16px', blocks: pageWith(1) });
        act(() => compose(mounted.view, 'x'));
        act(() => mounted.rerenderWithColumns(3));
        const composing = mounted.view.dom.getAttribute('data-rte-columns');
        act(() => {
            mounted.view.dom.dispatchEvent(new CompositionEvent('compositionend'));
        });
        await act(settleInput);

        expect(composing).toBe('2');
        expect(mounted.view.dom).toHaveAttribute('data-rte-columns', '3');
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

    it.each(['bullet_list', 'ordered_list', 'task_list'] as const)(
        'removes a break with Backspace at the start of the %s item after it, as one undo step, leaving the list',
        (type) => {
            const model = layoutModel([...layoutFeatures(), listItem(), bulletList(), orderedList(), checkList()]);
            const blocks = [para(text('Before')), columnBreak(), listOf(type, para(text('After')))];
            const mounted = mountLayout({ model, columns: 2, blocks });
            setSelection(mounted.handle, { text: 'After', from: 0, to: 0 });
            const shape = () => mounted.blocks()?.map((block) => block.type);

            press(mounted, 'Backspace');
            const removed = shape();
            mounted.handle.execute('history.undo');

            expect(removed).toEqual(['paragraph', type]);
            expect(shape()).toEqual(['paragraph', 'column_break', type]);
        },
    );

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
                presentation: {
                    styles: [],
                    colorTokens: [],
                    columns: 3,
                    columnGap: '24px',
                    contentClassName: 'host-columns',
                },
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
                presentation: { styles: [], colorTokens: [], columns: 1 },
            }),
        );

        expect(markup).not.toContain('fondue-rte-columns');
        expect(markup).not.toContain('data-rte-column-break="active"');
    });

    it('writes a fixed column count and column-gap on the toHTML content root, with the active breaks breaking a column inline', () => {
        const model = layoutModel();
        const { html } = createCodecs(model).toHTML(storedIn(model, pageWith(2)), {
            columns: 2,
            columnGap: '2rem',
            contentClassName: 'host-columns',
        });

        expect(html).toMatchSnapshot();
        expect(html.startsWith('<div class="fondue-rte-content host-columns" style="columns:2;column-gap:2rem">')).toBe(
            true,
        );
        expect(html.match(/<div/g)?.length).toBe(3);
        expect(html.match(/break-after:column/g)).toHaveLength(1);
    });

    it.each([
        ['one column', { columns: 1 }],
        ['no columns', {}],
    ])('writes no columns style in toHTML with %s', (_case, options) => {
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

        expect(html.startsWith('<div class="fondue-rte-content" style="columns:2;column-gap:normal">')).toBe(true);
    });
});
