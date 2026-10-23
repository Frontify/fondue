/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/**
 * Mentions of host resources as `mention` atoms that keep a resource type and ID apart from the label shown when it
 * was chosen. The editor part's trigger opens a suggestion list from the host's `ReferenceService`; the chosen result
 * replaces the trigger and query with a mention and a space. The package never notifies anyone about a mention.
 */
export const mentions = defineFeature({
    id: 'mentions',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: {
        trigger: { type: 'string', default: '@' },
        resourceTypes: { type: 'list', items: { type: 'id' }, default: [] },
    },
    nodes: {
        mention: {
            group: 'inline',
            atom: true,
            marks: [],
            attrs: {
                nodeId: { type: 'string', required: true },
                resourceType: { type: 'id', required: true },
                resourceId: { type: 'string', required: true },
                labelSnapshot: { type: 'string', required: true },
            },
            // Pasted HTML never creates a mention; the label stays as its text.
            html: ['span', { 'data-mention': '' }],
            parse: [],
        },
    },
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
});
