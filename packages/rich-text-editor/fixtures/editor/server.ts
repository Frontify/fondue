/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { bold, core } from '../../dist/features/index.js';
import { defineEditor, RichTextEditor } from '../../dist/index.js';
import { compileContentModel } from '../../dist/model/index.js';

const definition = defineEditor({
    id: 'test.ct',
    model: compileContentModel([core(), bold()], { id: 'test.ct', version: 1 }),
});

/** One paragraph of `text` in the CT model, as `storedOf` in `EditorProbe` builds it for the browser. */
const storedOf = (text: string) => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.ct', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: [
                { type: 'paragraph', attrs: { lang: null }, content: text === '' ? [] : [{ type: 'text', text }] },
            ],
        },
    },
});

/** The editor through `renderToString` from the built package in Node, as a host renders it on the server. */
export const renderEditorOnServer = (text: string): string =>
    renderToString(createElement(RichTextEditor, { 'aria-label': 'Notes', definition, defaultValue: storedOf(text) }));
