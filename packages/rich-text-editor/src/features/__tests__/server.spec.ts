/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { fixturesIn } from '#/reader/__tests__/helpers/helpers';

type Globals = { navigator?: unknown };
const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

/** Loads the entries through a fresh module graph, after the globals are gone. */
const load = async () => {
    vi.resetModules();
    const features = await import('#/features');
    const model = await import('#/model');
    const codecs = await import('#/codecs');
    const outside = await import('#/features/__tests__/fixtures/outside-feature');
    const { renderReader } = await import('#/reader/__tests__/helpers/helpers');
    return { features, model, codecs, outside, renderReader };
};
let loaded: Awaited<ReturnType<typeof load>>;

// Node 21 and later define `navigator` as a configurable global, which the tests delete for the length of the file.
beforeAll(async () => {
    delete (globalThis as Globals).navigator;
    loaded = await load();
});
afterAll(() => {
    if (navigatorDescriptor !== undefined) {
        Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
    }
});

describe('./features with no DOM globals', () => {
    it.each(fixturesIn('valid'))('imports ./features and decodes %s with a model of its factories', (_, fixture) => {
        expect([typeof window, typeof document, typeof navigator]).toEqual(['undefined', 'undefined', 'undefined']);
        const { features, model: entry } = loaded;
        const model = entry.compileContentModel(features.featuresById(['core', 'marks.bold']), {
            id: (fixture as { model: { id: string } }).model.id,
            version: 1,
        });

        expect(entry.decodeDocument(fixture, model).status).toBe('editable');
    });
});

describe('the outside fixture feature with no DOM globals', () => {
    it('renders in the reader and writes through every codec', () => {
        expect([typeof window, typeof document, typeof navigator]).toEqual(['undefined', 'undefined', 'undefined']);
        const { features, model: entry, codecs: codecEntry, outside, renderReader } = loaded;
        const { highlight, highlightDocument } = outside;
        const model = entry.compileContentModel([features.core(), features.heading(), features.align(), highlight()], {
            id: 'fixture.highlight',
            version: 1,
        });
        const codecs = codecEntry.createCodecs(model);
        const html = '<div class="fondue-rte-content"><p dir="auto">Read the <mark>highlighted</mark> part.</p></div>';

        expect(renderReader(highlightDocument, model)).toBe(html);
        expect(codecs.toHTML(highlightDocument)).toEqual({ html, css: '', diagnostics: [] });
        expect(codecs.toPlainText(highlightDocument)).toEqual({
            text: 'Read the highlighted part.',
            losses: [{ featureId: 'fixture.highlight', count: 1 }],
            diagnostics: [],
        });
        expect(codecs.toMarkdown(highlightDocument)).toEqual({
            markdown: 'Read the highlighted part.',
            losses: [{ featureId: 'fixture.highlight', count: 1 }],
            diagnostics: [],
        });
    });
});
