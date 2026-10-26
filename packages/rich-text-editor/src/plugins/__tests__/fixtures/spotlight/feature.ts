/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, type RichTextDocument } from '#/model';

/**
 * An outside feature's vocabulary, as a partner writes one: a spotlight mark, and a parse rule that data cannot
 * express, since a `mark` that another editor's search left behind is no spotlight.
 */
export const spotlight = defineFeature({
    id: 'fixture.spotlight',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        fixture_spotlight: { attrs: {}, html: ['mark', 0], parse: [{ tag: 'mark' }] },
    },
    parseRules: [
        {
            tag: 'mark',
            mark: 'fixture_spotlight',
            value: (element) => (element.hasAttribute('data-search-hit') ? null : {}),
        },
    ],
    formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
});

/** A document of a model compiled from `core` and `spotlight`. */
export const spotlightDocument: RichTextDocument = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'fixture.spotlight', version: 1 },
    requiredCapabilities: [
        { id: 'core', version: 1 },
        { id: 'fixture.spotlight', version: 1 },
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
                    { type: 'text', text: 'spotlit', marks: [{ type: 'fixture_spotlight' }] },
                    { type: 'text', text: ' part.' },
                ],
            },
        ],
    },
};
