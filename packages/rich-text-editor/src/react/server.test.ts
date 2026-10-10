/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { bold, core } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel, createEmptyDocument } from '#/model';
import { probeRuntimes } from '#/testing/probe';

const DOM_GLOBALS = ['document', 'window', 'navigator'] as const;
const saved = DOM_GLOBALS.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)] as const);

// `prosemirror-view` reads `navigator` and `document` with `typeof` at module load, so the getters go in after the imports.
beforeAll(() => {
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
    it('SPEC-rich-text-output/AC-011 renders an empty surface container, attaches no view and reads no DOM global', () => {
        const model = compileContentModel([core(), bold()], { id: 'test.server', version: 1 });
        const definition = defineEditor({ id: 'test.server', model });
        const defaultValue = { documentId: 'document-1', revision: null, document: createEmptyDocument(model) };

        const html = renderToString(createElement(RichTextEditor, { 'aria-label': 'Notes', definition, defaultValue }));

        expect(html).toBe(
            '<div lang="en-US" data-test-id="fondue-rich-text-editor" aria-busy="true"><div class="fondue-rte-content" role="textbox" aria-multiline="true" aria-label="Notes" lang="en-US" dir="ltr" spellcheck="true" data-test-id="fondue-rich-text-editor-surface" data-rte-surface=""></div><div class="_status_ca8e17" data-test-id="fondue-rich-text-editor-status"></div><div aria-live="polite" style="position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap" data-test-id="fondue-rich-text-editor-announcer"></div><div style="position:relative;z-index:2" data-rte-overlays=""></div></div>',
        );
        expect(probeRuntimes().views).toEqual([]);
    });
});
