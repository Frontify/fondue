/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { defaultIdSource, type IdSource, type RuntimeEnvironment } from '#/model';

const kinds = ['node', 'operation', 'session', 'target'] as const;

describe('default ID source', () => {
    it('gives a distinct ID for each of 10,000 calls per kind', () => {
        for (const kind of kinds) {
            const ids = new Set<string>();
            for (let call = 0; call < 10_000; call += 1) {
                ids.add(defaultIdSource.next(kind));
            }
            expect(ids.size).toBe(10_000);
        }
    });

    it('gives a distinct version 4 UUID for each of 10,000 calls per kind when crypto.randomUUID is absent', () => {
        const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
        const original = Object.getOwnPropertyDescriptor(crypto, 'randomUUID');
        Object.defineProperty(crypto, 'randomUUID', { configurable: true, value: undefined });
        try {
            expect(typeof crypto.randomUUID).toBe('undefined');
            for (const kind of kinds) {
                const ids = new Set<string>();
                for (let call = 0; call < 10_000; call += 1) {
                    const id = defaultIdSource.next(kind);
                    expect(id).toMatch(uuid);
                    ids.add(id);
                }
                expect(ids.size).toBe(10_000);
            }
        } finally {
            if (original !== undefined) {
                Object.defineProperty(crypto, 'randomUUID', original);
            } else {
                Reflect.deleteProperty(crypto, 'randomUUID');
            }
        }
    });

    it('builds a RuntimeEnvironment with test doubles for the rest', () => {
        expect(typeof crypto.randomUUID).toBe('function');
        const ids: IdSource = defaultIdSource;
        const environment = {
            clock: { now: () => 1, setTimeout: () => 1, clearTimeout: () => undefined },
            ids,
            random: () => 0.5,
            scheduler: {
                microtask: () => undefined,
                frame: () => 1,
                cancelFrame: () => undefined,
                idle: () => 1,
                cancelIdle: () => undefined,
            },
        } satisfies RuntimeEnvironment;

        expect(environment.ids.next('node')).toMatch(
            /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/,
        );
    });
});
