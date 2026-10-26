/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import MarkdownIt from 'markdown-it';
import { DOMParser as SchemaParser } from 'prosemirror-model';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { link, mark, node, paragraph, text } from '#/features/__tests__/fixtures/documents';
import { type JsonValue } from '#/model';
import { loadMarkdownReader } from '#/runtime/clipboard/markdown';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { pressKey, setSelection } from '#/testing';

import {
    MIB,
    mount,
    type Mounted,
    pasteInto,
    pasteEventInto,
    dropInto,
    copyFrom,
    releaseShift,
    undo,
    slicePayload,
    textOf,
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
        const converted = mounted.content() as readonly { type: string }[];
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
