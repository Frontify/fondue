/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { ManyEditors } from './fixtures/ManyEditors';

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        documentListeners?: () => Record<string, number>;
    }
}

const EDITORS = 20;

/**
 * Counts the listeners the package adds on `document` by event type from now on: each add less the removals of the
 * same listener. The `selectionchange` listener `prosemirror-view` adds per view is not counted.
 */
const watchDocumentListeners = (page: Page) =>
    page.evaluate(() => {
        const live = new Map<string, Set<unknown>>();
        const add = document.addEventListener.bind(document);
        const remove = document.removeEventListener.bind(document);
        document.addEventListener = (type: string, listener: unknown, options?: unknown) => {
            add(type, listener as EventListener, options as AddEventListenerOptions);
            // The CT build bundles the engine into a hashed chunk, so its method name, not its path, marks the caller.
            if (/\bconnectSelection\b/.test(new Error('caller').stack ?? '')) {
                return;
            }
            const set = live.get(type) ?? new Set();
            set.add(listener);
            live.set(type, set);
        };
        document.removeEventListener = (type: string, listener: unknown, options?: unknown) => {
            live.get(type)?.delete(listener);
            remove(type, listener as EventListener, options as EventListenerOptions);
        };
        window.documentListeners = () =>
            Object.fromEntries([...live].filter(([, set]) => set.size > 0).map(([type, set]) => [type, set.size]));
    });

const countsOf = (page: Page) => page.evaluate(() => window.documentListeners?.() ?? {});
const withoutSelectionChange = async (page: Page) =>
    Object.entries(await countsOf(page)).filter(([type]) => type !== 'selectionchange');

const mountEditors = async (mount: (component: JSX.Element) => Promise<unknown>, page: Page) => {
    await watchDocumentListeners(page);
    await mount(<ManyEditors count={EDITORS} />);
    await expect(page.getByRole('textbox')).toHaveCount(EDITORS);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"][aria-busy]')).toHaveCount(0);
};

test('installs no document listener for 20 comment editors nobody focuses, and at most one per event type for the one a user focuses', async ({
    mount,
    page,
}) => {
    await mountEditors(mount, page);
    // The view's own `selectionchange` listener is counted by the next test.
    expect(await withoutSelectionChange(page)).toEqual([]);

    for (const index of [0, 1, 0]) {
        await page.getByRole('textbox').nth(index).click();
        const counts = await withoutSelectionChange(page);

        expect(counts.length).toBeGreaterThan(0);
        expect(counts.every(([, count]) => count === 1)).toBe(true);
    }

    await page.getByRole('textbox').nth(0).blur();
    expect(await withoutSelectionChange(page)).toEqual([]);
});

test('installs at most one document selectionchange listener for 20 comment editors together', async ({
    mount,
    page,
}) => {
    await mountEditors(mount, page);

    const counts = await countsOf(page);

    expect(counts.selectionchange ?? 0).toBeLessThanOrEqual(1);
});
