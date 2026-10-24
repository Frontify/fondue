/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { createPortalStore, type PortalEntry } from '../portals';

const entryOf = (key: string): PortalEntry => ({
    key,
    slot: document.createElement('div'),
    component: () => null,
    state: {} as PortalEntry['state'],
    place: () => {},
});

describe('the portal store', () => {
    it('returns the new portal set right after a change, before any microtask', () => {
        const store = createPortalStore();
        const first = entryOf('a');
        const second = entryOf('b');

        store.set(first);
        expect(store.getSnapshot()).toEqual([first]);

        store.set(second);
        expect(store.getSnapshot()).toEqual([first, second]);

        store.remove('a');
        expect(store.getSnapshot()).toEqual([second]);
    });

    it('builds one snapshot for many changes in one tick and reuses it until the next change', () => {
        const store = createPortalStore();

        for (let index = 0; index < 1000; index++) {
            store.set(entryOf(`key-${index}`));
        }

        const snapshot = store.getSnapshot();
        expect(snapshot).toHaveLength(1000);
        expect(store.getSnapshot()).toBe(snapshot);
    });

    it('notifies listeners once for several changes in one tick', async () => {
        const store = createPortalStore();
        const listener = vi.fn();
        store.subscribe(listener);

        store.set(entryOf('a'));
        store.set(entryOf('b'));
        store.remove('a');
        expect(listener).not.toHaveBeenCalled();

        await Promise.resolve();
        expect(listener).toHaveBeenCalledTimes(1);
        expect(store.getSnapshot()).toHaveLength(1);
    });
});
