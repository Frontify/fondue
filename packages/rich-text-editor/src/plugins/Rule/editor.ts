/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { rule } from './feature';

/** Inserts a horizontal rule where the selection is, from `---`, `***` or `___` at a line start, or the toolbar. */
export const ruleEditor = defineEditorPart(rule, {
    needs: ['insert'],
    commands: {
        'rule.insert': { run: (api) => api.insert.node('horizontal_rule').status === 'applied' },
    },
    inputRules: [{ id: 'rule.dashes', kind: 'line-start', command: 'rule.insert', markers: ['---', '***', '___'] }],
    toolbar: [
        {
            id: 'rule',
            kind: 'button',
            command: 'rule.insert',
            labelKey: 'RichTextEditor_divider',
            icon: 'IconDividerSolid',
        },
    ],
});
