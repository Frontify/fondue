/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { Node } from 'prosemirror-model';
import { createRef } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { featuresById } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, hashDocument } from '#/model';
import { type hashDocument as RealHash } from '#/model/hash';
import { runtimeOf } from '#/runtime/runtime';
import { typeText } from '#/testing';

import { PERF_FEATURES, perfDocument } from '../../model/__tests__/fixtures/perf/documents';

// The spy wraps the real function, since the editor still hashes a document where it must, such as a replacement.
const hashes = vi.hoisted(() => ({ calls: 0 }));
vi.mock('#/model/hash', async (importOriginal) => {
    const original = await importOriginal<{ readonly hashDocument: typeof RealHash }>();
    return {
        ...original,
        hashDocument: (...args: Parameters<typeof RealHash>) => {
            hashes.calls += 1;
            return original.hashDocument(...args);
        },
    };
});

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

it('serializes, hashes and calls toJSON on no document over 100 keystrokes in the large fixture', () => {
    const model = compileContentModel(featuresById([...PERF_FEATURES, 'a11y.content-checks']), {
        id: 'test.keystroke-cost',
        version: 1,
    });
    const definition = defineEditor({ id: 'test.keystroke-cost', model, plugins: unitsOf(model) });
    const ref = createRef<EditorHandle>();
    render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: perfDocument('large', model) }}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    const runtime = handle === null ? undefined : runtimeOf(handle);
    if (handle === null || runtime === undefined) {
        throw new Error('The editor did not mount.');
    }
    // A caret in the middle of the document, inside a text run.
    const middle = runtime.state.doc.resolve(runtime.state.doc.content.size / 2).start() + 2;
    act(() => {
        runtime.select({ anchor: middle, head: middle });
    });
    const toJSON = vi.spyOn(Node.prototype, 'toJSON');
    const stringify = vi.spyOn(JSON, 'stringify');
    hashes.calls = 0;
    const before = runtime.state.doc.textContent.length;

    for (let index = 0; index < 100; index += 1) {
        act(() => {
            typeText(handle, 'a');
        });
    }

    expect(runtime.state.doc.textContent.length).toBe(before + 100);
    expect(toJSON).not.toHaveBeenCalled();
    expect(hashes.calls).toBe(0);
    // No serializer sees a document: a call with a long result would be one.
    expect(stringify.mock.results.filter(({ value }) => typeof value === 'string' && value.length > 100_000)).toEqual(
        [],
    );

    // The spies see what they guard: a serialization and a hash made now are counted.
    hashDocument(handle.getSnapshot().document);
    runtime.state.doc.toJSON();
    expect(hashes.calls).toBe(1);
    expect(toJSON).toHaveBeenCalled();
}, 120_000);

it('rejects typing from the byte limit on in the large fixture, counting bytes with no toJSON call', () => {
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.keystroke-limit', version: 1 });
    let document = perfDocument('large', model);
    const mountWith = (limits: { readonly maxDocumentBytes?: number }) => {
        const defaultValue = { documentId: 'document-1', revision: null, document };
        const definition = defineEditor({ id: 'test.keystroke-limit', model, limits, plugins: unitsOf(model) });
        const ref = createRef<EditorHandle>();
        const rendered = render(
            <RichTextEditor aria-label="Notes" definition={definition} defaultValue={defaultValue} ref={ref} />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const runtime = ref.current === null ? undefined : runtimeOf(ref.current);
        if (ref.current === null || runtime === undefined) {
            throw new Error('The editor did not mount.');
        }
        return { handle: ref.current, runtime, unmount: rendered.unmount };
    };
    const loaded = mountWith({});
    const stored = loaded.handle.getSnapshot().document;
    // The editor counts every installed capability, since a keystroke may add content that needs any of them.
    document = { ...document, requiredCapabilities: stored.requiredCapabilities };
    const size = new TextEncoder().encode(
        JSON.stringify({ ...stored, requiredCapabilities: model.capabilities }),
    ).byteLength;
    loaded.unmount();
    const { handle, runtime } = mountWith({ maxDocumentBytes: size + 8 });
    const middle = runtime.state.doc.resolve(runtime.state.doc.content.size / 2).start() + 2;
    act(() => {
        runtime.select({ anchor: middle, head: middle });
    });
    const toJSON = vi.spyOn(Node.prototype, 'toJSON');

    const accepted: number[] = [];
    for (let index = 0; index < 100; index += 1) {
        const before = runtime.state.doc;
        act(() => {
            typeText(handle, 'y');
        });
        if (runtime.state.doc !== before) {
            accepted.push(index);
        }
    }

    expect(accepted).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    expect(toJSON).not.toHaveBeenCalled();
}, 120_000);
