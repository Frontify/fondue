/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { fixturesIn } from '../../fixtures/reader/helpers';

type Globals = { navigator?: unknown };
const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

// Node 21 and later define `navigator` as a configurable global, which the tests delete for the length of the file.
beforeAll(() => {
    delete (globalThis as Globals).navigator;
});
afterAll(() => {
    if (navigatorDescriptor !== undefined) {
        Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
    }
});

describe('./features with no DOM globals', () => {
    it.each(fixturesIn('valid'))(
        'SPEC-rich-text/AC-013 imports ./features and decodes %s with a model of its factories',
        async (_, fixture) => {
            expect([typeof window, typeof document, typeof navigator]).toEqual(['undefined', 'undefined', 'undefined']);
            vi.resetModules();
            const features = await import('#/features');
            const { compileContentModel, decodeDocument } = await import('#/model');
            const model = compileContentModel(features.featuresById(['core', 'marks.bold']), {
                id: (fixture as { model: { id: string } }).model.id,
                version: 1,
            });

            expect(decodeDocument(fixture, model).status).toBe('editable');
        },
    );
});
