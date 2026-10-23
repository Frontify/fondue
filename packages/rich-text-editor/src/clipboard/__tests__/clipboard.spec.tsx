/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act, render } from '@testing-library/react';
import MarkdownIt from 'markdown-it';
import { type Node as EngineNode, DOMParser as SchemaParser } from 'prosemirror-model';
import { AllSelection, EditorState, NodeSelection, Selection } from 'prosemirror-state';
import { Transform } from 'prosemirror-transform';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { fixtureChrome } from '#/features/__tests__/fixtures/chrome/feature';
import { fixtureCodeBlock } from '#/features/__tests__/fixtures/code-block/feature';
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
} from '#/features/__tests__/fixtures/documents';
import { fixtureMedia } from '#/features/__tests__/fixtures/features';
import { htmlFeatures, htmlLink } from '#/features/__tests__/fixtures/html';
import { fixtureMediaImage } from '#/features/__tests__/fixtures/media/feature';
import { fixturePartsOf } from '#/features/__tests__/fixtures/parts';
import { fixtureTableBlock } from '#/features/__tests__/fixtures/table/feature';
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
} from '#/features/__tests__/fixtures/vocabulary';
import { quote } from '#/features/blocks-quote/feature';
import { core } from '#/features/core/feature';
import { language } from '#/features/marks-language/feature';
import { registry } from '#/features/registry';
import { fromHTML } from '#/html';
import {
    compileContentModel,
    type ContentModel,
    decodeDocument,
    defaultLimits,
    defineFeature,
    type Diagnostic,
    type JsonValue,
    type ResourceLimits,
    type RichTextSlice,
} from '#/model';
import { compiledModel } from '#/model/compile';
import { defineEditor, defineReactPresentation } from '#/react/define';
import { RichTextEditor } from '#/react/rich-text-editor';
import { type EditorHandle } from '#/react/types';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { type AuthoringPolicy, type DocumentChange } from '#/runtime/types';
import { paste, pressKey, setSelection } from '#/testing';

import { NO_COLORS } from '../import/colors';
import { importHtml } from '../import/html';
import { SLICE_TYPE } from '../slice';

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
    readonly generateId?: () => string;
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
        policy = {},
        limits = {},
        editorModel = model,
        readOnly = false,
        generateId,
    } = given;
    const definition = defineEditor({
        id: 'test.clipboard',
        model: editorModel,
        policy,
        limits,
        plugins: fixturePartsOf(editorModel),
    });
    const ref = createRef<EditorHandle<object>>();
    const ids: { generateId?: () => string } = {};
    if (generateId !== undefined) {
        ids.generateId = generateId;
    }
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
            presentation={defineReactPresentation({ sliceContext })}
            readOnly={readOnly}
            {...ids}
            ref={ref}
            onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
            onDocumentChange={(change) => changes.push(change)}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
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

/** What `data` hands the paste order, as the `paste` helper takes it. */
const inputOf = (data: Readonly<Record<string, string>>, files: readonly File[]): Parameters<typeof paste>[1] => {
    const html = data['text/html'] ?? '';
    const text = data['text/plain'] ?? '';
    const input = { html, text, files };
    const slice = data[SLICE_TYPE];
    if (slice === undefined) {
        return input;
    }
    return { ...input, slice: JSON.parse(slice) as RichTextSlice };
};

const pasteInto = ({ handle }: Mounted, data: Readonly<Record<string, string>>, files: readonly File[] = []) => {
    act(() => {
        paste(handle, inputOf(data, files));
    });
};

/** The paste event itself, for the cases that read the event or carry a flavor the helper does not model. */
const pasteEventInto = ({ view }: Mounted, data: Readonly<Record<string, string>>, files: readonly File[] = []) => {
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

/** Releases Shift, which `pressKey` has no way to do. */
const releaseShift = ({ view }: Mounted) =>
    act(() => {
        view.dom.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift', bubbles: true }));
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

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('paste order', () => {
    it('rejects a 2 MiB HTML payload before anything parses it, with the state unchanged and an announcement in the live region', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a' });
        const before = mounted.view.state;
        const domParser = vi.spyOn(globalThis, 'DOMParser');
        const schemaParser = vi.spyOn(SchemaParser, 'fromSchema');

        const event = pasteEventInto(mounted, { 'text/html': `<p>${'x'.repeat(2 * MIB)}</p>`, 'text/plain': 'x' });

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

    it('rejects text/plain over maxPasteBytes', () => {
        const mounted = mount();
        const before = mounted.view.state.doc;

        pasteInto(mounted, { 'text/plain': 'x'.repeat(MIB + 1) });

        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics.map(({ details }) => details)).toEqual([{ reason: 'maxPasteBytes' }]);
        mounted.unmount();
    });

    it('rejects the internal slice over maxPasteBytes', () => {
        const mounted = mount();
        const before = mounted.view.state.doc;

        pasteEventInto(mounted, { [SLICE_TYPE]: 'x'.repeat(MIB + 1), 'text/plain': 'y' });

        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics.map(({ details }) => details)).toEqual([{ reason: 'maxPasteBytes' }]);
        mounted.unmount();
    });

    it('rejects a 2 MiB text/plain drop over a paragraph with the document unchanged and one maxPasteBytes diagnostic', () => {
        const mounted = mount();
        const before = mounted.view.state.doc;

        const event = dropInto(mounted, { 'text/plain': 'x'.repeat(2 * MIB) });

        expect(event.defaultPrevented).toBe(true);
        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics.map(({ details }) => details)).toEqual([{ reason: 'maxPasteBytes' }]);
        mounted.unmount();
    });

    it('rejects an internal copy drop whose dragged slice passes maxPasteBytes, with the document unchanged and one maxPasteBytes diagnostic', () => {
        const mounted = mount({
            blocks: [paragraph(text('abc')), paragraph(text('def'))],
            limits: { maxPasteBytes: 100 },
        });
        setSelection(mounted.handle, { text: 'e' });
        const before = mounted.view.state.doc;
        const dataTransfer = new DataTransfer();
        const start = new DragEvent('dragstart', { bubbles: true, cancelable: true });
        // happy-dom's DragEvent ignores the `dataTransfer` init.
        Object.defineProperty(start, 'dataTransfer', { value: dataTransfer });
        act(() => {
            mounted.view.dom.dispatchEvent(start);
        });
        vi.spyOn(mounted.view, 'posAtCoords').mockReturnValue({ pos: 1, inside: 0 });
        const drop = new DragEvent('drop', { bubbles: true, cancelable: true });
        // happy-dom's DragEvent ignores these inits too; both modifiers make the drop a copy on any platform.
        Object.defineProperties(drop, {
            dataTransfer: { value: dataTransfer },
            altKey: { value: true },
            ctrlKey: { value: true },
        });

        act(() => {
            mounted.view.dom.dispatchEvent(drop);
        });

        expect(dataTransfer.getData(SLICE_TYPE).length).toBeGreaterThan(100);
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
            'Shift keeps text/plain exactly',
            { 'text/plain': '**b** https://x.io', [SLICE_TYPE]: copied },
            [],
            'caret',
            [paragraph(text('a**b** https://x.iob'))],
        ],
        [
            'A URL over a word links the word',
            { 'text/plain': 'https://frontify.com', [SLICE_TYPE]: copied },
            [],
            'word',
            [paragraph(text('a'), text('b', link('https://frontify.com')))],
        ],
        [
            'A URL at a caret with no slice is a linked run',
            { 'text/plain': 'https://frontify.com' },
            [],
            'caret',
            [paragraph(text('a'), text('https://frontify.com', link('https://frontify.com')), text('b'))],
        ],
        [
            'A URL at a caret with a slice keeps the bold link and its style',
            { 'text/plain': 'https://frontify.com', [SLICE_TYPE]: copied },
            [],
            'caret',
            [paragraph(text('a'), boldLink, text('b'))],
        ],
        [
            'Shift keeps text/plain over text/html',
            { 'text/plain': 't', 'text/html': '<p>h</p>' },
            [],
            'caret',
            [paragraph(text('atb'))],
        ],
        [
            'Files with text/html and no media feature go on to the HTML',
            { 'text/html': '<p>h</p>', 'text/plain': 't' },
            [new File(['x'], 'x.png', { type: 'image/png' })],
            'caret',
            [paragraph(text('ahb'))],
        ],
        [
            'Files with text/plain and no media feature go on to the text',
            { 'text/plain': 't' },
            [new File(['x'], 'x.png', { type: 'image/png' })],
            'caret',
            [paragraph(text('atb'))],
        ],
        [
            'The internal slice comes before text/plain',
            {
                'text/plain': 'plain',
                [SLICE_TYPE]: slicePayload([paragraph(text('rich', mark('italic')))], { openStart: 1, openEnd: 1 }),
            },
            [],
            'caret',
            [paragraph(text('a'), text('rich', mark('italic')), text('b'))],
        ],
        [
            'The internal slice comes before text/html',
            {
                'text/html': '<p>html</p>',
                [SLICE_TYPE]: slicePayload([paragraph(text('rich', mark('italic')))], { openStart: 1, openEnd: 1 }),
            },
            [],
            'caret',
            [paragraph(text('a'), text('rich', mark('italic')), text('b'))],
        ],
        [
            'Text/html comes before text/plain, and its paragraphs are inserted closed',
            { 'text/html': '<p>one</p><p>two</p>', 'text/plain': 'plain' },
            [],
            'caret',
            [paragraph(text('a')), paragraph(text('one')), paragraph(text('two')), paragraph(text('b'))],
        ],
        [
            'A span holding only U+00A0, as WebKit and Chrome copy a space, becomes a space',
            { 'text/html': '<p>x<span>\u00A0</span>y<span class="Apple-converted-space">\u00A0</span>z</p>' },
            [],
            'caret',
            [paragraph(text('ax y zb'))],
        ],
        [
            'Text/plain lines become paragraphs',
            { 'text/plain': 'one\r\ntwo' },
            [],
            'caret',
            [paragraph(text('aone')), paragraph(text('twob'))],
        ],
    ];
    it.each(rows)('%s', (_name, data, files, at, expected) => {
        const mounted = mount();
        if (at === 'word') {
            setSelection(mounted.handle, { text: 'b' });
        } else {
            setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        }
        if (_name.startsWith('Shift keeps')) {
            pressKey(mounted.handle, 'Shift');
        }

        pasteInto(mounted, data, files);

        expect(mounted.content()).toEqual(expected);
        mounted.unmount();
    });

    it('uses text/html over a word even when it parses to no content, and does not use the text/plain', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'b' });

        pasteInto(mounted, { 'text/html': '<img src=x>', 'text/plain': 'u' });

        expect(mounted.content()).toEqual([paragraph(text('a'))]);
        expect(mounted.announced()).toBe('Media not pasted: 1');
        mounted.unmount();
    });

    it('replaces a word with a javascript: text/plain and makes no link', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'b' });

        pasteInto(mounted, { 'text/plain': 'javascript:alert(1)' });

        expect(mounted.content()).toEqual([paragraph(text('ajavascript:alert(1)'))]);
        mounted.unmount();
    });

    it('pastes a URL over a word as plain text with Shift held, and makes no link', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'b' });

        pressKey(mounted.handle, 'Shift');
        pasteInto(mounted, { 'text/plain': 'https://frontify.com' });

        expect(mounted.content()).toEqual([paragraph(text('ahttps://frontify.com'))]);
        mounted.unmount();
    });

    it('inserts nothing for a paste of files alone with no media feature', () => {
        const mounted = mount();
        const before = mounted.view.state.doc;

        const event = pasteEventInto(mounted, {}, [new File(['x'], 'x.png', { type: 'image/png' })]);

        expect(event.defaultPrevented).toBe(true);
        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics).toEqual([]);
        mounted.unmount();
    });

    it('reads Shift from its own key tracking, held from keydown to keyup', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const data = {
            'text/plain': '*x*',
            [SLICE_TYPE]: slicePayload([paragraph(text('y', mark('bold')))], { openStart: 1, openEnd: 1 }),
        };

        pressKey(mounted.handle, 'Shift');
        pasteInto(mounted, data);
        releaseShift(mounted);
        pasteInto(mounted, data);

        expect(mounted.content()).toEqual([paragraph(text('a*x*'), text('y', mark('bold')), text('b'))]);
        mounted.unmount();
    });

    it('takes Shift+Insert as an ordinary paste, as ProseMirror does', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pressKey(mounted.handle, 'Shift-Insert');
        pasteInto(mounted, {
            'text/plain': 'x',
            [SLICE_TYPE]: slicePayload([paragraph(text('y', mark('bold')))], { openStart: 1, openEnd: 1 }),
        });

        expect(mounted.content()).toEqual([paragraph(text('a'), text('y', mark('bold')), text('b'))]);
        mounted.unmount();
    });

    it('inserts text/plain exactly into a code block, tabs and spaces kept', () => {
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
        ['an openStart above the content depth', slicePayload([paragraph(text('x'))], { openStart: 2 })],
        ['a fractional openStart', slicePayload([paragraph(text('x'))], { openStart: 0.5 })],
        ['a string openStart', slicePayload([paragraph(text('x'))], { openStart: '1' })],
        ['a formatVersion of 2', slicePayload([paragraph(text('x'))], { formatVersion: 2 })],
    ];
    it.each(fallsBack)('ignores a slice with %s and takes the next flavor', (_name, payload) => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pasteInto(mounted, { [SLICE_TYPE]: payload, 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([paragraph(text('aplainb'))]);
        mounted.unmount();
    });

    it('ignores a slice with no JSON and takes the next flavor', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pasteEventInto(mounted, { [SLICE_TYPE]: '{', 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([paragraph(text('aplainb'))]);
        mounted.unmount();
    });

    const withHtml = new Set([
        'an unknown node',
        'a javascript: link',
        'a depth of 100',
        'openStart -1',
        'an openEnd above the content depth',
        'an openStart above the content depth',
        'a fractional openStart',
        'a string openStart',
        'a model the editor does not install',
        'a capability the editor does not install',
    ]);
    const htmlFallback = fallsBack.filter(([name]) => withHtml.has(name));
    it.each(htmlFallback)('ignores a slice with %s and pastes the HTML, keeping its line break', (_name, payload) => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pasteInto(mounted, {
            [SLICE_TYPE]: payload,
            'text/html': '<p>line<br>break</p>',
            'text/plain': 'plain',
        });

        expect(mounted.content()).toEqual([paragraph(text('aline'), node('hard_break'), text('breakb'))]);
        mounted.unmount();
    });

    it('pastes an island copied from a document as the same island with its original unchanged', () => {
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

    it('pastes an unknown mark and an unknown inline copied from a document as the same islands with their originals unchanged', () => {
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

    it('ignores a slice whose unsupported_mark wrapper holds a known bold mark and takes the next flavor', () => {
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
    it.each(forged)('ignores a slice whose island wrapper holds %s and takes the next flavor', (_name, original) => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });

        pasteInto(mounted, { [SLICE_TYPE]: slicePayload([island(original)]), 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([paragraph(text('aplainb'))]);
        mounted.unmount();
    });

    it('ignores a slice whose island holds a mention from another context', () => {
        const mounted = mount({ sliceContext: 'b' });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const original = { type: 'callout', content: [paragraph(mention('m-9'))] };

        pasteInto(mounted, { [SLICE_TYPE]: slicePayload([island(original)]), 'text/plain': 'plain' });

        expect(mounted.content()).toEqual([paragraph(text('aplainb'))]);
        mounted.unmount();
    });

    it('pastes an island holding a nodeId once and falls back the second time', () => {
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

        const headings = (mounted.content() as { readonly type: string }[]).filter(({ type }) => type === 'heading');
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
        'pastes a slice %s with each mention as its label and the media dropped and announced',
        (_name, from, into) => {
            const mounted = mount({ blocks: [paragraph()], sliceContext: into });

            pasteInto(mounted, { [SLICE_TYPE]: referencing(from) });

            expect(mounted.content()).toEqual([paragraph(text('Hi Ada'))]);
            expect(mounted.announced()).toBe('Media not pasted: 1');
            mounted.unmount();
        },
    );

    it('keeps the resource references of a slice from the same host context', () => {
        const mounted = mount({ blocks: [paragraph()], sliceContext: 'a' });

        pasteInto(mounted, { [SLICE_TYPE]: referencing('a') });

        const pasted = mounted.content() as readonly JsonValue[];
        expect(JSON.stringify(pasted)).toContain('"resourceType":"user","resourceId":"u-1","labelSnapshot":"Ada"');
        expect(JSON.stringify(pasted)).toContain('"type":"figure"');
        expect(mounted.announced()).toBe('');
        mounted.unmount();
    });

    it('keeps the resource references between two editors on one page with no host context', () => {
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
    it('pastes a multi-paragraph slice as one change of origin paste that one undo reverts', () => {
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

    it('keeps the text and removes the link with one undo after a caret paste of a URL', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, { 'text/plain': 'https://frontify.com' });
        const linked = mounted.content();
        undo(mounted);

        expect(linked).toEqual([paragraph(text('https://frontify.com', link('https://frontify.com')))]);
        expect(mounted.content()).toEqual([paragraph(text('https://frontify.com'))]);
        mounted.unmount();
    });

    it('leaves a paste during composition to the browser', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        const before = mounted.view.state.doc;
        vi.spyOn(mounted.view, 'composing', 'get').mockReturnValue(true);

        const event = pasteEventInto(mounted, { 'text/plain': 'x' });

        expect(event.defaultPrevented).toBe(false);
        expect(mounted.view.state.doc).toBe(before);
        expect(mounted.diagnostics).toEqual([]);
        mounted.unmount();
    });

    it('reports a parser that throws with codes only and changes nothing', () => {
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

    it('converts pasted Markdown as a second step that one undo reverts to the plain text and a second undo removes', () => {
        const mounted = mount({ blocks: [paragraph()] });
        const markdown = '## Title\n\n- one\n- two\n\nSee [guide](https://frontify.com)';

        pasteInto(mounted, { 'text/plain': markdown });
        const converted = mounted.content() as readonly { readonly type: string }[];
        undo(mounted);
        const restored = textOf(mounted);
        undo(mounted);

        expect(converted.map(({ type }) => type)).toEqual(['heading', 'bullet_list', 'paragraph']);
        expect(JSON.stringify(converted)).toContain(
            '"text":"guide","marks":[{"type":"link","attrs":{"href":"https://frontify.com"',
        );
        expect(restored).toBe('## Title|- one|- two|See [guide](https://frontify.com)');
        expect(textOf(mounted)).toBe('');
        expect(mounted.changes.map(({ origin }) => origin)).toEqual(['paste', 'history', 'history']);
        mounted.unmount();
    });

    it('keeps plain text with no Markdown structure as typed, and takes the text/html beside Markdown text', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, { 'text/plain': 'Read https://frontify.com now' });
        pasteInto(mounted, { 'text/plain': ' **x**', 'text/html': '<p>**x**</p>' });

        expect(mounted.content()).toEqual([paragraph(text('Read https://frontify.com now**x**'))]);
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

    it('keeps the document and selection through paste, cut and a drop of a drag that started there', () => {
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

    it('starts no drop-cursor drag from a dragover in readonly', () => {
        const mounted = mount({ readOnly: true });

        act(() => {
            mounted.view.dom.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true }));
        });

        expect(mounted.view.dragging).toBeNull();
        mounted.unmount();
    });
});

describe('copy', () => {
    it('writes copied HTML with no chrome, contenteditable, nodeId or resource ID from a fixture with every node view', () => {
        const viewsModel = compileContentModel(
            [core(), fixtureChrome(), fixtureCodeBlock(), fixtureMediaImage(), fixtureTableBlock()],
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
            '<div class="fondue-rte-content"><p dir="auto">Before</p><pre dir="auto">code</pre><p dir="auto"><span data-label="Ada"></span></p><div dir="auto"></div><pre dir="auto">let a</pre><figure dir="auto"></figure><section dir="auto"><p dir="auto">Cell</p></section></div>',
        );
        expect(html).not.toMatch(/asset-|id-|data-rte-chrome|contenteditable/);
        mounted.unmount();
    });

    it('copies a node-selected island as its island node, with its text in the HTML and plain text', () => {
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

describe('pasted HTML', () => {
    const htmlModel = compileContentModel(htmlFeatures(), { id: 'fixture.vocabulary', version: 1 });
    const block = (...content: readonly JsonValue[]) => node('paragraph', { lang: null, align: null }, ...content);
    /** An editor of the shipped text features and the HTML stand-ins, with the caret in an empty paragraph. */
    const mountHtml = (options: Options = {}) => mount({ editorModel: htmlModel, blocks: [block()], ...options });

    it('turns each U+00A0 after a space back into a space and keeps a lone U+00A0', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, { 'text/html': '<p>a &nbsp; &nbsp;b</p><p>a&nbsp;b</p>' });

        expect(mounted.content()).toEqual([paragraph(text('a    b')), paragraph(text('a\u00A0b'))]);
        mounted.unmount();
    });

    const preBlock = defineFeature({
        id: 'fixture.pre-block',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            code_block: {
                group: 'block',
                content: 'text*',
                marks: [],
                whitespace: 'pre',
                attrs: {},
                html: ['pre', 0],
                parse: [{ tag: 'pre' }],
            },
        },
    });
    it.each([
        [
            'a list item paragraph',
            '<ul><li>a &nbsp; &nbsp;b</li></ul>',
            [node('bullet_list', undefined, node('list_item', undefined, block(text('a    b'))))],
        ],
        [
            'a space and a U+00A0 split across marks',
            '<p>a <b>&nbsp;</b>x</p>',
            [block(text('a '), text(' ', mark('bold')), text('x'))],
        ],
        [
            'a code block that keeps its U+00A0',
            '<pre>a &nbsp; b</pre>',
            [{ type: 'code_block', content: [text('a \u00A0 b')] }],
        ],
    ] as const)('turns each U+00A0 after a space back into a space in %s', (_name, html, expected) => {
        const editorModel = compileContentModel([...htmlFeatures(), preBlock()], {
            id: 'fixture.vocabulary',
            version: 1,
        });
        const mounted = mount({ editorModel, blocks: [block()] });

        pasteInto(mounted, { 'text/html': html });

        expect(mounted.content()).toEqual(expected);
        mounted.unmount();
    });

    it('keeps the text of a pasted object and drops its embed, param and nested object', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, {
            'text/html':
                '<p>a</p><object data="x.swf"><param name="p" value="v">fallback <b>text</b><embed src="y"><object>no</object></object>',
        });

        expect(mounted.content()).toEqual([paragraph(text('a')), paragraph(text('fallback text'))]);
        mounted.unmount();
    });

    it('lets the parse rules of shipped features read only the listed attributes and styles', () => {
        const attributes = new Set([
            'href',
            'target',
            'start',
            'dir',
            'lang',
            'data-checked',
            'data-language',
            'data-marker',
            'color',
            'data-rte-color',
            'data-rte-style',
        ]);
        const styles = new Set([
            'text-align',
            'font-weight',
            'font-style',
            'text-decoration',
            'vertical-align',
            'color',
            'background-color',
        ]);
        const shipped = compiledModel(
            compileContentModel(
                Object.values(registry).map((factory) => factory()),
                { id: 'test.shipped', version: 1 },
            ),
        );
        const read: string[] = [];
        for (const { parse } of [...shipped.nodes, ...shipped.marks].map(({ declaration }) => declaration)) {
            for (const rule of parse) {
                if ('style' in rule) {
                    read.push(`style:${rule.style}`);
                }
                for (const source of Object.values('tag' in rule ? (rule.attrs ?? {}) : {})) {
                    if ('from' in source) {
                        read.push(`attr:${source.from}`);
                    } else if ('fromStyle' in source) {
                        read.push(`style:${source.fromStyle}`);
                    }
                }
            }
        }
        for (const { parse } of shipped.nodes.flatMap(({ shared }) => shared.map(({ declaration }) => declaration))) {
            if (parse !== undefined && 'attr' in parse) {
                read.push(`attr:${parse.attr}`);
            } else if (parse !== undefined) {
                read.push(`style:${parse.style}`);
            }
        }

        expect(read.length).toBeGreaterThan(0);
        expect(
            read.filter((entry) => {
                const [kind, name] = entry.split(':') as [string, string];
                return !(kind === 'attr' ? attributes : styles).has(name);
            }),
        ).toEqual([]);
    });

    it('maps only the listed style properties to marks and stores no CSS text', () => {
        const mounted = mountHtml();

        pasteInto(mounted, {
            'text/html':
                '<p><span style="color:red;background:url(x);position:fixed">x</span> <span style="font-weight: bold; position: fixed">b</span></p>',
        });

        // The model keeps literal colours, so `red` becomes its hex value.
        expect(mounted.content()).toEqual([
            block(
                text('x', mark('font_color', { tokenId: null, value: '#ff0000' })),
                text(' '),
                text('b', mark('bold')),
            ),
        ]);
        expect(JSON.stringify(mounted.content())).not.toMatch(/red|url|fixed|style/);
        mounted.unmount();
    });

    it.each([
        ['h1 with levels 2 to 4 allowed', [2, 3, 4], '<h1>a</h1><h3>b</h3><h6>c</h6>', [2, 3, 4]],
        ['h2 with no level allowed', [], '<h2>a</h2>', []],
    ] as const)(
        'moves a pasted %s to the nearest allowed level, or makes it a paragraph',
        (_name, allowed, html, levels) => {
            const mounted = mountHtml({ policy: { creatableHeadingLevels: allowed } });

            pasteInto(mounted, { 'text/html': html });

            const content = mounted.content() as readonly { readonly type: string; readonly attrs: object }[];
            if (levels.length === 0) {
                expect(content).toEqual([block(text('a'))]);
            } else {
                expect(content.map(({ type, attrs }) => [type, (attrs as { readonly level: number }).level])).toEqual(
                    levels.map((level) => ['heading', level]),
                );
            }
            mounted.unmount();
        },
    );

    it('pastes HTML with a link while links have paste: false as its text with no link mark', () => {
        const mounted = mountHtml({ policy: { features: { 'fixture.html-link': { ...ALLOW, paste: false } } } });

        pasteInto(mounted, { 'text/html': '<p><a href="https://frontify.com"><strong>linked</strong></a> text</p>' });

        expect(mounted.content()).toEqual([block(text('linked', mark('bold')), text(' text'))]);
        mounted.unmount();
    });

    it.each([
        ['maxDocumentNodes', 6, '<p>1</p><p>2</p><p>3</p><p>4</p>'],
        ['maxDepth', 4, '<blockquote><blockquote><blockquote><p>deep</p></blockquote></blockquote></blockquote>'],
    ] as const)('rejects pasted HTML over %s once inserted, with the state unchanged', (limit, value, html) => {
        const mounted = mountHtml({ limits: { [limit]: value } });
        const before = mounted.view.state;

        pasteInto(mounted, { 'text/html': html });

        expect(mounted.view.state.doc).toBe(before.doc);
        expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
        expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['clipboard.paste-rejected', { reason: limit }],
        ]);
        mounted.unmount();
    });

    /** A Word list paragraph, its bullet in the `mso-list:Ignore` span Word writes. */
    const wordItem = (level: number, value: string) =>
        `<p class="MsoListParagraph" style="margin-left:.5in;text-indent:-.25in;mso-list:l0 level${level} lfo1"><![if !supportLists]><span style="font-family:Symbol"><span style="mso-list:Ignore">·<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;</span></span></span><![endif]>${value}<o:p></o:p></p>`;
    /** The depth of the deepest node under `node`, as the resource limits count it. */
    const deepestOf = (node: EngineNode, depth = 1): number =>
        Math.max(depth, ...node.children.map((child) => deepestOf(child, depth + 1)));

    it.each([
        ['a top-level paragraph', [block()], 12],
        ['a paragraph in a blockquote', [blockquote(block())], 12],
        ['a top-level paragraph at the default limit', [block()], defaultLimits.maxDepth],
    ] as const)(
        'clamps the mso-list levels of pasted Word list paragraphs in %s so the nesting fits maxDepth',
        (_name, blocks, maxDepth) => {
            const mounted = mountHtml({ blocks, limits: { maxDepth } });
            act(() => {
                mounted.view.dispatch(mounted.view.state.tr.setSelection(Selection.atStart(mounted.view.state.doc)));
            });
            const levels = [...Array.from({ length: 40 }, (_, index) => index + 1), 2_000_000_000];
            const html = levels.map((level) => wordItem(level, `L${level}`)).join('');

            const started = performance.now();
            pasteInto(mounted, { 'text/html': html });
            const elapsed = performance.now() - started;

            const { doc } = mounted.view.state;
            expect(elapsed).toBeLessThan(100);
            expect(mounted.diagnostics).toEqual([]);
            expect(doc.textContent).toBe(levels.map((level) => `L${level}`).join(''));
            expect(deepestOf(doc)).toBeLessThanOrEqual(maxDepth);
            expect(deepestOf(doc)).toBeGreaterThanOrEqual(maxDepth - 1);
            mounted.unmount();
        },
    );

    it('pastes mention markup in HTML as its label text, dropping and announcing the images', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, {
            'text/html':
                '<p>Hi <span data-mention="u-1" data-resource-id="u-1">@Ada</span><img src="https://example.com/a.png" alt=""><img src="data:image/png;base64,iVBORw0KGgo=" alt="Logo"></p>',
        });

        expect(mounted.content()).toEqual([paragraph(text('Hi @AdaLogo'))]);
        expect(mounted.announced()).toBe('Media not pasted: 2');
        mounted.unmount();
    });

    it('reports an HTML parser that throws with codes only and changes nothing', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a' });
        const before = mounted.view.state;
        vi.spyOn(DOMParser.prototype, 'parseFromString').mockImplementation(() => {
            throw new Error('Secret fixture text');
        });

        pasteInto(mounted, { 'text/html': '<p>Secret <b>fixture</b> text</p>', 'text/plain': 'Secret fixture text' });

        expect(mounted.view.state.doc).toBe(before.doc);
        expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
        expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['clipboard.paste-rejected', { reason: 'error' }],
        ]);
        expect(JSON.stringify(mounted.diagnostics)).not.toMatch(/Secret|fixture/);
        mounted.unmount();
    });

    it('pastes the copied text/html of a run of three spaces back as three spaces', () => {
        const source = mount({ blocks: [paragraph(text('a   b'))] });
        selectAll(source);
        const { html } = copyFrom(source);
        source.unmount();
        const target = mount({ blocks: [paragraph()] });

        pasteInto(target, { 'text/html': html });

        expect(html).toContain('a \u00A0 b');
        expect(target.content()).toEqual([paragraph(text('a   b'))]);
        target.unmount();
    });

    // A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
    const here = dirname(fileURLToPath(import.meta.url));
    const valid = join(here, '..', '..', 'model', '__tests__', 'fixtures', 'model', 'valid');
    const security = join(here, '..', '..', 'html', '__tests__', 'fixtures', 'security');
    it.each(readdirSync(valid))(
        'parses the copied text/html and the toHTML output of %s to equal documents',
        (name) => {
            const stored = JSON.parse(readFileSync(join(valid, name), 'utf8')) as {
                readonly content: { readonly content: readonly JsonValue[] };
            };
            const mounted = mount({ blocks: stored.content.content });
            selectAll(mounted);
            const copied = copyFrom(mounted).html;
            const written = createCodecs(model).toHTML(mounted.handle.getSnapshot().document).html;
            const { schema } = mounted.view.state;
            const parsed = (html: string) =>
                schema.topNodeType.create(
                    null,
                    importHtml(html, schema, window, {
                        limits: defaultLimits,
                        headingLevels: undefined,
                        depth: 2,
                        colors: NO_COLORS,
                        rules: [],
                    }).content,
                );

            expect(parsed(copied).eq(parsed(written))).toBe(true);
            mounted.unmount();
        },
    );

    const withoutIds = (value: unknown): unknown =>
        JSON.parse(JSON.stringify(value, (property, item: unknown) => (property === 'nodeId' ? undefined : item)));
    /** What `fromHTML` makes of the copied text/html of `blocks` under `editorModel`, with the mounted source content. */
    const roundTrip = (editorModel: ContentModel, blocks: readonly JsonValue[]) => {
        const mounted = mount({ editorModel, blocks });
        selectAll(mounted);
        const { html } = copyFrom(mounted);
        const source = mounted.handle.getSnapshot().document.content.content;
        mounted.unmount();
        const result = fromHTML(html, editorModel, { window });
        expect(result.status).toBe('editable');
        return { imported: result.status === 'editable' && result.document.content.content, source };
    };

    it('converts the copied text/html of the spaces fixture with fromHTML to the mounted source document', () => {
        const stored = JSON.parse(readFileSync(join(valid, 'spaces.json'), 'utf8')) as {
            readonly content: { readonly content: readonly JsonValue[] };
        };

        const { imported, source } = roundTrip(model, stored.content.content);

        expect(imported).not.toEqual([]);
        expect(JSON.stringify(imported)).toContain('two  spaces and five     spaces');
        expect(withoutIds(imported)).toEqual(withoutIds(source));
    });

    it('converts the copied text/html of runs of spaces in marks, list items and code with fromHTML to the mounted source document', () => {
        const { imported, source } = roundTrip(htmlModel, [
            block(text('a   b'), text('  x', mark('bold')), text('y   z')),
            node('bullet_list', undefined, node('list_item', undefined, block(text('item   two')))),
        ]);

        expect(JSON.stringify(imported)).toContain('item   two');
        expect(withoutIds(imported)).toEqual(withoutIds(source));
    });

    it('pastes the toHTML output of a document with an island without its notice as text', () => {
        const source = mount({
            blocks: [paragraph(text('before')), { type: 'callout', content: [paragraph(text('Kept'))] } as JsonValue],
        });
        const html = createCodecs(model).toHTML(source.handle.getSnapshot().document).html;
        source.unmount();
        const found = /data-rte-message="islands"[^>]*>([^<]+)</.exec(html);
        const notice = String(found?.[1]);
        const target = mount({ blocks: [paragraph()] });

        pasteInto(target, { 'text/html': html });

        expect(found).not.toBeNull();
        expect(JSON.stringify(target.content())).toContain('before');
        expect(JSON.stringify(target.content())).not.toContain(notice);
        target.unmount();
    });

    it('replaces each attribute value decode would reject with its default, so the document still decodes as editable', () => {
        const long = `en-x-${'abcdefgh-'.repeat(1000)}abcdefgh`;
        const mounted = mountHtml();

        pasteInto(mounted, {
            'text/html': `<ol start="-1"><li>a</li></ol><p><span lang="fr" dir="x">b</span></p><p lang="${long}">c</p><p><a href="https://x.io/${'a'.repeat(9000)}">d</a></p>`,
        });

        expect(mounted.content()).toEqual([
            node('ordered_list', { start: 1 }, node('list_item', undefined, block(text('a')))),
            block(text('b', mark('language', { lang: 'fr', dir: null }))),
            block(text('c')),
            block(text('d')),
        ]);
        expect(decodeDocument(mounted.handle.getSnapshot().document, htmlModel).status).toBe('editable');
        mounted.unmount();
    });

    it('applies maxAttributeLength of the editor limits, keeps a value exactly at it, and the default limit when none is given', () => {
        const html = '<p lang="en-x-abc">at</p><p lang="en-x-abcd">over</p><p><span lang="en-x-abcd">mark</span></p>';
        const limited = mountHtml({ limits: { maxAttributeLength: 8 } });
        const unlimited = mountHtml();

        pasteInto(limited, { 'text/html': html });
        pasteInto(unlimited, { 'text/html': html });

        expect(limited.content()).toEqual([
            node('paragraph', { lang: 'en-x-abc', align: null }, text('at')),
            block(text('over')),
            block(text('mark')),
        ]);
        expect(unlimited.content()).toEqual([
            node('paragraph', { lang: 'en-x-abc', align: null }, text('at')),
            node('paragraph', { lang: 'en-x-abcd', align: null }, text('over')),
            block(text('mark', mark('language', { lang: 'en-x-abcd', dir: null }))),
        ]);
        limited.unmount();
        unlimited.unmount();
    });

    // happy-dom's parser drops what follows a `script` inside `svg`, so `svg.html` runs through `fromHTML` in jsdom only.
    it.each(['math-mark.html', 'math.html', 'svg-foreign-object.html', 'svg-link.html'])(
        'pastes the SVG or MathML of %s as its text only',
        (name) => {
            const mounted = mountHtml();

            pasteInto(mounted, { 'text/html': readFileSync(join(security, name), 'utf8') });

            const content = mounted.content() as readonly { readonly type: string }[];
            expect(content.map(({ type }) => type)).toEqual(['paragraph', 'paragraph', 'paragraph']);
            expect(JSON.stringify(content)).not.toMatch(/"marks"|evil|javascript/);
            mounted.unmount();
        },
    );

    it('pastes an element whose required attribute passes maxAttributeLength as a paragraph of its text', () => {
        const slug = defineFeature({
            id: 'acme.slug',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: {
                acme_slug: {
                    group: 'block',
                    content: 'inline*',
                    attrs: { slug: { type: 'string', required: true } },
                    html: ['div', { class: 'acme-slug', 'data-slug': { attr: 'slug' } }, 0],
                    parse: [{ tag: 'div.acme-slug', attrs: { slug: { from: 'data-slug' } } }],
                },
            },
            formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
        });
        const editorModel = compileContentModel([...htmlFeatures(), slug()], { id: 'fixture.vocabulary', version: 1 });
        const mounted = mount({ editorModel, blocks: [block()] });

        pasteInto(mounted, { 'text/html': `<div class="acme-slug" data-slug="${'s'.repeat(10_000)}">kept</div>` });

        expect(mounted.content()).toEqual([block(text('kept'))]);
        expect(decodeDocument(mounted.handle.getSnapshot().document, editorModel).status).toBe('editable');
        mounted.unmount();
    });

    const bareLink = defineFeature({
        id: 'fixture.bare-link',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        marks: { plain_link: { attrs: {}, html: ['a', 0], parse: [{ tag: 'a' }], rank: -2 } },
    });
    const bareSpan = defineFeature({
        id: 'fixture.bare-span',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        marks: { plain_span: { attrs: {}, html: ['span', 0], parse: [{ tag: 'span' }] } },
    });
    it.each([
        ['a[href] after a bare a', [core(), bareLink(), htmlLink()], '<a href="https://x.io">x</a>', 'link'],
        ['a[href] before a bare a', [core(), htmlLink(), bareLink()], '<a href="https://x.io">x</a>', 'link'],
        ['span[lang] after a bare span', [core(), bareSpan(), language()], '<span lang="fr">x</span>', 'language'],
        ['span[lang] before a bare span', [core(), language(), bareSpan()], '<span lang="fr">x</span>', 'language'],
        ['a bare a after a[href], with no href', [core(), htmlLink(), bareLink()], '<a>x</a>', 'plain_link'],
        [
            'a bare span after span[lang], with no lang',
            [core(), language(), bareSpan()],
            '<span>x</span>',
            'plain_span',
        ],
    ] as const)(
        'takes a mark rule with an attribute selector over a bare tag in either model order, with %s',
        (_name, installed, html, type) => {
            const editorModel = compileContentModel(installed, { id: 'fixture.vocabulary', version: 1 });
            const mounted = mount({ editorModel, blocks: [{ type: 'paragraph', attrs: { lang: null } }] });

            pasteInto(mounted, { 'text/html': `<p>${html}</p>` });

            const paragraphs = mounted.content() as readonly {
                readonly content: readonly { readonly marks: readonly { readonly type: string }[] }[];
            }[];
            expect(
                paragraphs.flatMap((child) => child.content.flatMap((run) => run.marks.map((entry) => entry.type))),
            ).toEqual([type]);
            mounted.unmount();
        },
    );

    const pullQuote = defineFeature({
        id: 'acme.pull-quote',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            acme_pull_quote: {
                group: 'block',
                content: 'inline*',
                attrs: { tone: { type: 'enum', values: ['neutral', 'brand'], default: 'neutral' } },
                html: ['blockquote', { class: 'acme-pull-quote', 'data-tone': { attr: 'tone' } }, 0],
                parse: [{ tag: 'blockquote.acme-pull-quote', attrs: { tone: { from: 'data-tone' } } }],
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    });
    const aside = defineFeature({
        id: 'fixture.aside',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            aside: { group: 'block', content: 'block+', attrs: {}, html: ['aside', 0], parse: [{ tag: 'blockquote' }] },
        },
    });
    it.each([
        [
            'blocks.quote first',
            [core(), quote(), pullQuote()],
            '<blockquote class="acme-pull-quote">x</blockquote>',
            'acme_pull_quote',
        ],
        [
            'the custom feature first',
            [core(), pullQuote(), quote()],
            '<blockquote class="acme-pull-quote">x</blockquote>',
            'acme_pull_quote',
        ],
        [
            'blocks.quote before a bare-tag rule',
            [core(), quote(), aside()],
            '<blockquote><p>x</p></blockquote>',
            'blockquote',
        ],
        [
            'a bare-tag rule before blocks.quote',
            [core(), aside(), quote()],
            '<blockquote><p>x</p></blockquote>',
            'aside',
        ],
    ] as const)('takes the more specific rule, then model order, with %s', (_name, installed, html, type) => {
        const editorModel = compileContentModel(installed, { id: 'fixture.vocabulary', version: 1 });
        const mounted = mount({ editorModel, blocks: [{ type: 'paragraph', attrs: { lang: null } }] });

        pasteInto(mounted, { 'text/html': html });

        expect((mounted.content() as readonly { readonly type: string }[]).map((child) => child.type)).toEqual([type]);
        mounted.unmount();
    });
});
