/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { blockquote, link, mark, mention, node, paragraph, text } from '#/features/__tests__/fixtures/documents';
import { type JsonValue } from '#/model';
import { loadMarkdownReader } from '#/runtime/clipboard/markdown';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { setSelection } from '#/testing';

import { mount, pasteInto, pasteEventInto, copyFrom, selectAll, slicePayload } from './fixtures/mount';

// Paste reads Markdown only after an editor's first idle moment, which these synchronous cases do not wait for.
beforeAll(loadMarkdownReader);

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
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

        expect((JSON.parse(flavors.slice) as { content: unknown[] }).content[1]).toEqual({
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

        const written = JSON.stringify((JSON.parse(flavors.slice) as { content: unknown[] }).content);
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
