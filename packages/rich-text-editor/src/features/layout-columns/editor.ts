/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart, type EditorApi } from '#/bridge/plugin';

import { columns } from './feature';

const PLACE = { place: 'after-top-level-block' } as const;

// A break past the first `columns - 1` would force no break, so none is added.
const room = (api: EditorApi) => api.blocks.list('column_break').length < api.services.presentation().columns - 1;

/** Ends a column with a break after the top-level block that holds the selection, from Mod+Shift+Enter or the toolbar. */
export const columnsEditor = defineEditorPart(columns, {
    commands: {
        'column.break.insert': {
            run: (api) => room(api) && api.insert.node('column_break', {}, PLACE).status === 'applied',
            enabled: (api) => room(api) && api.insert.allowed('column_break', PLACE),
        },
    },
    keys: { 'Mod-Shift-Enter': 'column.break.insert' },
    toolbar: [
        {
            id: 'column-break',
            kind: 'button',
            command: 'column.break.insert',
            labelKey: 'RichTextEditor_columnBreak',
            icon: 'IconTextColumnBreak',
        },
    ],
});
