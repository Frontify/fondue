/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { probeHarness } from '#/features/__tests__/fixtures/editor-api';
import { bold } from '#/features/marks-bold/feature';

import { facetsOf } from '../live-api';
import { defineEditorPart, type EditorApi } from '../plugin';

let live: EditorApi | undefined;

const { mount } = probeHarness({
    script: () => () => false,
    setScript: () => undefined,
    setLive: (api) => {
        live = api;
    },
});

/** The live API of a mounted editor, which its standing overlay reads. */
const apiOf = (): EditorApi => {
    mount();
    if (live === undefined) {
        throw new Error('The editor gave no API.');
    }
    return live;
};

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    live = undefined;
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
});

describe('the facets a part declares in needs', () => {
    it('type-checks a command that reads a facet it declared', () => {
        const part = defineEditorPart(bold, {
            needs: ['marks'],
            commands: {
                'fixture.bold': {
                    run: (api) => {
                        expectTypeOf(api.marks).toBeObject();
                        return api.marks.toggle('bold');
                    },
                },
            },
        });

        expect(part.needs).toEqual(['marks']);
    });

    it('refuses to type-check a command that reads a facet it did not declare', () => {
        const readsHistory = (api: EditorApi<'history'>) => api.history.undo();
        const readsMarks = (api: EditorApi<'marks'>) => api.marks.toggle('bold');

        defineEditorPart(bold, {
            needs: ['marks'],
            // @ts-expect-error: `history` is not in `needs`.
            commands: { 'fixture.bold': { run: readsHistory } },
        });
        defineEditorPart(bold, {
            // @ts-expect-error: a part with no `needs` gets the control members only.
            commands: { 'fixture.bold': { run: readsMarks } },
        });

        expectTypeOf<EditorApi<'marks'>>().toHaveProperty('marks');
        expectTypeOf<EditorApi<'marks'>>().not.toHaveProperty('history');
        expectTypeOf<EditorApi<'marks'>>().toHaveProperty('selectedText');
    });

    it('refuses a key handler typed against the full API where the part declares less', () => {
        const readsAll = (api: EditorApi) => api.history.undo();

        defineEditorPart(bold, {
            needs: ['marks'],
            // @ts-expect-error: the part's API holds no `history`.
            keys: { 'Mod-b': readsAll },
        });
    });
});

describe('facetsOf', () => {
    it('keeps the control members and the declared facets', () => {
        const api = apiOf();

        const view = facetsOf(api, ['marks'], 'acme.bold');

        expect(view.selectedText).toBe(api.selectedText);
        expect(view.marks).toBe(api.marks);
    });

    it('names the feature and the facet when development code reads an undeclared one', () => {
        const view = facetsOf(apiOf(), ['marks'], 'acme.bold');

        expect(() => view.history).toThrow('acme.bold reads api.history without declaring it in needs.');
    });

    it('leaves undeclared facets out of the keys, so a spread of the API never throws', () => {
        const view = facetsOf(apiOf(), ['marks'], 'acme.bold');

        expect(Object.keys(view)).toContain('marks');
        expect(Object.keys(view)).not.toContain('history');
        expect(() => ({ ...view })).not.toThrow();
    });

    it('holds one object for each API and feature, so a command run allocates none', () => {
        const api = apiOf();

        expect(facetsOf(api, ['marks'], 'acme.bold')).toBe(facetsOf(api, ['marks'], 'acme.bold'));
        expect(facetsOf(api, ['marks'], 'acme.bold')).not.toBe(facetsOf(api, ['marks'], 'acme.italic'));
    });

    it('holds no undeclared facet in production', () => {
        vi.stubEnv('NODE_ENV', 'production');

        const view = facetsOf(apiOf(), ['marks'], 'acme.bold');

        expect('history' in view).toBe(false);
        expect(view.marks).toBeDefined();
    });
});
