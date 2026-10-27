/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart, definePlugin, toggleMark } from '#/entries/authoring';
import { defineFeature } from '#/model';

/** A host mark, stored as `highlight`: `<mark>` in HTML and `==text==` in Markdown. */
const highlight = defineFeature({
    id: 'acme.highlight',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        highlight: {
            attrs: {},
            html: ['mark', 0],
            parse: [{ tag: 'mark' }],
            markdown: { open: '==', close: '==' },
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
});

/** The whole plugin: a key, a typed `==text==` and a toolbar toggle, one file because no server reads it. */
export const highlightPlugin = definePlugin({
    feature: highlight,
    editor: defineEditorPart(
        highlight,
        toggleMark({
            mark: 'highlight',
            keys: ['Mod-Shift-h'],
            inputRules: [{ id: 'highlight.equals', open: '==', close: '==' }],
            toolbar: { labelKey: 'RichTextEditor_highlight', icon: 'IconPen' },
        }),
    ),
});
