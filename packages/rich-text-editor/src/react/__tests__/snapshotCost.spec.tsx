/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { featuresById } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';
import { type pointer as RealPointer } from '#/model/internal';
import { typeText } from '#/testing';

import { PERF_FEATURES, perfDocument } from '../../model/__tests__/fixtures/perf/documents';

// The spy wraps the real function, since a value that fails the JSON check still reports its path.
const pointers = vi.hoisted(() => ({ calls: 0 }));
vi.mock('#/model/errors', async (importOriginal) => {
    const original = await importOriginal<{ readonly pointer: typeof RealPointer }>();

    return {
        ...original,
        pointer: (...args: (string | number)[]) => {
            pointers.calls += 1;

            return original.pointer(...args);
        },
    };
});

let handle: EditorHandle | null = null;

// The large mount and the edit run in beforeEach under the hook timeout on purpose; the measured step and assertions keep the 5,000 ms default, and the mount's own time is the perf job's mount-large row.
beforeEach(async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.snapshot-cost', version: 1 });
    const definition = defineEditor({ id: 'test.snapshot-cost', model, plugins: unitsOf(model) });
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
    handle = ref.current;
    if (handle !== null) {
        const edited = handle;
        act(() => {
            typeText(edited, 'a');
        });
    }

    // The portal store renders the node views' chrome a microtask later.
    await act(async () => {
        await Promise.resolve();
    });
});
afterEach(() => {
    vi.useRealTimers();
});

it('builds no path while it snapshots the large fixture after an edit, and the snapshot stays frozen', () => {
    if (handle === null) {
        throw new Error('The editor did not mount.');
    }

    pointers.calls = 0;

    const { document } = handle.getSnapshot();

    expect(pointers.calls).toBe(0);
    expect(Object.isFrozen(document.content.content?.[0])).toBe(true);
});
