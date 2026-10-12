/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, type RichTextDocument, toggleMark } from '#/model';

/** An outside feature as a partner writes one: a highlight mark with its command and key. */
export const highlight = defineFeature({
    id: 'fixture.highlight',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        fixture_highlight: { attrs: {}, html: ['mark', 0], parse: [{ tag: 'mark' }] },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    commands: { 'fixture.highlight.toggle': toggleMark('fixture_highlight') },
    keys: { 'Mod-Shift-m': 'fixture.highlight.toggle' },
});

/** A document of the model `fixture.highlight`, compiled from `core` and `highlight`. */
export const highlightDocument: RichTextDocument = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'fixture.highlight', version: 1 },
    requiredCapabilities: [
        { id: 'core', version: 1 },
        { id: 'fixture.highlight', version: 1 },
    ],
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            {
                type: 'paragraph',
                attrs: { lang: null },
                content: [
                    { type: 'text', text: 'Read the ' },
                    { type: 'text', text: 'highlighted', marks: [{ type: 'fixture_highlight' }] },
                    { type: 'text', text: ' part.' },
                ],
            },
        ],
    },
};
