/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { type Node as PmNode } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    buildPluginRegistry,
    defineBlock,
    ANY_LIST,
    defineContent,
    definePlugin,
    PARAGRAPH,
    type RteBlockNode,
    type RtePlugin,
} from '#/core';

import { buildSchema } from './schema';
import { destroyEditors, editorWith, paragraph, shipped, slotSelection, text } from './testEditor';

// A grid of the spec's own, in generic names: an outer block of rows, each
// row of slots and header slots, each slot holding paragraphs.
const gridPlugin: RtePlugin = definePlugin({
    id: 'grid',
    content: defineContent({
        blocks: {
            outer: defineBlock({
                content: { parts: ['band'] },
                gridRole: 'grid',
                toHtml: () => ({ tag: 'div', attrs: { class: 'outer' }, children: true }),
                parse: [{ tag: 'div.outer' }],
            }),
            band: defineBlock({
                content: { parts: ['slot', 'headSlot'] },
                gridRole: 'row',
                toHtml: () => ({ tag: 'div', attrs: { class: 'band' }, children: true }),
                parse: [{ tag: 'div.band' }],
            }),
            slot: defineBlock<{ colspan: number; rowspan: number; colwidth: number[] | null }>({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                gridRole: 'slot',
                defaults: { colspan: 1, rowspan: 1, colwidth: null },
                toHtml: () => ({ tag: 'div', attrs: { class: 'slot' }, children: true }),
                parse: [{ tag: 'div.slot' }],
            }),
            headSlot: defineBlock({
                content: { blocks: [PARAGRAPH] },
                gridRole: 'headerSlot',
                toHtml: () => ({ tag: 'div', attrs: { class: 'head-slot' }, children: true }),
                parse: [{ tag: 'div.head-slot' }],
            }),
        },
    }),
});

const plugins: RtePlugin[] = [...shipped('history', 'bullet-list'), gridPlugin];

const slot = (label: string, spans: { colspan?: number; rowspan?: number } = {}): RteBlockNode =>
    ({
        type: 'slot',
        colspan: 1,
        rowspan: 1,
        ...spans,
        children: [paragraph(text(label))],
    }) as RteBlockNode;

const band = (...slots: RteBlockNode[]): RteBlockNode => ({ type: 'band', children: slots });

const grid = (...bands: RteBlockNode[]): RteBlockNode => ({ type: 'outer', children: bands });

const press = (view: EditorView, key: string, init: KeyboardEventInit = {}): boolean =>
    view.someProp('handleKeyDown', (handle) => handle(view, new KeyboardEvent('keydown', { key, ...init }))) === true;

/** Where the slot holding this text starts. */
const slotAt = (doc: PmNode, label: string): number => {
    let found = -1;
    doc.descendants((node, position) => {
        if (found === -1 && node.type.name === 'slot' && node.textContent === label) {
            found = position;
        }
        return found === -1;
    });
    return found;
};

/** The text of the slot the caret is in. */
const caretSlot = (view: EditorView): string => view.state.selection.$from.node(-1).textContent;

afterEach(destroyEditors);
afterEach(() => vi.restoreAllMocks());

describe('a block laid out as a grid', () => {
    it('gives each role its engine role, and isolates the grid and its slots', () => {
        const schema = buildSchema(buildPluginRegistry(plugins));

        expect(schema.nodes.outer?.spec.tableRole).toBe('table');
        expect(schema.nodes.band?.spec.tableRole).toBe('row');
        expect(schema.nodes.slot?.spec.tableRole).toBe('cell');
        expect(schema.nodes.headSlot?.spec.tableRole).toBe('header_cell');
        expect(schema.nodes.outer?.spec.isolating).toBe(true);
        expect(schema.nodes.slot?.spec.isolating).toBe(true);
    });

    it('gives a slot spans while editing even when it stores none', () => {
        const schema = buildSchema(buildPluginRegistry(plugins));

        expect(schema.nodes.headSlot?.create().attrs).toMatchObject({ colspan: 1, rowspan: 1, colwidth: null });
    });

    // A width left null is not stored, as any attribute at null is not.
    it('stores the spans a slot declares, and round-trips them', () => {
        const blocks = [grid(band(slot('a', { colspan: 2 }), slot('b')), band(slot('c'), slot('d'), slot('e')))];
        const editor = editorWith(plugins, blocks);
        editor.select('a');
        editor.type('A');

        expect(editor.stored()).toEqual([
            grid(band(slot('A', { colspan: 2 }), slot('b')), band(slot('c'), slot('d'), slot('e'))),
        ]);
    });
});

describe('a stored span out of range', () => {
    // The grid stays rectangular, so other rows grow to match a wide slot: the cap bounds how far.
    it('is read as 1 to 50, so one slot can grow the other rows that far and no further', () => {
        const editor = editorWith(plugins, [
            grid(band(slot('a', { colspan: 400 }), slot('b', { rowspan: 0 })), band(slot('c'), slot('d'))),
        ]);
        editor.select('a');
        editor.type('A');

        const outer = editor.view.state.doc.child(0);
        expect(outer.child(0).child(0).attrs).toMatchObject({ colspan: 50, rowspan: 1 });
        expect(outer.child(0).child(1).attrs).toMatchObject({ colspan: 1, rowspan: 1 });
        expect(outer.child(1).childCount).toBe(51);
    });
});

describe('the selection snapshot over a grid', () => {
    it('reports a caret in a slot as text', () => {
        const editor = editorWith(plugins, [grid(band(slot('a1'), slot('b1')))]);
        editor.caretAfter('b1');

        expect(editor.api.selection.get()).toMatchObject({ kind: 'text', grid: null });
    });

    it('reports selected slots by the rows and columns they cover, counted from 0', () => {
        const editor = editorWith(plugins, [
            grid(band(slot('a1'), slot('b1'), slot('c1')), band(slot('a2'), slot('b2'), slot('c2'))),
        ]);
        const { view } = editor;
        const { doc } = view.state;
        view.dispatch(view.state.tr.setSelection(slotSelection(doc, slotAt(doc, 'b1'), slotAt(doc, 'c2'))));

        const snapshot = editor.api.selection.get();

        expect(snapshot.kind).toBe('grid');
        expect(snapshot.grid).toEqual({ rows: { from: 0, to: 1 }, columns: { from: 1, to: 2 } });
        expect(snapshot.text).toBe('b1 c1 b2 c2');
    });

    it('counts every row and column a spanning slot covers', () => {
        const editor = editorWith(plugins, [
            grid(band(slot('a1', { rowspan: 2 }), slot('b1', { colspan: 2 })), band(slot('b2'), slot('c2'))),
        ]);
        const { view } = editor;
        const { doc } = view.state;
        view.dispatch(view.state.tr.setSelection(slotSelection(doc, slotAt(doc, 'c2'))));

        expect(editor.api.selection.get().grid).toEqual({ rows: { from: 1, to: 1 }, columns: { from: 2, to: 2 } });
    });
});

/** A slot holding a list of two items, the second reading `a1`. */
const listSlot = (): RteBlockNode =>
    ({
        type: 'slot',
        colspan: 1,
        rowspan: 1,
        children: [
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [paragraph(text('item'))] },
                    { type: 'listItem', children: [paragraph(text('a1'))] },
                ],
            },
        ],
    }) as RteBlockNode;

describe('Tab and Shift-Tab in a grid', () => {
    it('move to the next and the previous slot', () => {
        const editor = editorWith(plugins, [grid(band(slot('a1'), slot('b1')), band(slot('a2'), slot('b2')))]);
        editor.caretAfter('a1');

        expect(press(editor.view, 'Tab')).toBe(true);
        expect(caretSlot(editor.view)).toBe('b1');
        expect(press(editor.view, 'Tab')).toBe(true);
        expect(caretSlot(editor.view)).toBe('a2');
        expect(press(editor.view, 'Tab', { shiftKey: true })).toBe(true);
        expect(caretSlot(editor.view)).toBe('b1');
    });

    it('add a row on Tab in the last slot, as one undo step', () => {
        const editor = editorWith(plugins, [grid(band(slot('a1'), slot('b1')))]);
        editor.caretAfter('b1');

        expect(press(editor.view, 'Tab')).toBe(true);

        const outer = editor.view.state.doc.child(0);
        expect(outer.childCount).toBe(2);
        expect(editor.view.state.selection.$from.node(-2)).toBe(outer.child(1));
        editor.api.history.undo();
        expect(editor.view.state.doc.child(0).childCount).toBe(1);
    });

    it('leave Shift-Tab in the first slot to the browser, so focus can leave', () => {
        const editor = editorWith(plugins, [grid(band(slot('a1'), slot('b1')))]);
        editor.caretAfter('a1');

        expect(press(editor.view, 'Tab', { shiftKey: true })).toBe(false);
    });

    it('take Tab from a list inside a slot', () => {
        const editor = editorWith(plugins, [grid(band(listSlot(), slot('b1')))]);
        editor.caretAfter('a1');

        expect(press(editor.view, 'Tab')).toBe(true);
        expect(editor.view.state.selection.$from.parent.textContent).toBe('b1');
    });

    // Tab from that list moves to the next slot, so Shift-Tab must not outdent it either.
    it('leave Shift-Tab from a list in the first slot to the browser, not to the list', () => {
        const editor = editorWith(plugins, [grid(band(listSlot(), slot('b1')))]);
        editor.caretAfter('a1');
        const before = editor.view.state.doc;

        expect(press(editor.view, 'Tab', { shiftKey: true })).toBe(false);
        expect(editor.view.state.doc.eq(before)).toBe(true);
    });

    it('still outdent a list outside a grid', () => {
        const editor = editorWith(plugins, [
            {
                type: 'bulletList',
                children: [
                    {
                        type: 'listItem',
                        children: [
                            paragraph(text('item')),
                            {
                                type: 'bulletList',
                                children: [{ type: 'listItem', children: [paragraph(text('nested'))] }],
                            },
                        ],
                    },
                ],
            } as RteBlockNode,
        ]);
        editor.caretAfter('nested');

        expect(press(editor.view, 'Tab', { shiftKey: true })).toBe(true);
    });

    it('do nothing outside a grid', () => {
        const editor = editorWith(plugins, [paragraph(text('plain'))]);
        editor.caretAfter('plain');

        expect(press(editor.view, 'Tab')).toBe(false);
    });
});

describe('a selection of slots', () => {
    it('empties the selected slots on Backspace, and keeps the grid', () => {
        const editor = editorWith(plugins, [grid(band(slot('a1'), slot('b1')), band(slot('a2'), slot('b2')))]);
        const { view } = editor;
        const { doc } = view.state;
        view.dispatch(view.state.tr.setSelection(slotSelection(doc, slotAt(doc, 'a1'), slotAt(doc, 'a2'))));

        expect(press(view, 'Backspace')).toBe(true);
        const emptied = { ...slot(''), children: [paragraph()] } as RteBlockNode;
        expect(editor.stored()).toEqual([grid(band(emptied, slot('b1')), band(emptied, slot('b2')))]);
    });
});

describe('inserting a grid whole', () => {
    const headSlot = (): RteBlockNode => ({ type: 'headSlot', children: [paragraph()] });

    it('replaces an empty block and puts the caret in the first slot', () => {
        const editor = editorWith(plugins, [paragraph()]);

        editor.api.insert('outer', { children: [band(headSlot(), headSlot()), band(slot(''), slot(''))] });

        const outer = editor.view.state.doc.child(0);
        expect(outer.type.name).toBe('outer');
        expect(outer.child(0).child(0).type.name).toBe('headSlot');
        expect(outer.child(1).child(1).type.name).toBe('slot');
        expect(editor.view.state.selection.$from.node(-2)).toBe(outer.child(0));
        expect(editor.view.state.selection.$from.index(-2)).toBe(0);
    });

    it('goes after the block the caret is in when that block has text', () => {
        const editor = editorWith(plugins, [paragraph(text('before')), paragraph(text('after'))]);
        editor.caretAfter('bef');

        editor.api.insert('outer', { children: [band(slot('a'), slot('b'))] });

        const { doc } = editor.view.state;
        expect(doc.child(0).textContent).toBe('before');
        expect(doc.child(1).type.name).toBe('outer');
        expect(doc.child(2).textContent).toBe('after');
        expect(caretSlot(editor.view)).toBe('a');
    });

    it('replaces a selected top-level block', () => {
        const editor = editorWith(plugins, [paragraph(text('before')), paragraph(text('selected'))]);
        const { view } = editor;
        view.dispatch(
            view.state.tr.setSelection(NodeSelection.create(view.state.doc, view.state.doc.child(0).nodeSize)),
        );

        editor.api.insert('outer', { children: [band(slot('a'), slot('b'))] });

        const { doc } = view.state;
        expect(doc.childCount).toBe(2);
        expect(doc.child(0).textContent).toBe('before');
        expect(doc.child(1).type.name).toBe('outer');
        expect(caretSlot(view)).toBe('a');
    });

    it('goes after the grid the caret is in, never inside a slot', () => {
        const editor = editorWith(plugins, [grid(band(slot('a1'), slot('b1')))]);
        editor.caretAfter('a1');

        editor.api.insert('outer', { children: [band(slot('x'), slot('y'))] });

        const { doc } = editor.view.state;
        expect(doc.childCount).toBe(2);
        expect(doc.child(0).textContent).toBe('a1b1');
        expect(doc.child(1).textContent).toBe('xy');
        expect(caretSlot(editor.view)).toBe('x');
    });
});
