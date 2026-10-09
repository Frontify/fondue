/* (c) Copyright Frontify Ltd., all rights reserved. */

import { highlight, highlightDocument } from '@frontify/fondue-rich-text-editor-fixture-feature';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { core } from '#/features/core/feature';
import { compileContentModel } from '#/model';

import { fixturesIn, renderReader } from '../../fixtures/reader/helpers';

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

describe('the outside fixture feature with no DOM globals', () => {
    it('SPEC-rich-text/AC-017 renders in the reader and writes through every codec', () => {
        expect([typeof window, typeof document, typeof navigator]).toEqual(['undefined', 'undefined', 'undefined']);
        const model = compileContentModel([core(), highlight()], { id: 'fixture.highlight', version: 1 });
        const codecs = createCodecs(model);
        const html = '<div><p>Read the <mark>highlighted</mark> part.</p></div>';

        expect(renderReader(highlightDocument, model)).toBe(html);
        expect(codecs.toHTML(highlightDocument)).toEqual({ html, diagnostics: [] });
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
