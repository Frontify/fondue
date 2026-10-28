/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/pluginApi/plugin';
import { blockRule } from '#/model';

import { NumberingDialog } from './components/NumberingDialog';
import { orderedList } from './feature';
import { SET_START } from './helpers/commands';

const START = { fields: { start: { type: 'integer', min: 0, max: 1_000_000 } } } as const;

/**
 * Toggles a numbered list from Mod+Shift+7, `1. ` at a line start, or the toolbar, and opens the Start numbering at
 * dialog on the nearest ordered list, whose Apply sets its `start`.
 */
export const orderedListEditor = defineEditorPart(orderedList, {
    needs: ['attributes', 'lists', 'overlays'],
    commands: {
        'list.ordered.toggle': {
            payload: START,
            run: (api, payload: { start: number }) => api.lists.toggle('ordered_list', 'list_item', payload),
            active: (api) => api.lists.active('ordered_list'),
        },
        'list.ordered.start.edit': {
            enabled: (api) => api.nearest('ordered_list') !== undefined,
            run: (api) => {
                const found = api.nearest('ordered_list');
                if (found === undefined) {
                    return false;
                }

                api.overlays.open(NumberingDialog, { payload: START, initial: Number(found.attrs.start) }, 'selection');

                return true;
            },
        },
        [SET_START]: {
            payload: START,
            run: (api, payload: { start: number }) => api.attributes.set('ordered_list', payload),
        },
    },
    keys: { 'Mod-Shift-7': { command: 'list.ordered.toggle', payload: { start: 1 } } },
    // The payload declaration refuses a number above 1,000,000, so the rule keeps such text.
    inputRules: [
        blockRule({ id: 'list.ordered.number', match: /^(?<start>\d+)[.)] $/, command: 'list.ordered.toggle' }),
    ],
    toolbar: [
        {
            id: 'ordered-list',
            kind: 'toggle',
            command: 'list.ordered.toggle',
            payload: { start: 1 },
            labelKey: 'RichTextEditor_numberedList',
            icon: 'IconListNumbers',
            group: 'lists',
        },
        {
            id: 'start-numbering',
            kind: 'button',
            command: 'list.ordered.start.edit',
            labelKey: 'RichTextEditor_startNumbering',
            icon: 'IconListNumbers',
            opensOverlay: true,
        },
    ],
});
