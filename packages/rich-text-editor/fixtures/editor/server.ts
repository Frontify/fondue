/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import type * as Features from '#/features/index';
import type * as Editor from '#/index';
import type * as Model from '#/model/index';

/** One paragraph of `text` in the CT model, as `storedOf` in `EditorProbe` builds it for the browser. */
const storedOf = (text: string) => {
    const runs: { type: string; text: string }[] = [];
    if (text !== '') {
        runs.push({ type: 'text', text });
    }
    return {
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
                content: [{ type: 'paragraph', attrs: { lang: null }, content: runs }],
            },
        },
    };
};

/**
 * The editor through `renderToString` from the built package in Node, as a host renders it on the server; `blocked`
 * stores the text in an unknown format version, as `EditorHydrationProbe` does.
 */
export const renderEditorOnServer = async (text: string, blocked = false): Promise<string> => {
    const features = (await import(new URL('../../dist/features/index.js', import.meta.url).href)) as typeof Features;
    const editor = (await import(new URL('../../dist/index.js', import.meta.url).href)) as typeof Editor;
    const model = (await import(new URL('../../dist/model/index.js', import.meta.url).href)) as typeof Model;
    const definition = editor.defineEditor({
        id: 'test.ct',
        model: model.compileContentModel([features.core(), features.bold()], { id: 'test.ct', version: 1 }),
    });
    let defaultValue = storedOf(text);
    if (blocked) {
        defaultValue = { ...defaultValue, document: { ...defaultValue.document, formatVersion: 2 as 1 } };
    }
    return renderToString(createElement(editor.RichTextEditor, { 'aria-label': 'Notes', definition, defaultValue }));
};
