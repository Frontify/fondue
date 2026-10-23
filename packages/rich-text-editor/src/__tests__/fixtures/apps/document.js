/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The stored comment document that each fixture app renders with the reader and loads into the editor. */
export const storedDocument = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'frontify.comment', version: 1 },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'Rendered on the server.' }] },
        ],
    },
};

export const defaultValue = { documentId: 'smoke', revision: null, document: storedDocument };
