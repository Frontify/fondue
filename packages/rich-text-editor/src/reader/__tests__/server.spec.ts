/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { fixturesIn } from './helpers/helpers';

type Globals = { navigator?: unknown };
const globals = globalThis as Globals;
const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

// Node 21 and later define `navigator` as a configurable global, which the tests delete for the length of the file.
beforeAll(() => {
    delete globals.navigator;
});
afterAll(() => {
    if (navigatorDescriptor !== undefined) {
        Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
    }
});

/** Loads the fixture model and the entries through a fresh module graph, after the globals are gone. */
const load = async () => {
    vi.resetModules();
    const { semanticModel } = await import('./fixtures/semantic');
    const { renderToString } = await import('react-dom/server');
    const { createElement } = await import('react');
    const model = await import('#/model');
    const reader = await import('#/reader');
    return { semanticModel, renderToString, createElement, model, reader };
};

describe('the reader with no DOM globals', () => {
    it('runs with no window, document or navigator', () => {
        expect(typeof window).toBe('undefined');
        expect(typeof document).toBe('undefined');
        expect(typeof navigator).toBe('undefined');
    });

    it.each(fixturesIn('valid'))(
        'imports ./model and ./reader and renders %s with renderToString',
        async (_, fixture) => {
            const { semanticModel, renderToString, createElement, model, reader } = await load();

            expect(typeof model.decodeDocument).toBe('function');
            expect(typeof reader.defineReaderFeature).toBe('function');
            const html = renderToString(
                createElement(reader.RichTextReader, { document: fixture, model: semanticModel() }),
            );

            expect(html).toMatch(/^<div[ >]/);
            expect(html).not.toContain('data-rte-message');
        },
    );
});
