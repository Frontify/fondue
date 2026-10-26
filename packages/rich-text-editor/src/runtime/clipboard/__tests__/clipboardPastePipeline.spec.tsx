/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { Transform } from 'prosemirror-transform';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    blockquote,
    bulletList,
    cell,
    heading,
    link,
    listItem,
    mark,
    mention,
    node,
    paragraph,
    row,
    table,
    text,
} from '#/features/__tests__/fixtures/documents';
import { compileContentModel, defineFeature, type JsonValue, type ResourceLimits } from '#/model';
import { loadMarkdownReader } from '#/runtime/clipboard/markdown';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { setSelection } from '#/testing';

import {
    features,
    model,
    ALLOW,
    mount,
    pasteInto,
    copyFrom,
    selectAll,
    caretAtEnd,
    slicePayload,
    nodeIdsOf,
} from '../../import/__tests__/fixtures/mount';

// Paste reads Markdown only after an editor's first idle moment, which these synchronous cases do not wait for.
beforeAll(loadMarkdownReader);

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('the paste pipeline', () => {
    it('drops the content of a feature with paste: false and keeps its text', () => {
        const policy = {
            features: { 'fixture.link': { ...ALLOW, paste: false }, 'fixture.blocks': { ...ALLOW, paste: false } },
        };
        const mounted = mount({ blocks: [paragraph()], policy });
        const payload = slicePayload([
            heading('h-1', text('Title')),
            blockquote(paragraph(text('see ', mark('bold')), text('guide', link('https://frontify.com')))),
        ]);

        pasteInto(mounted, { [SLICE_TYPE]: payload, 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([
            paragraph(text('Title')),
            paragraph(text('see ', mark('bold')), text('guide')),
        ]);
        mounted.unmount();
    });

    it('keeps the item and cell texts of lists and tables with paste: false as paragraphs', () => {
        const policy = {
            features: { 'fixture.lists': { ...ALLOW, paste: false }, 'fixture.tables': { ...ALLOW, paste: false } },
        };
        const mounted = mount({ blocks: [paragraph()], policy });
        const payload = slicePayload([
            bulletList(listItem(paragraph(text('one'))), listItem(paragraph(text('two')))),
            table('t-1', row(cell({}, paragraph(text('c1'))), cell({}, paragraph(text('c2'))))),
        ]);

        pasteInto(mounted, { [SLICE_TYPE]: payload, 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([
            paragraph(text('one')),
            paragraph(text('two')),
            paragraph(text('c1')),
            paragraph(text('c2')),
        ]);
        mounted.unmount();
    });

    it('unwraps the children of a refused container whose items belong to a feature that stays', () => {
        const requires = [{ id: 'core', version: 1 }];
        const shelf = defineFeature({
            id: 'fixture.shelf',
            version: 1,
            requires,
            nodes: { shelf: { group: 'block', content: 'shelf_item+', attrs: {}, html: ['div', 0], parse: [] } },
        });
        const shelfItem = defineFeature({
            id: 'fixture.shelf-item',
            version: 1,
            requires,
            nodes: { shelf_item: { content: 'paragraph block*', attrs: {}, html: ['div', 0], parse: [] } },
        });
        const editorModel = compileContentModel([...features, shelf(), shelfItem()], {
            id: 'fixture.vocabulary',
            version: 1,
        });
        const mounted = mount({
            blocks: [paragraph()],
            editorModel,
            policy: { features: { 'fixture.shelf': { ...ALLOW, paste: false } } },
        });
        const payload = slicePayload(
            [
                node(
                    'shelf',
                    {},
                    node('shelf_item', undefined, paragraph(text('one'))),
                    node('shelf_item', undefined, paragraph(text('two'))),
                ),
            ],
            { requiredCapabilities: editorModel.capabilities.map(({ id, version }) => ({ id, version })) },
        );

        pasteInto(mounted, { [SLICE_TYPE]: payload, 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([paragraph(text('one')), paragraph(text('two'))]);
        mounted.unmount();
    });

    it('pastes a refused mention as its label and a refused image leaf as nothing', () => {
        const policy = {
            features: { 'fixture.mention': { ...ALLOW, paste: false }, 'fixture.media': { ...ALLOW, paste: false } },
        };
        const mounted = mount({ blocks: [paragraph()], policy, sliceContext: 'a' });
        const payload = slicePayload(
            [
                paragraph(text('Hi '), mention('m-1')),
                node('embed', { nodeId: 'e-1', url: 'https://frontify.com/x' }),
                node('figure', { nodeId: 'f-1' }, paragraph(text('cap'))),
            ],
            { context: 'a' },
        );

        pasteInto(mounted, { [SLICE_TYPE]: payload, 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([paragraph(text('Hi Ada')), paragraph(text('cap'))]);
        mounted.unmount();
    });

    // Each slice passes the limit on its own and exceeds it once inserted at the caret in `ab`.
    const limitRows: readonly [keyof ResourceLimits, number, JsonValue, JsonValue][] = [
        ['maxDocumentNodes', 8, paragraph(text('ab')), slicePayload([paragraph(text('x')), paragraph(text('y'))])],
        ['maxDepth', 4, blockquote(paragraph(text('ab'))), slicePayload([blockquote(paragraph(text('x')))])],
        [
            'maxTableCells',
            2,
            table('t-1', row(cell({}, paragraph(text('ab'))), cell({}, paragraph(text('cd'))))),
            slicePayload([table('t-2', row(cell({}, paragraph(text('x')))), row(cell({}, paragraph(text('y')))))], {
                openStart: 4,
                openEnd: 4,
            }),
        ],
    ];
    it.each(limitRows)('inserts a slice that lands exactly on %s', (limit, value, block, payload) => {
        const mounted = mount({ blocks: [block], limits: { [limit]: value + 1 } });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });
        const before = mounted.view.state.doc;

        pasteInto(mounted, { [SLICE_TYPE]: payload as string, 'text/plain': 'x' });

        expect(mounted.view.state.doc).not.toBe(before);
        expect(mounted.diagnostics).toEqual([]);
        expect(mounted.changes.map(({ origin }) => origin)).toEqual(['paste']);
        mounted.unmount();
    });

    it.each(limitRows)(
        'rejects a slice over %s once inserted, with the state unchanged',
        (limit, value, block, payload) => {
            const mounted = mount({ blocks: [block], limits: { [limit]: value } });
            setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });
            const before = mounted.view.state;

            pasteInto(mounted, { [SLICE_TYPE]: payload as string, 'text/plain': 'x' });

            expect(mounted.view.state.doc).toBe(before.doc);
            expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
            expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
                ['clipboard.paste-rejected', { reason: limit }],
            ]);
            mounted.unmount();
        },
    );

    it('keeps pasted text as typed when its Markdown conversion would pass maxDepth once inserted', () => {
        const mounted = mount({ blocks: [blockquote(paragraph(text('ab')))], limits: { maxDepth: 5 } });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });

        pasteInto(mounted, { 'text/plain': '- x' });

        expect(mounted.content()).toEqual([blockquote(paragraph(text('a- xb')))]);
        expect(mounted.changes.map(({ origin }) => origin)).toEqual(['paste']);
        mounted.unmount();
    });

    it.each([
        ['on its own', 'x'.repeat(20)],
        ['joined to the text around the caret', 'x'.repeat(9)],
    ])('rejects pasted text over maxTextLength %s, with the state unchanged', (_name, pasted) => {
        const mounted = mount({ limits: { maxTextLength: 10 } });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const before = mounted.view.state;

        pasteInto(mounted, { 'text/plain': pasted });

        expect(mounted.view.state.doc).toBe(before.doc);
        expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
        expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['clipboard.paste-rejected', { reason: 'maxTextLength' }],
        ]);
        mounted.unmount();
    });

    it('inserts plain text that lands exactly on maxDocumentBytes, and reports maxDocumentBytes one byte below', () => {
        const literal = mount();
        setSelection(literal.handle, { text: 'a', from: 1, to: 1 });
        pasteInto(literal, { 'text/plain': 'xyz' });
        // The commit check lists every installed capability, the most the encoder can write.
        const installed = model.capabilities.map(({ id }) => id).sort();
        const { document } = literal.handle.getSnapshot();
        const written = { ...document, requiredCapabilities: installed.map((id) => ({ id, version: 1 })) };
        const bytes = new TextEncoder().encode(JSON.stringify(written)).byteLength;
        literal.unmount();

        const exact = mount({ limits: { maxDocumentBytes: bytes } });
        setSelection(exact.handle, { text: 'a', from: 1, to: 1 });
        pasteInto(exact, { 'text/plain': 'xyz' });
        const inserted = exact.content();
        const accepted = exact.diagnostics;
        exact.unmount();
        const below = mount({ limits: { maxDocumentBytes: bytes - 1 } });
        setSelection(below.handle, { text: 'a', from: 1, to: 1 });
        const before = below.view.state.doc;
        pasteInto(below, { 'text/plain': 'xyz' });

        expect(inserted).toEqual([paragraph(text('axyzb'))]);
        expect(accepted).toEqual([]);
        expect(below.view.state.doc).toBe(before);
        expect(below.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['clipboard.paste-rejected', { reason: 'maxDocumentBytes' }],
        ]);
        below.unmount();
    });

    it('keeps pasted Markdown as typed when its conversion would pass maxDocumentBytes', () => {
        const literal = mount();
        setSelection(literal.handle, { text: 'a', from: 1, to: 1 });
        pasteInto(literal, { 'text/plain': '**x**', 'text/html': '<p>**x**</p>' });
        // The commit check lists every installed capability, the most the encoder can write.
        const installed = model.capabilities.map(({ id }) => id).sort();
        const { document } = literal.handle.getSnapshot();
        const written = { ...document, requiredCapabilities: installed.map((id) => ({ id, version: 1 })) };
        const bytes = new TextEncoder().encode(JSON.stringify(written)).byteLength;
        literal.unmount();
        const mounted = mount({ limits: { maxDocumentBytes: bytes + 2 } });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pasteInto(mounted, { 'text/plain': '**x**' });

        expect(mounted.content()).toEqual([paragraph(text('a**x**b'))]);
        mounted.unmount();
    });

    /** The bytes of the document after pasting `data` at the caret after `a`, as the commit check counts them. */
    const bytesAfter = (data: Readonly<Record<string, string>>) => {
        const literal = mount();
        setSelection(literal.handle, { text: 'a', from: 1, to: 1 });
        pasteInto(literal, data);
        const installed = model.capabilities.map(({ id }) => id).sort();
        const { document } = literal.handle.getSnapshot();
        const written = { ...document, requiredCapabilities: installed.map((id) => ({ id, version: 1 })) };
        literal.unmount();

        return new TextEncoder().encode(JSON.stringify(written)).byteLength;
    };

    it('keeps pasted Markdown as typed when only the nodeIds of its conversion pass maxDocumentBytes', () => {
        // Headings carry a `nodeId`; the list items of this vocabulary do not.
        const markdown = '# a\n# b\n# c';
        const mounted = mount({ limits: { maxDocumentBytes: bytesAfter({ 'text/plain': markdown }) - 1 } });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pasteInto(mounted, { 'text/plain': markdown });

        expect(mounted.content()).toEqual([paragraph(text('a# a')), paragraph(text('# b')), paragraph(text('# cb'))]);
        mounted.unmount();
    });

    it('reports maxDocumentBytes for a slice that passes it only once its nodeIds are filled', () => {
        const data = { [SLICE_TYPE]: slicePayload([heading('h-1', text('T'))]) };
        const mounted = mount({ limits: { maxDocumentBytes: bytesAfter(data) - 1 } });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const before = mounted.view.state.doc;

        pasteInto(mounted, data);

        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['clipboard.paste-rejected', { reason: 'maxDocumentBytes' }],
        ]);
        mounted.unmount();
    });

    it('gives each paste of one slice new nodeIds and keeps the resource ID', () => {
        const mounted = mount({ blocks: [heading('h-1', text('T'), mention('m-1')), paragraph()], sliceContext: 'a' });
        selectAll(mounted);
        const { slice } = copyFrom(mounted);
        caretAtEnd(mounted);

        pasteInto(mounted, { [SLICE_TYPE]: slice });
        pasteInto(mounted, { [SLICE_TYPE]: slice });

        const headings = (mounted.content() as { type: string }[]).filter(({ type }) => type === 'heading');
        const sets = headings.map((block) => nodeIdsOf(block));
        expect(sets.map((set) => set.length)).toEqual([2, 2, 2]);
        expect(new Set(sets.flat()).size).toBe(6);
        expect(JSON.stringify(headings).match(/"resourceType":"user","resourceId":"u-1"/g)).toHaveLength(3);
        mounted.unmount();
    });

    /** A slice payload of `count` headings, each of which takes a new `nodeId` once pasted. */
    const headings = (count: number) =>
        slicePayload(Array.from({ length: count }, (_, index) => heading(`h-${index}`, text('T'))));

    it('rejects a paste over maxDocumentNodes once inserted before it draws a nodeId', () => {
        let drawn = 0;
        // 41 nodes, and the slice's 20 pass the limit on their own.
        const mounted = mount({
            blocks: Array.from({ length: 20 }, () => paragraph(text('ab'))),
            limits: { maxDocumentNodes: 50 },
            generateId: () => {
                drawn += 1;

                return `n-${drawn}`;
            },
        });
        setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });
        drawn = 0;

        pasteInto(mounted, { [SLICE_TYPE]: headings(10) });

        expect(mounted.diagnostics.map(({ details }) => details)).toEqual([{ reason: 'maxDocumentNodes' }]);
        expect(drawn).toBe(0);
        mounted.unmount();
    });

    it('converts pasted Markdown whose plain text alone would pass maxDocumentNodes', () => {
        // As typed, the six lines take 13 nodes; converted, the code block takes 3.
        const mounted = mount({ blocks: [paragraph()], limits: { maxDocumentNodes: 10 } });
        caretAtEnd(mounted);

        pasteInto(mounted, { 'text/plain': '```\na\nb\nc\nd\n```' });

        expect(mounted.diagnostics).toEqual([]);
        expect(mounted.content()).toEqual([node('code_block', { languageId: null }, text('a\nb\nc\nd'))]);
        mounted.unmount();
    });

    it('fills the nodeIds of a pasted slice in as many steps for 200 headings as for 2', () => {
        const stepsFor = (count: number) => {
            const mounted = mount();
            caretAtEnd(mounted);
            const step = vi.spyOn(Transform.prototype, 'step');

            pasteInto(mounted, { [SLICE_TYPE]: headings(count) });

            const steps = step.mock.calls.length;
            step.mockRestore();
            expect(new Set(nodeIdsOf(mounted.content())).size).toBe(count);
            mounted.unmount();

            return steps;
        };

        expect(stepsFor(200)).toBe(stepsFor(2));
    });

    it('applies an accepted paste to the state once', () => {
        const mounted = mount();
        caretAtEnd(mounted);
        const apply = vi.spyOn(EditorState.prototype, 'applyTransaction');

        pasteInto(mounted, { [SLICE_TYPE]: headings(2) });

        expect(nodeIdsOf(mounted.content())).toHaveLength(2);
        expect(apply).toHaveBeenCalledTimes(1);
        mounted.unmount();
    });
});
