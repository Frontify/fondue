/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, type RichTextDocument } from '#/model';

/** A badge's label, or nothing for a value that is no text. */
export const badgeLabel = (label: unknown): string => {
    if (typeof label === 'string') {
        return label;
    }
    return '';
};

/** An outside feature as a partner writes one: a highlight mark and a badge, whose behavior its editor part adds. */
export const highlight = defineFeature({
    id: 'fixture.highlight',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        fixture_badge: {
            group: 'inline',
            atom: true,
            attrs: { label: { type: 'string', default: '' } },
            html: ['span', { 'data-badge': { attr: 'label' } }],
            parse: [{ tag: 'span[data-badge]', attrs: { label: { from: 'data-badge' } } }],
        },
    },
    marks: {
        fixture_highlight: { attrs: {}, html: ['mark', 0], parse: [{ tag: 'mark' }] },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    codecs: { text: { nodes: { fixture_badge: (_inner, attrs) => badgeLabel(attrs.label) } } },
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
                attrs: { lang: null, align: null },
                content: [
                    { type: 'text', text: 'Read the ' },
                    { type: 'text', text: 'highlighted', marks: [{ type: 'fixture_highlight' }] },
                    { type: 'text', text: ' part.' },
                ],
            },
        ],
    },
};

/** A document of the model `fixture.highlight` with a badge. */
export const badgeDocument: RichTextDocument = {
    ...highlightDocument,
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            {
                type: 'paragraph',
                attrs: { lang: null, align: null },
                content: [
                    { type: 'text', text: 'Status ' },
                    { type: 'fixture_badge', attrs: { label: 'New' } },
                ],
            },
        ],
    },
};
