/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, insertNode, openControl } from '#/model';

// No shown name is longer, as the suggestion list drops longer labels.
const MAX_LABEL = 256;
const KINDS = ['user', 'group', 'everyone'] as const;

/**
 * Mentions of host resources as `mention` atoms that keep a resource type and ID apart from the label shown when it
 * was chosen. Typing the trigger opens a suggestion list from the host's `ReferenceService`; the chosen result
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
    commands: {
        'reference.insert': insertNode('mention', {
            spaceAfter: true,
            payload: {
                fields: {
                    resourceType: { type: 'id' },
                    resourceId: { type: 'string', minLength: 1 },
                    labelSnapshot: { type: 'string', maxLength: MAX_LABEL },
                    href: { type: 'string', optional: true },
                    imageUrl: { type: 'string', optional: true },
                    kind: { type: 'enum', values: KINDS, optional: true },
                },
            },
        }),
        'mention.search.open': openControl('mention-search'),
    },
    suggestions: [{ trigger: { option: 'trigger' }, source: 'references', command: 'reference.insert' }],
    toolbar: [
        { kind: 'button', command: 'mention.search.open', labelKey: 'RichTextEditor_mention', icon: 'IconPerson' },
    ],
});
