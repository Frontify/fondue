/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import MarkdownIt from 'markdown-it';
import { DOMParser as SchemaParser } from 'prosemirror-model';
import { AllSelection, NodeSelection, Selection } from 'prosemirror-state';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { fixtureChromeViews } from '#/features/__fixtures__/chrome/view';
import { fixtureCodeBlockView } from '#/features/__fixtures__/code-block/view';
import {
    blockquote,
    bulletList,
    cell,
    doc,
    envelope,
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
} from '#/features/__fixtures__/documents';
import { fixtureMedia } from '#/features/__fixtures__/features';
import { fixtureMediaImageView } from '#/features/__fixtures__/media/view';
import { fixtureTableBlockView } from '#/features/__fixtures__/table/view';
import {
    vocabularyAlign,
    vocabularyBlocks,
    vocabularyIndent,
    vocabularyLink,
    vocabularyLists,
    vocabularyMarks,
    vocabularyMention,
    vocabularyStyles,
    vocabularyTables,
} from '#/features/__fixtures__/vocabulary';
import { core } from '#/features/core/feature';
import {
    compileContentModel,
    type ContentModel,
    defineFeature,
    type Diagnostic,
    type JsonValue,
    type ResourceLimits,
} from '#/model';
import { defineEditor, defineReactPresentation } from '#/react/define';
import { RichTextEditor } from '#/react/rich-text-editor';
import { type EditorHandle } from '#/react/types';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { type AuthoringPolicy, type DocumentChange } from '#/runtime/types';
import { createTestEnvironment, setSelection } from '#/testing';

import { SLICE_TYPE } from './slice';

// The vocabulary stand-ins the engine can build, with a figure whose caption it can fill.
const features = [
    core(),
    vocabularyStyles(),
    vocabularyAlign(),
    vocabularyIndent(),
    vocabularyBlocks(),
    vocabularyLists(),
    vocabularyTables(),
    fixtureMedia(),
    vocabularyMention(),
    vocabularyMarks(),
    vocabularyLink(),
];
const model = compileContentModel(features, { id: 'fixture.vocabulary', version: 1 });
const ALLOW = { create: true, edit: true, remove: true, paste: true };
const MIB = 1024 * 1024;

interface Options {
    readonly blocks?: readonly JsonValue[];
    readonly sliceContext?: string | null;
    readonly policy?: Partial<AuthoringPolicy>;
    readonly limits?: Partial<ResourceLimits>;
    readonly editorModel?: ContentModel;
    readonly readOnly?: boolean;
}

/** Mounts an editor of the vocabulary stand-ins, ready, with its view, diagnostics, changes and live region. */
const mount = (options?: Options) => {
    let given: Options = {};
    if (options !== undefined) {
        given = options;
    }
    const {
        blocks = [paragraph(text('ab'))],
        sliceContext = null,
        policy,
        limits,
        editorModel = model,
        readOnly = false,
    } = given;
    const environment = createTestEnvironment({ seed: 1 });
    const definition = defineEditor({
        id: 'test.clipboard',
        model: editorModel,
        policy: policy ?? {},
        limits: limits ?? {},
    });
    const ref = createRef<EditorHandle<object>>();
    const diagnostics: Diagnostic[] = [];
    const changes: DocumentChange[] = [];
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            data-test-id={`editor-${String(sliceContext)}`}
            definition={definition}
            defaultValue={{
                documentId: 'document-1',
                revision: null,
                document: envelope(doc(...blocks)) as never,
            }}
            environment={environment}
            presentation={defineReactPresentation({ sliceContext })}
            readOnly={readOnly}
            ref={ref}
            onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
            onDocumentChange={(change) => changes.push(change)}
        />,
    );
    act(() => environment.flushFrames());
    const handle = ref.current;
    if (handle === null) {
        throw new Error('no editor');
    }
    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        throw new Error('no view');
    }
    const announced = () => {
        const region = rendered.container.querySelector('[aria-live="polite"]');
        return region?.textContent;
    };
    const content = () => handle.getSnapshot().document.content.content as unknown;
    return { handle, view, diagnostics, changes, announced, content, unmount: rendered.unmount };
};
type Mounted = ReturnType<typeof mount>;

const transfer = (data: Readonly<Record<string, string>>, files: readonly File[] = []) => {
    const dataTransfer = new DataTransfer();
    for (const [type, value] of Object.entries(data)) {
        dataTransfer.setData(type, value);
    }
    for (const file of files) {
        dataTransfer.items.add(file);
    }
    return dataTransfer;
};

const pasteInto = ({ view }: Mounted, data: Readonly<Record<string, string>>, files: readonly File[] = []) => {
    const event = new ClipboardEvent('paste', {
        clipboardData: transfer(data, files),
        bubbles: true,
        cancelable: true,
    });
    act(() => {
        view.dom.dispatchEvent(event);
    });
    return event;
};

/** Dispatches a drop of `data` at a stubbed point inside the first paragraph, as a browser does after the pointer release. */
const dropInto = ({ view }: Mounted, data: Readonly<Record<string, string>>) => {
    vi.spyOn(view, 'posAtCoords').mockReturnValue({ pos: 1, inside: 0 });
    const event = new DragEvent('drop', { bubbles: true, cancelable: true });
    // happy-dom's DragEvent ignores the `dataTransfer` init.
    Object.defineProperty(event, 'dataTransfer', { value: transfer(data) });
    act(() => {
        view.dom.dispatchEvent(event);
    });
    return event;
};

const copyFrom = ({ view }: Mounted, type: 'copy' | 'cut' = 'copy') => {
    const clipboardData = new DataTransfer();
    act(() => {
        view.dom.dispatchEvent(new ClipboardEvent(type, { clipboardData, bubbles: true, cancelable: true }));
    });
    return {
        html: clipboardData.getData('text/html'),
        text: clipboardData.getData('text/plain'),
        slice: clipboardData.getData(SLICE_TYPE),
    };
};

const key = ({ view }: Mounted, type: 'keydown' | 'keyup', name: string) =>
    act(() => {
        view.dom.dispatchEvent(new KeyboardEvent(type, { key: name, shiftKey: type === 'keydown', bubbles: true }));
    });

const selectAll = ({ view }: Mounted) =>
    act(() => {
        view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
    });

const caretAtEnd = ({ view }: Mounted) =>
    act(() => {
        view.dispatch(view.state.tr.setSelection(Selection.atEnd(view.state.doc)));
    });

const undo = ({ handle }: Mounted) =>
    act(() => {
        (handle as unknown as RuntimeHandle).execute('history.undo');
    });

/** A slice payload of the vocabulary model with `content`, as the editor writes one. */
const slicePayload = (content: readonly JsonValue[], extra: Readonly<Record<string, JsonValue>> = {}) =>
    JSON.stringify({
        format: 'frontify.rich-text-slice',
        formatVersion: 1,
        model: { id: 'fixture.vocabulary', version: 1 },
        requiredCapabilities: model.capabilities.map(({ id, version }) => ({ id, version })),
        context: 'a',
        openStart: 0,
        openEnd: 0,
        content,
        ...extra,
    });

const nodeIdsOf = (value: unknown): string[] => {
    if (Array.isArray(value)) {
        return value.flatMap(nodeIdsOf);
    }
    if (typeof value !== 'object' || value === null) {
        return [];
    }
    const record = value as Record<string, unknown>;
    const own: string[] = [];
    const attrs = record.attrs as Record<string, unknown> | undefined;
    if (attrs !== undefined && typeof attrs.nodeId === 'string') {
        own.push(attrs.nodeId);
    }
    return [...own, ...nodeIdsOf(record.content)];
};

const textOf = (mounted: Mounted) => mounted.view.state.doc.textBetween(0, mounted.view.state.doc.content.size, '|');

afterEach(() => {
    vi.restoreAllMocks();
});

describe('paste order', () => {
    it('SPEC-rich-text-clipboard/AC-001 SPEC-rich-text-accessibility/AC-037 rejects a 2 MiB HTML payload before anything parses it, with the state unchanged and an announcement in the live region', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a' });
        const before = mounted.view.state;
        const domParser = vi.spyOn(globalThis, 'DOMParser');
        const schemaParser = vi.spyOn(SchemaParser, 'fromSchema');

        const event = pasteInto(mounted, { 'text/html': `<p>${'x'.repeat(2 * MIB)}</p>`, 'text/plain': 'x' });

        expect(event.defaultPrevented).toBe(true);
        expect(domParser).not.toHaveBeenCalled();
        expect(schemaParser).not.toHaveBeenCalled();
        expect(mounted.view.state.doc).toBe(before.doc);
        expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
        expect(mounted.diagnostics).toEqual([
            {
                code: 'clipboard.paste-rejected',
                severity: 'warning',
                messageKey: 'clipboard.paste-rejected',
                details: { reason: 'maxPasteBytes' },
            },
        ]);
        expect(mounted.announced()).toBe('The pasted content is too large.');
        mounted.unmount();
    });

    it.each([
        ['text/plain', { 'text/plain': 'x'.repeat(MIB + 1) }],
        ['the internal slice', { [SLICE_TYPE]: 'x'.repeat(MIB + 1), 'text/plain': 'y' }],
    ])('SPEC-rich-text-clipboard/AC-001 rejects %s over maxPasteBytes', (_name, data) => {
        const mounted = mount();
        const before = mounted.view.state.doc;

        pasteInto(mounted, data);

        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics.map(({ details }) => details)).toEqual([{ reason: 'maxPasteBytes' }]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-001 rejects a 2 MiB text/plain drop over a paragraph with the document unchanged and one maxPasteBytes diagnostic', () => {
        const mounted = mount();
        const before = mounted.view.state.doc;

        const event = dropInto(mounted, { 'text/plain': 'x'.repeat(2 * MIB) });

        expect(event.defaultPrevented).toBe(true);
        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics.map(({ details }) => details)).toEqual([{ reason: 'maxPasteBytes' }]);
        mounted.unmount();
    });

    const boldLink = text(
        'https://frontify.com',
        { type: 'link', attrs: { href: 'https://frontify.com', openInNewWindow: false, styleId: 'brand' } },
        mark('bold'),
    );
    const copied = slicePayload([paragraph(boldLink)], { openStart: 1, openEnd: 1 });
    const rows: readonly [string, Readonly<Record<string, string>>, readonly File[], 'caret' | 'word', JsonValue][] = [
        [
            'step 2: Shift keeps text/plain exactly',
            { 'text/plain': '**b** https://x.io', [SLICE_TYPE]: copied },
            [],
            'caret',
            [paragraph(text('a**b** https://x.iob'))],
        ],
        [
            'step 3: a URL over a word links the word',
            { 'text/plain': 'https://frontify.com', [SLICE_TYPE]: copied },
            [],
            'word',
            [paragraph(text('a'), text('b', link('https://frontify.com')))],
        ],
        [
            'step 3: a URL at a caret with no slice is a linked run',
            { 'text/plain': 'https://frontify.com' },
            [],
            'caret',
            [paragraph(text('a'), text('https://frontify.com', link('https://frontify.com')), text('b'))],
        ],
        [
            'step 3 goes on to step 5 at a caret with a slice, which keeps the bold link and its style',
            { 'text/plain': 'https://frontify.com', [SLICE_TYPE]: copied },
            [],
            'caret',
            [paragraph(text('a'), boldLink, text('b'))],
        ],
        [
            'step 4: files with text/html and no media feature go on to the text',
            { 'text/html': '<p>h</p>', 'text/plain': 't' },
            [new File(['x'], 'x.png', { type: 'image/png' })],
            'caret',
            [paragraph(text('atb'))],
        ],
        [
            'step 4: files with text/plain and no media feature go on to the text',
            { 'text/plain': 't' },
            [new File(['x'], 'x.png', { type: 'image/png' })],
            'caret',
            [paragraph(text('atb'))],
        ],
        [
            'step 5: the internal slice before text/plain',
            {
                'text/plain': 'plain',
                [SLICE_TYPE]: slicePayload([paragraph(text('rich', mark('italic')))], { openStart: 1, openEnd: 1 }),
            },
            [],
            'caret',
            [paragraph(text('a'), text('rich', mark('italic')), text('b'))],
        ],
        [
            'step 7: text/plain lines as paragraphs',
            { 'text/plain': 'one\r\ntwo' },
            [],
            'caret',
            [paragraph(text('aone')), paragraph(text('twob'))],
        ],
    ];
    it.each(rows)('SPEC-rich-text-clipboard/AC-002 %s', (_name, data, files, at, expected) => {
        const mounted = mount();
        if (at === 'word') {
            setSelection(mounted.handle, { text: 'b' });
        } else {
            setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        }
        if (_name.startsWith('step 2')) {
            key(mounted, 'keydown', 'Shift');
        }

        pasteInto(mounted, data, files);

        expect(mounted.content()).toEqual(expected);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-002 replaces a word with a javascript: text/plain and makes no link', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'b' });

        pasteInto(mounted, { 'text/plain': 'javascript:alert(1)' });

        expect(mounted.content()).toEqual([paragraph(text('ajavascript:alert(1)'))]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-002 SPEC-rich-text-clipboard/AC-003 pastes a URL over a word as plain text with Shift held, and makes no link', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'b' });

        key(mounted, 'keydown', 'Shift');
        pasteInto(mounted, { 'text/plain': 'https://frontify.com' });

        expect(mounted.content()).toEqual([paragraph(text('ahttps://frontify.com'))]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-002 inserts nothing for a paste of files alone with no media feature', () => {
        const mounted = mount();
        const before = mounted.view.state.doc;

        const event = pasteInto(mounted, {}, [new File(['x'], 'x.png', { type: 'image/png' })]);

        expect(event.defaultPrevented).toBe(true);
        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics).toEqual([]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-003 reads Shift from its own key tracking, held from keydown to keyup', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const data = {
            'text/plain': '*x*',
            [SLICE_TYPE]: slicePayload([paragraph(text('y', mark('bold')))], { openStart: 1, openEnd: 1 }),
        };

        key(mounted, 'keydown', 'Shift');
        pasteInto(mounted, data);
        key(mounted, 'keyup', 'Shift');
        pasteInto(mounted, data);

        expect(mounted.content()).toEqual([paragraph(text('a*x*'), text('y', mark('bold')), text('b'))]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-003 takes Shift+Insert as an ordinary paste, as ProseMirror does', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        key(mounted, 'keydown', 'Insert');
        pasteInto(mounted, {
            'text/plain': 'x',
            [SLICE_TYPE]: slicePayload([paragraph(text('y', mark('bold')))], { openStart: 1, openEnd: 1 }),
        });

        expect(mounted.content()).toEqual([paragraph(text('a'), text('y', mark('bold')), text('b'))]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-002 inserts text/plain exactly into a code block, tabs and spaces kept', () => {
        const mounted = mount({ blocks: [node('code_block', { languageId: null }, text('ab'))] });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pasteInto(mounted, { 'text/plain': '\tx  y\n**z**', 'text/html': '<b>x</b>' });

        expect(mounted.content()).toEqual([node('code_block', { languageId: null }, text('a\tx  y\n**z**b'))]);
        mounted.unmount();
    });
});

describe('internal slices', () => {
    const fallsBack: readonly [string, string][] = [
        ['an unknown node', slicePayload([node('callout', {}, paragraph(text('x')))])],
        [
            'a javascript: link',
            slicePayload([paragraph(text('x', link('javascript:alert(1)')))], { openStart: 1, openEnd: 1 }),
        ],
        [
            'a depth of 100',
            slicePayload([
                Array.from({ length: 100 }).reduce<JsonValue>((inner) => blockquote(inner), paragraph(text('x'))),
            ]),
        ],
        ['openStart -1', slicePayload([paragraph(text('x'))], { openStart: -1 })],
        ['an openEnd above the content depth', slicePayload([paragraph(text('x'))], { openEnd: 2 })],
        [
            'a model the editor does not install',
            slicePayload([paragraph(text('x'))], { model: { id: 'other', version: 1 } }),
        ],
        [
            'a capability the editor does not install',
            slicePayload([paragraph(text('x'))], {
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'acme.x', version: 1 },
                ],
            }),
        ],
        ['no JSON', '{'],
        ['an openStart above the content depth', slicePayload([paragraph(text('x'))], { openStart: 2 })],
        ['a fractional openStart', slicePayload([paragraph(text('x'))], { openStart: 0.5 })],
        ['a string openStart', slicePayload([paragraph(text('x'))], { openStart: '1' })],
        ['a formatVersion of 2', slicePayload([paragraph(text('x'))], { formatVersion: 2 })],
    ];
    it.each(fallsBack)(
        'SPEC-rich-text-clipboard/AC-006 SPEC-rich-text-clipboard/AC-007 ignores a slice with %s and takes the next flavor',
        (_name, payload) => {
            const mounted = mount();
            setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

            pasteInto(mounted, { [SLICE_TYPE]: payload, 'text/plain': 'plain' });

            expect(mounted.content()).toEqual([paragraph(text('aplainb'))]);
            mounted.unmount();
        },
    );

    it('SPEC-rich-text-clipboard/AC-006 pastes an island copied from a document as the same island with its original unchanged', () => {
        const original = { type: 'callout', attrs: { tone: 'info' }, content: [paragraph(text('Kept'))] };
        const source = mount({ blocks: [paragraph(text('ab')), original as JsonValue] });
        selectAll(source);
        const flavors = copyFrom(source);
        source.unmount();
        const target = mount({ blocks: [paragraph()] });

        pasteInto(target, { [SLICE_TYPE]: flavors.slice, 'text/plain': flavors.text });

        expect((JSON.parse(flavors.slice) as { readonly content: unknown[] }).content[1]).toEqual({
            type: 'unsupported_block',
            attrs: { feature: 'callout', original },
        });
        expect(target.content()).toEqual([paragraph(text('ab')), original]);
        target.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-006 pastes an unknown mark and an unknown inline copied from a document as the same islands with their originals unchanged', () => {
        const inline = { type: 'emoji', attrs: { code: 'smile' } };
        const sparkle = { type: 'sparkle', attrs: { glow: 2 } };
        const block = paragraph(text('a'), inline as JsonValue, text('b', sparkle as JsonValue));
        const source = mount({ blocks: [block] });
        selectAll(source);
        const flavors = copyFrom(source);
        source.unmount();
        const target = mount({ blocks: [paragraph()] });

        pasteInto(target, { [SLICE_TYPE]: flavors.slice, 'text/plain': 'plain' });

        const written = JSON.stringify((JSON.parse(flavors.slice) as { readonly content: unknown[] }).content);
        expect(written).toContain('"type":"unsupported_inline"');
        expect(written).toContain('"type":"unsupported_mark"');
        expect(target.content()).toEqual([block]);
        target.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-006 ignores a slice whose unsupported_mark wrapper holds a known bold mark and takes the next flavor', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const forgedMark = { type: 'unsupported_mark', attrs: { original: mark('bold') } };

        pasteInto(mounted, {
            [SLICE_TYPE]: slicePayload([paragraph(text('x', forgedMark as JsonValue))], { openStart: 1, openEnd: 1 }),
            'text/plain': 'plain',
        });

        expect(mounted.content()).toEqual([paragraph(text('aplainb'))]);
        mounted.unmount();
    });

    const island = (original: JsonValue) => ({ type: 'unsupported_block', attrs: { feature: 'callout', original } });
    const forged: readonly [string, JsonValue][] = [
        ['a known paragraph with a javascript: link', paragraph(text('x', link('javascript:alert(1)')))],
        ['a known paragraph', paragraph(text('x'))],
        ['an island inside', island({ type: 'callout', content: [paragraph(text('x'))] })],
    ];
    it.each(forged)(
        'SPEC-rich-text-clipboard/AC-006 ignores a slice whose island wrapper holds %s and takes the next flavor',
        (_name, original) => {
            const mounted = mount();
            setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

            pasteInto(mounted, { [SLICE_TYPE]: slicePayload([island(original)]), 'text/plain': 'plain' });

            expect(mounted.content()).toEqual([paragraph(text('aplainb'))]);
            mounted.unmount();
        },
    );

    it('SPEC-rich-text-clipboard/AC-022 ignores a slice whose island holds a mention from another context (DR-082)', () => {
        const mounted = mount({ sliceContext: 'b' });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const original = { type: 'callout', content: [paragraph(mention('m-9'))] };

        pasteInto(mounted, { [SLICE_TYPE]: slicePayload([island(original)]), 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([paragraph(text('aplainb'))]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-021 pastes an island holding a nodeId once and falls back the second time (DR-082)', () => {
        const mounted = mount({ sliceContext: 'a' });
        const original = { type: 'callout', attrs: { nodeId: 'c-1' }, content: [paragraph(text('Kept'))] };
        const data = { [SLICE_TYPE]: slicePayload([island(original)]), 'text/plain': 'plain' };
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pasteInto(mounted, data);
        setSelection(mounted.handle, { text: 'b', from: 0, to: 0 });
        pasteInto(mounted, data);

        expect(mounted.content()).toEqual([paragraph(text('a')), original, paragraph(text('plainb'))]);
        mounted.unmount();
    });
});

describe('the paste pipeline', () => {
    it('SPEC-rich-text-clipboard/AC-019 SPEC-rich-text-runtime/AC-010 drops the content of a feature with paste: false and keeps its text', () => {
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

    it('SPEC-rich-text-clipboard/AC-019 SPEC-rich-text-runtime/AC-010 keeps the item and cell texts of lists and tables with paste: false as paragraphs', () => {
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

    it('SPEC-rich-text-clipboard/AC-019 SPEC-rich-text-runtime/AC-010 unwraps the children of a refused container whose items belong to a feature that stays', () => {
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

    it('SPEC-rich-text-clipboard/AC-019 SPEC-rich-text-runtime/AC-010 pastes a refused mention as its label and a refused image leaf as nothing', () => {
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
    it.each(limitRows)(
        'SPEC-rich-text-clipboard/AC-020 inserts a slice that lands exactly on %s',
        (limit, value, block, payload) => {
            const mounted = mount({ blocks: [block], limits: { [limit]: value + 1 } });
            setSelection(mounted.handle, { text: 'ab', from: 1, to: 1 });
            const before = mounted.view.state.doc;

            pasteInto(mounted, { [SLICE_TYPE]: payload as string, 'text/plain': 'x' });

            expect(mounted.view.state.doc).not.toBe(before);
            expect(mounted.diagnostics).toEqual([]);
            expect(mounted.changes.map(({ origin }) => origin)).toEqual(['paste']);
            mounted.unmount();
        },
    );

    it.each(limitRows)(
        'SPEC-rich-text-clipboard/AC-020 rejects a slice over %s once inserted, with the state unchanged',
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

    it('SPEC-rich-text-clipboard/AC-020 keeps pasted text as typed when its Markdown conversion would pass maxDepth once inserted', () => {
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
    ])(
        'SPEC-rich-text-clipboard/AC-020 rejects pasted text over maxTextLength %s, with the state unchanged',
        (_name, pasted) => {
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
        },
    );

    it('SPEC-rich-text-clipboard/AC-020 inserts plain text that lands exactly on maxDocumentBytes, and reports maxDocumentBytes one byte below', () => {
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

    it('SPEC-rich-text-clipboard/AC-020 SPEC-rich-text-clipboard/AC-045 keeps pasted Markdown as typed when its conversion would pass maxDocumentBytes', () => {
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

    it('SPEC-rich-text-clipboard/AC-021 SPEC-rich-text-format/AC-032 gives each paste of one slice new nodeIds and keeps the resource ID', () => {
        const mounted = mount({ blocks: [heading('h-1', text('T'), mention('m-1')), paragraph()], sliceContext: 'a' });
        selectAll(mounted);
        const { slice } = copyFrom(mounted);
        caretAtEnd(mounted);

        pasteInto(mounted, { [SLICE_TYPE]: slice });
        pasteInto(mounted, { [SLICE_TYPE]: slice });

        const headings = (mounted.content() as { readonly type: string }[]).filter(({ type }) => type === 'heading');
        const sets = headings.map((block) => nodeIdsOf(block));
        expect(sets.map((set) => set.length)).toEqual([2, 2, 2]);
        expect(new Set(sets.flat()).size).toBe(6);
        expect(JSON.stringify(headings).match(/"resourceType":"user","resourceId":"u-1"/g)).toHaveLength(3);
        mounted.unmount();
    });
});

describe('slice contexts', () => {
    const referencing = (context: string | null) =>
        slicePayload(
            [paragraph(text('Hi '), mention('m-1')), node('figure', { nodeId: 'f-1' }, paragraph(text('cap')))],
            {
                context,
                openStart: 0,
            },
        );
    const rows: readonly [string, string | null, string | null][] = [
        ['from context a into b', 'a', 'b'],
        ['with a null context into an editor with a host context', null, 'b'],
        ['with a null context into an editor with none', null, null],
    ];
    it.each(rows)(
        'SPEC-rich-text-clipboard/AC-022 pastes a slice %s with each mention as its label and the media dropped and announced',
        (_name, from, into) => {
            const mounted = mount({ blocks: [paragraph()], sliceContext: into });

            pasteInto(mounted, { [SLICE_TYPE]: referencing(from) });

            expect(mounted.content()).toEqual([paragraph(text('Hi Ada'))]);
            expect(mounted.announced()).toBe('Media not pasted: 1');
            mounted.unmount();
        },
    );

    it('SPEC-rich-text-clipboard/AC-023 keeps the resource references of a slice from the same host context', () => {
        const mounted = mount({ blocks: [paragraph()], sliceContext: 'a' });

        pasteInto(mounted, { [SLICE_TYPE]: referencing('a') });

        const pasted = mounted.content() as readonly JsonValue[];
        expect(JSON.stringify(pasted)).toContain('"resourceType":"user","resourceId":"u-1","labelSnapshot":"Ada"');
        expect(JSON.stringify(pasted)).toContain('"type":"figure"');
        expect(mounted.announced()).toBe('');
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-023 keeps the resource references between two editors on one page with no host context', () => {
        const source = mount({ blocks: [paragraph(text('Hi '), mention('m-1'))] });
        const target = mount({ blocks: [paragraph()] });
        selectAll(source);
        const { slice } = copyFrom(source);

        pasteInto(target, { [SLICE_TYPE]: slice });

        expect(JSON.stringify(target.content())).toContain('"resourceType":"user","resourceId":"u-1"');
        source.unmount();
        target.unmount();
    });
});

describe('undo and failures', () => {
    it('SPEC-rich-text-clipboard/AC-024 pastes a multi-paragraph slice as one change of origin paste that one undo reverts', () => {
        const mounted = mount({ blocks: [paragraph(text('ab'))] });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const before = mounted.content();

        pasteInto(mounted, {
            [SLICE_TYPE]: slicePayload([paragraph(text('one')), paragraph(text('two')), paragraph(text('three'))], {
                openStart: 1,
                openEnd: 1,
            }),
        });
        const pasted = mounted.content();
        undo(mounted);

        expect(pasted).toEqual([paragraph(text('aone')), paragraph(text('two')), paragraph(text('threeb'))]);
        expect(mounted.changes.map(({ origin }) => origin)).toEqual(['paste', 'history']);
        expect(mounted.content()).toEqual(before);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-024 keeps the text and removes the link with one undo after a caret paste of a URL', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, { 'text/plain': 'https://frontify.com' });
        const linked = mounted.content();
        undo(mounted);

        expect(linked).toEqual([paragraph(text('https://frontify.com', link('https://frontify.com')))]);
        expect(mounted.content()).toEqual([paragraph(text('https://frontify.com'))]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-003 leaves a paste during composition to the browser', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const before = mounted.view.state.doc;
        vi.spyOn(mounted.view, 'composing', 'get').mockReturnValue(true);

        const event = pasteInto(mounted, { 'text/plain': 'x' });

        expect(event.defaultPrevented).toBe(false);
        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics).toEqual([]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-025 reports a parser that throws with codes only and changes nothing', () => {
        const mounted = mount();
        const before = mounted.view.state;
        vi.spyOn(MarkdownIt.prototype, 'parse').mockImplementation(() => {
            throw new Error('Secret fixture text');
        });

        pasteInto(mounted, { 'text/plain': 'Secret **fixture** text' });

        expect(mounted.view.state.doc).toBe(before.doc);
        expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
        expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['clipboard.paste-rejected', { reason: 'error' }],
        ]);
        expect(JSON.stringify(mounted.diagnostics)).not.toMatch(/Secret|fixture/);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-045 SPEC-rich-text-editing/AC-100 converts pasted Markdown as a second step that one undo reverts to the plain text', () => {
        const mounted = mount({ blocks: [paragraph()] });
        const markdown = '## Title\n\n- one\n- two\n\nSee [guide](https://frontify.com)';

        pasteInto(mounted, { 'text/plain': markdown });
        const converted = mounted.content() as readonly { readonly type: string }[];
        undo(mounted);

        expect(converted.map(({ type }) => type)).toEqual(['heading', 'bullet_list', 'paragraph']);
        expect(JSON.stringify(converted)).toContain(
            '"text":"guide","marks":[{"type":"link","attrs":{"href":"https://frontify.com"',
        );
        expect(textOf(mounted)).toBe('## Title|- one|- two|See [guide](https://frontify.com)');
        expect(mounted.changes.map(({ origin }) => origin)).toEqual(['paste', 'history']);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-045 keeps plain text with no Markdown structure, or with text/html beside it, as typed', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, { 'text/plain': 'Read https://frontify.com now' });
        pasteInto(mounted, { 'text/plain': ' **x**', 'text/html': '<p><b>x</b></p>' });

        expect(mounted.content()).toEqual([paragraph(text('Read https://frontify.com now **x**'))]);
        mounted.unmount();
    });
});

describe('readonly', () => {
    const flavorsOfDrag = ({ view }: Mounted) => {
        const dataTransfer = new DataTransfer();
        const event = new DragEvent('dragstart', { bubbles: true, cancelable: true });
        // happy-dom's DragEvent ignores the `dataTransfer` init.
        Object.defineProperty(event, 'dataTransfer', { value: dataTransfer });
        act(() => {
            view.dom.dispatchEvent(event);
        });
        return { 'text/plain': dataTransfer.getData('text/plain'), [SLICE_TYPE]: dataTransfer.getData(SLICE_TYPE) };
    };

    it('SPEC-rich-text-clipboard/AC-050 keeps the document and selection through paste, cut and a drop of a drag that started there', () => {
        const mounted = mount({ blocks: [paragraph(text('abc')), paragraph(text('def'))], readOnly: true });
        setSelection(mounted.handle, { text: 'b' });
        const before = mounted.view.state;

        pasteInto(mounted, { 'text/plain': 'pasted' });
        const cut = copyFrom(mounted, 'cut');
        const dragged = flavorsOfDrag(mounted);
        dropInto(mounted, dragged);
        dropInto(mounted, { 'text/plain': 'dropped' });

        expect(cut.text).toBe('b');
        expect(dragged['text/plain']).toBe('b');
        expect(mounted.view.state.doc).toBe(before.doc);
        expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
        expect(mounted.changes).toEqual([]);
        expect(mounted.diagnostics).toEqual([]);
        mounted.unmount();
    });

    it('SPEC-rich-text-clipboard/AC-037 SPEC-rich-text-clipboard/AC-046 starts no drop-cursor drag from a dragover in readonly', () => {
        const mounted = mount({ readOnly: true });

        act(() => {
            mounted.view.dom.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true }));
        });

        expect(mounted.view.dragging).toBeNull();
        mounted.unmount();
    });
});

describe('copy', () => {
    it('SPEC-rich-text-clipboard/AC-027 writes copied HTML with no chrome, contenteditable, nodeId or resource ID from a fixture with every node view', () => {
        const viewsModel = compileContentModel(
            [core(), fixtureChromeViews(), fixtureCodeBlockView(), fixtureMediaImageView(), fixtureTableBlockView()],
            { id: 'fixture.vocabulary', version: 1 },
        );
        const plain = (value: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [text(value)] });
        const mounted = mount({
            editorModel: viewsModel,
            blocks: [
                plain('Before'),
                node('chrome_block', { nodeId: 'id-block', language: 'ts', checked: true }, text('code')),
                {
                    type: 'paragraph',
                    attrs: { lang: null },
                    content: [node('chrome_mention', { nodeId: 'id-mention', label: 'Ada' })],
                },
                node('chrome_image', { nodeId: 'id-image', assetId: 'asset-1' }),
                node('chrome_code', { nodeId: 'id-code', language: 'js' }, text('let a')),
                node('media_image', { nodeId: 'id-media', assetId: 'asset-2', alt: 'Logo' }),
                node('table_block', { nodeId: 'id-table' }, plain('Cell')),
            ],
        });
        selectAll(mounted);

        const { html } = copyFrom(mounted);

        expect(mounted.view.dom.querySelectorAll('[data-rte-chrome]')).toHaveLength(6);
        expect(html).toBe(
            '<div class="fondue-rte-content"><p>Before</p><pre>code</pre><p><span data-label="Ada"></span></p><div></div><pre>let a</pre><figure></figure><section><p>Cell</p></section></div>',
        );
        mounted.unmount();
    });

    it('SPEC-rich-text-editing/AC-098 copies a node-selected island as its island node, with its text in the HTML and plain text', () => {
        const original = { type: 'callout', content: [paragraph(text('Kept'))] };
        const mounted = mount({ blocks: [paragraph(text('ab')), original as JsonValue] });
        act(() => {
            mounted.view.dispatch(mounted.view.state.tr.setSelection(NodeSelection.create(mounted.view.state.doc, 4)));
        });

        const flavors = copyFrom(mounted);

        expect((JSON.parse(flavors.slice) as { readonly content: unknown[] }).content).toEqual([
            { type: 'unsupported_block', attrs: { feature: 'callout', original } },
        ]);
        expect(flavors.html).toContain('Kept');
        expect(flavors.text).toBe('Kept');
        mounted.unmount();
    });
});
