/* (c) Copyright Frontify Ltd., all rights reserved. */

// Plain Node, run by `renderEditorOnServer`, so `dist/` skips Playwright's shared transform cache.
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { core, bold } from '../../dist/features/index.js';
import { RichTextEditor, defineEditor } from '../../dist/index.js';
import { compileContentModel } from '../../dist/model/index.js';

const [text = '', blocked = 'false'] = process.argv.slice(2);

/** One paragraph of `text` in the CT model, as `storedOf` in `EditorProbe` builds it for the browser. */
const storedOf = (paragraph) => {
    const runs = [];
    if (paragraph !== '') {
        runs.push({ type: 'text', text: paragraph });
    }
    return {
        documentId: 'document-1',
        revision: null,
        document: {
            format: 'frontify.rich-text',
            formatVersion: 1,
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

const definition = defineEditor({
    id: 'test.ct',
    model: compileContentModel([core(), bold()], { id: 'test.ct', version: 1 }),
});
let defaultValue = storedOf(text);
if (blocked === 'true') {
    defaultValue = { ...defaultValue, document: { ...defaultValue.document, formatVersion: 2 } };
}
process.stdout.write(
    renderToString(createElement(RichTextEditor, { 'aria-label': 'Notes', definition, defaultValue })),
);
