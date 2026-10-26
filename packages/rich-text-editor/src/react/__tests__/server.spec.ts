/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const DOM_GLOBALS = ['document', 'window', 'navigator'] as const;
const saved = DOM_GLOBALS.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)] as const);

const load = async () => ({
    features: await import('#/plugins'),
    index: await import('#/index'),
    model: await import('#/model'),
    testing: await import('#/testing'),
});
let loaded: Awaited<ReturnType<typeof load>>;

// `prosemirror-view` reads `navigator` and `document` with `typeof` at module load, so the getters go in after the imports.
beforeAll(async () => {
    delete (globalThis as Record<string, unknown>).navigator;
    loaded = await load();
    for (const name of DOM_GLOBALS) {
        Object.defineProperty(globalThis, name, {
            configurable: true,
            get: () => {
                throw new Error(`${name} was read on the server`);
            },
        });
    }
});
afterAll(() => {
    for (const [name, descriptor] of saved) {
        if (descriptor === undefined) {
            delete (globalThis as Record<string, unknown>)[name];
        } else {
            Object.defineProperty(globalThis, name, descriptor);
        }
    }
});

describe('RichTextEditor on the server', () => {
    it('renders an empty surface container, attaches no view and reads no DOM global', () => {
        const { index, model: entry, testing } = loaded;
        const plugins = [index.corePlugin(), index.boldPlugin()] as const;
        const model = index.modelOf(plugins, { id: 'test.server', version: 1 });
        const definition = index.defineEditor({ id: 'test.server', model, plugins });
        const defaultValue = { documentId: 'document-1', revision: null, document: entry.createEmptyDocument(model) };

        const html = renderToString(
            createElement(index.RichTextEditor, { 'aria-label': 'Notes', definition, defaultValue }),
        );

        expect(html).toBe(
            '<div lang="en-US" data-test-id="fondue-rich-text-editor" aria-busy="true"><div class="fondue-rte-content" role="textbox" aria-multiline="true" aria-label="Notes" lang="en-US" dir="ltr" spellcheck="true" data-test-id="fondue-rich-text-editor-surface" data-rte-surface=""></div><div aria-live="polite" style="position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap" data-test-id="fondue-rich-text-editor-announcer"></div><div class="_root_78573e" data-rte-overlays=""></div></div>',
        );
        expect(testing.probeRuntimes().views).toEqual([]);
    });
});
