/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createRoot } from 'react-dom/client';

import { RichTextEditor } from '#/index';

// A host's entry: the stored record arrives as JSON, so the initial chunk needs no model of its own.
const defaultValue = {
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: { id: 'frontify.comment', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: [{ type: 'paragraph', attrs: { lang: null } }],
        },
    },
} as const;

const container = document.createElement('div');
document.body.append(container);
createRoot(container).render(<RichTextEditor aria-label="Text" profile="comment" defaultValue={defaultValue} />);
