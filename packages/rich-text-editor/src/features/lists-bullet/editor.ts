/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin } from '#/bridge/plugin';

import { bulletList } from './feature';

/** Toggles a bulleted list from Mod+Shift+8, `-`, `*` or `+` at a line start, or the toolbar. */
export const bulletListEditor = defineEditorPlugin(bulletList, {
    commands: {
        'list.bullet.toggle': {
            run: (api) => api.lists.toggle('bullet_list', 'list_item'),
            active: (api) => api.lists.active('bullet_list'),
        },
    },
    keys: { 'Mod-Shift-8': 'list.bullet.toggle' },
    inputRules: [
        { id: 'list.bullet.marker', kind: 'line-start', command: 'list.bullet.toggle', markers: ['-', '*', '+'] },
    ],
    toolbar: [
        {
            id: 'bullet-list',
            kind: 'toggle',
            command: 'list.bullet.toggle',
            labelKey: 'RichTextEditor_bulletList',
            icon: 'IconListBullet',
        },
    ],
});
