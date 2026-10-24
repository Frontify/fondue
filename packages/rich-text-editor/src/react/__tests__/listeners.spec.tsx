/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, RichTextEditor } from '#/index';

import { perfDocument, perfModel } from '../../model/__tests__/fixtures/perf/documents';

const EDITORS = 20;

// The engine adds one `selectionchange` listener per view, which AC-015 leaves out of the count (DR-123).
const ENGINE_FRAME = /[\\/]prosemirror-view[\\/]/;

/**
 * The net count of the listeners the package adds on `document` by event type: each `addEventListener` less the
 * removals of the same listener. A listener `prosemirror-view` adds is not counted.
 */
const watchDocumentListeners = () => {
    const live = new Map<string, Set<unknown>>();
    const add = document.addEventListener.bind(document);
    const remove = document.removeEventListener.bind(document);
    vi.spyOn(document, 'addEventListener').mockImplementation((type, listener, options) => {
        add(type, listener, options);
        if (ENGINE_FRAME.test(new Error('caller').stack ?? '')) {
            return;
        }
        const set = live.get(type) ?? new Set();
        set.add(listener);
        live.set(type, set);
    });
    vi.spyOn(document, 'removeEventListener').mockImplementation((type, listener, options) => {
        live.get(type)?.delete(listener);
        remove(type, listener, options);
    });
    return () => Object.fromEntries([...live].filter(([, set]) => set.size > 0).map(([type, set]) => [type, set.size]));
};

const mountEditors = async () => {
    const definition = defineEditor({ id: 'test.listeners', model: perfModel, plugins: unitsOf(perfModel) });
    const counts = watchDocumentListeners();
    const { container } = render(
        <>
            {Array.from({ length: EDITORS }, (_, index) => (
                <RichTextEditor
                    key={index}
                    aria-label={`Comment ${index}`}
                    definition={definition}
                    defaultValue={{
                        documentId: `document-${index}`,
                        revision: null,
                        document: perfDocument('small', perfModel),
                    }}
                />
            ))}
        </>,
    );
    await act(async () => {
        vi.advanceTimersToNextFrame();
        await vi.advanceTimersByTimeAsync(100);
    });
    const surfaces = [...container.querySelectorAll<HTMLElement>('[data-rte-surface]')];
    expect(surfaces).toHaveLength(EDITORS);
    return { counts, surfaces };
};

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

it('installs no document listener for editors nobody focuses and at most one per event type for the editors a user moves between', async () => {
    const { counts, surfaces } = await mountEditors();
    // React's `createRoot` adds its own `selectionchange` listener on the document, which the second test bounds.
    const others = () => Object.fromEntries(Object.entries(counts()).filter(([type]) => type !== 'selectionchange'));

    expect(others()).toEqual({});

    for (const surface of [surfaces[0], surfaces[1], surfaces[0]]) {
        act(() => {
            surface?.focus();
        });
        expect(Object.values(others()).every((count) => count === 1)).toBe(true);
        expect(Object.keys(others()).sort()).toEqual([
            'focusin',
            'focusout',
            'keydown',
            'pointercancel',
            'pointerdown',
            'pointerup',
        ]);
    }

    act(() => {
        (document.activeElement as HTMLElement | null)?.blur();
    });
    expect(others()).toEqual({});
}, 60_000);

it('installs at most one document selectionchange listener for all editors together', async () => {
    const { counts } = await mountEditors();

    expect(counts().selectionchange ?? 0).toBeLessThanOrEqual(1);
}, 60_000);
