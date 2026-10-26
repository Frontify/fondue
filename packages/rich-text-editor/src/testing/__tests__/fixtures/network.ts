/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterAll, beforeAll, expect } from 'vitest';

export const NETWORK = ['fetch', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon'] as const;

/**
 * Replaces `fetch`, `XMLHttpRequest`, `WebSocket` and `navigator.sendBeacon` with stubs that throw on any use, for the
 * length of the calling file. `attempts` logs every use, and the file fails if any use is left in it after its tests.
 */
export const failNetworkInThisFile = (): { readonly attempts: string[] } => {
    const attempts: string[] = [];
    const failing = (name: string) =>
        // A function, not an arrow, since `new XMLHttpRequest()` and `new WebSocket()` construct it.
        function failingStub() {
            attempts.push(name);
            throw new Error(`The runtime may not call ${name}.`);
        };

    const originals = new Map<string, PropertyDescriptor | undefined>();
    const replace = (target: object, name: string, key: string) => {
        originals.set(key, Object.getOwnPropertyDescriptor(target, name));
        Object.defineProperty(target, name, { configurable: true, writable: true, value: failing(key) });
    };

    const restore = (target: object, name: string, key: string) => {
        const original = originals.get(key);
        if (original === undefined) {
            Reflect.deleteProperty(target, name);
        } else {
            Object.defineProperty(target, name, original);
        }
    };

    beforeAll(() => {
        for (const name of ['fetch', 'XMLHttpRequest', 'WebSocket']) {
            replace(globalThis, name, name);
        }

        replace(globalThis.navigator, 'sendBeacon', 'navigator.sendBeacon');
    });
    afterAll(() => {
        for (const name of ['fetch', 'XMLHttpRequest', 'WebSocket']) {
            restore(globalThis, name, name);
        }

        restore(globalThis.navigator, 'sendBeacon', 'navigator.sendBeacon');
        expect(attempts).toEqual([]);
    });

    return { attempts };
};
