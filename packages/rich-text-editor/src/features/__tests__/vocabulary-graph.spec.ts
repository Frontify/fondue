/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

// Every module a vocabulary entry must never load: the engine, React's DOM renderer, and the editor parts and layers.
const { loaded, recorded } = vi.hoisted(() => {
    const names = new Set<string>();
    return {
        loaded: names,
        recorded:
            (name: string) =>
            async (importOriginal: () => Promise<unknown>): Promise<unknown> => {
                names.add(name);
                return importOriginal();
            },
    };
});

vi.mock('react', recorded('react'));
vi.mock('react-dom', recorded('react-dom'));
vi.mock('react-dom/server', recorded('react-dom/server'));
vi.mock('prosemirror-commands', recorded('prosemirror-commands'));
vi.mock('prosemirror-dropcursor', recorded('prosemirror-dropcursor'));
vi.mock('prosemirror-gapcursor', recorded('prosemirror-gapcursor'));
vi.mock('prosemirror-history', recorded('prosemirror-history'));
vi.mock('prosemirror-keymap', recorded('prosemirror-keymap'));
vi.mock('prosemirror-model', recorded('prosemirror-model'));
vi.mock('prosemirror-schema-list', recorded('prosemirror-schema-list'));
vi.mock('prosemirror-state', recorded('prosemirror-state'));
vi.mock('prosemirror-tables', recorded('prosemirror-tables'));
vi.mock('prosemirror-transform', recorded('prosemirror-transform'));
vi.mock('prosemirror-view', recorded('prosemirror-view'));
vi.mock('@frontify/fondue-components', recorded('@frontify/fondue-components'));
vi.mock('#/bridge/plugin', recorded('#/bridge/plugin'));
vi.mock('#/react/define', recorded('#/react/define'));
vi.mock('#/runtime/runtime', recorded('#/runtime/runtime'));
vi.mock('#/runtime/editorApi', recorded('#/runtime/editorApi'));
vi.mock('#/features/marks-bold/editor', recorded('#/features/marks-bold/editor'));
vi.mock('#/features/links/editor', recorded('#/features/links/editor'));
vi.mock('#/features/links/link-popover', recorded('#/features/links/link-popover'));
vi.mock('#/features/links/link-bubble', recorded('#/features/links/link-bubble'));
vi.mock('#/features/nav-outline/editor', recorded('#/features/nav-outline/editor'));
vi.mock('#/features/nav-outline/outline-panel', recorded('#/features/nav-outline/outline-panel'));

type Entries = Awaited<ReturnType<typeof loadVocabulary>>;

/** Loads the vocabulary entries through a fresh module graph. */
const loadVocabulary = async () => {
    vi.resetModules();
    loaded.clear();
    const { compileContentModel } = await import('#/model');
    const { featuresById } = await import('#/features');
    const { registry } = await import('#/features/registry');
    return { compileContentModel, featuresById, registry };
};
const loadCodecs = () => import('#/codecs');
const modelOf = ({ compileContentModel, featuresById, registry }: Entries) =>
    compileContentModel(featuresById(Object.keys(registry)), { id: 'test.vocabulary', version: 1 });

describe('the vocabulary graph', () => {
    describe('with ./codecs', () => {
        let entries: Entries;
        let codecs: Awaited<ReturnType<typeof loadCodecs>>;
        beforeEach(async () => {
            entries = await loadVocabulary();
            codecs = await loadCodecs();
        });

        it('loads neither React, the engine nor any editor part for ./model, ./features and ./codecs', () => {
            codecs.createCodecs(modelOf(entries));

            expect([...loaded]).toEqual([]);
        });
    });

    describe('with ./reader', () => {
        let entries: Entries;
        beforeEach(async () => {
            entries = await loadVocabulary();
            await import('#/entries/reader');
        });

        it('loads React for ./reader, which renders with it, and still no engine, DOM renderer or editor part', () => {
            modelOf(entries);

            expect([...loaded]).toEqual(['react']);
        });
    });
});
