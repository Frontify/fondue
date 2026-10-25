/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';

import { listItem } from './feature';

/**
 * Nests an item under the previous one from Tab and Mod-], and outdents it from Shift-Tab and Mod-[; Enter splits an
 * item or outdents an empty one, and Backspace at an item's start outdents it.
 */
export const listItemEditor = defineEditorPart(listItem, {
    commands: {
        'list.indent': { run: (api) => api.lists.indent('list_item') },
        'list.outdent': { run: (api) => api.lists.outdent('list_item') },
    },
    keys: {
        'Mod-]': 'list.indent',
        Tab: 'list.indent',
        'Mod-[': 'list.outdent',
        'Shift-Tab': 'list.outdent',
        Enter: (api) => api.lists.split('list_item'),
        Backspace: (api) => api.lists.outdent('list_item', { atStart: true }),
    },
});
