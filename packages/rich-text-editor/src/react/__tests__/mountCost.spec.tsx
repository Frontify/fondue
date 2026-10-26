/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { featuresById } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';
import { runtimeOf } from '#/runtime/runtime';

import { PERF_FEATURES, perfDocument } from '../../model/__tests__/fixtures/perf/documents';

let rewritten: string[] = [];
let decorated: Element | null = null;

// The large mount runs in beforeEach under the hook timeout on purpose; the measured step and assertions keep the 5,000 ms default, and the mount's own time is the perf job's mount-large row.
beforeEach(async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.mount-cost', version: 1 });
    const definition = defineEditor({ id: 'test.mount-cost', model, plugins: unitsOf(model) });
    const ref = createRef<EditorHandle>();
    const container = document.createElement('div');
    document.body.append(container);
    const observer = new MutationObserver(() => undefined);
    observer.observe(container, { attributes: true, subtree: true });
    const drawn = new WeakSet<Node>();

    render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: perfDocument('large', model) }}
            ref={ref}
        />,
        { container },
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    const view = handle === null ? undefined : runtimeOf(handle)?.view;
    const surface = view?.dom;
    if (surface === undefined) {
        observer.disconnect();
        throw new Error('The editor did not mount.');
    }

    const records = observer.takeRecords();
    for (const node of surface.querySelectorAll('*')) {
        drawn.add(node);
    }

    decorated = surface.querySelector('[style], [class], [dir]');
    // The portal store renders the node views' chrome a microtask later.
    await act(async () => {
        await Promise.resolve();
    });
    records.push(...observer.takeRecords());
    observer.disconnect();
    // Count a rewrite of a node drawn before the flush, even one a redraw has since detached.
    rewritten = records
        .filter(({ target }) => target !== surface && (drawn.has(target) || surface.contains(target)))
        .map(({ attributeName }) => attributeName ?? '');
});
afterEach(() => {
    vi.useRealTimers();
});

it('draws the large fixture with its decorations once, rewriting no attribute of a drawn node before ready', () => {
    expect(decorated).not.toBeNull();
    expect(rewritten).toEqual([]);
});
