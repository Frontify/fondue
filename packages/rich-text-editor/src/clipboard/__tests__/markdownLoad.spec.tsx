/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type mountProfile } from '#/react/__tests__/fixtures/profiles';
import { type paste } from '#/testing';

const MARKDOWN = '# Title';

type Mounted = Awaited<ReturnType<typeof mountProfile>>;

/** The block types of the view's document, which the handle's snapshot lags behind. */
const typesOf = ({ view }: Mounted) => view.state.doc.children.map(({ type }) => type.name);

// A fresh module graph per test, whose Markdown reader has not loaded; the cold imports are a hook's work, which has the longer timeout.
let modules: {
    readonly mountProfile: typeof mountProfile;
    readonly paste: typeof paste;
};

/** Mounts a Document editor from the fresh module graph once its surface takes input. */
const mountFresh = async () => {
    const mounted = await modules.mountProfile('document');
    await vi.waitFor(() => expect(mounted.view.dom).toHaveAttribute('contenteditable', 'true'));

    return mounted;
};

const pasteText = ({ handle }: Mounted, text: string) => {
    act(() => {
        modules.paste(handle, { text });
    });
};

describe('the Markdown reader of paste', () => {
    const pending = new Map<number, () => void>();
    let cancelled: number[] = [];

    beforeEach(async () => {
        vi.resetModules();
        const profiles = await import('#/react/__tests__/fixtures/profiles');
        const testing = await import('#/testing');
        modules = { mountProfile: profiles.mountProfile, paste: testing.paste };
        let next = 0;
        pending.clear();
        cancelled = [];
        vi.stubGlobal('requestIdleCallback', (callback: () => void) => {
            next += 1;
            pending.set(next, callback);

            return next;
        });
        vi.stubGlobal('cancelIdleCallback', (id: number) => {
            cancelled.push(id);
            pending.delete(id);
        });
    });

    afterEach(() => {
        // Disposal cancels the idle start, so it runs while the stubs stand.
        cleanup();
        vi.unstubAllGlobals();
    });

    it('schedules the load on idle after mount and cancels it when the editor is disposed first', async () => {
        const mounted = await mountFresh();

        expect([...pending.keys()]).toEqual([1]);
        mounted.rendered.unmount();

        expect(cancelled).toEqual([1]);
        expect(pending.size).toBe(0);
    });

    it('pastes Markdown as plain text until the reader has loaded, then converts it', async () => {
        const mounted = await mountFresh();

        pasteText(mounted, MARKDOWN);
        const before = [typesOf(mounted), mounted.view.state.doc.textContent];
        await act(async () => {
            for (const start of pending.values()) {
                start();
            }

            await vi.dynamicImportSettled();
        });
        pasteText(mounted, MARKDOWN);

        expect(before).toEqual([['paragraph'], MARKDOWN]);
        expect(typesOf(mounted)).toEqual(['paragraph', 'heading']);
    });
});
