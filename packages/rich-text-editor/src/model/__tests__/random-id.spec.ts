/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';

import { randomId } from '../random-id';

const VERSION_4_UUID = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/;

const distinctIds = (count: number): Set<string> => {
    const ids = new Set<string>();
    for (let call = 0; call < count; call += 1) {
        const id = randomId();
        expect(id).toMatch(VERSION_4_UUID);
        ids.add(id);
    }
    return ids;
};

describe('randomId', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('gives a distinct version 4 UUID for each of 10,000 calls', () => {
        expect(distinctIds(10_000).size).toBe(10_000);
    });

    it('gives a distinct version 4 UUID for each of 10,000 calls without crypto.randomUUID', () => {
        vi.stubGlobal('crypto', { getRandomValues: crypto.getRandomValues.bind(crypto) });
        expect(crypto.randomUUID).toBeUndefined();
        expect(distinctIds(10_000).size).toBe(10_000);
    });
});
