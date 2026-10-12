/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { fixturesIn } from '../../reader/__tests__/helpers/helpers';

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

/** Loads the fixture model and the entry through a fresh module graph, after the globals are gone. */
const load = async () => {
    vi.resetModules();
    const { semanticModel } = await import('../../reader/__tests__/fixtures/semantic');
    const codecs = await import('#/codecs');
    return { semanticModel, codecs };
};

describe('the codecs with no DOM globals', () => {
    it('runs with no window, document or navigator', () => {
        expect(typeof window).toBe('undefined');
        expect(typeof document).toBe('undefined');
        expect(typeof navigator).toBe('undefined');
    });

    it.each(fixturesIn('valid'))('imports ./codecs and runs %s through every codec', async (_, fixture) => {
        const { semanticModel, codecs } = await load();
        const { toHTML, toPlainText, toMarkdown, fromMarkdown } = codecs.createCodecs(semanticModel());
        const document = fixture as Parameters<typeof toHTML>[0];

        expect(toHTML(document).html).toMatch(/^<div[ >]/);
        expect(toPlainText(document).text).not.toBe('');
        const { markdown } = toMarkdown(document);
        expect(markdown).not.toBe('');
        expect(fromMarkdown(markdown).status).toBe('editable');
    });
});
