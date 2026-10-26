/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';
import { blockRule } from '#/model';

import { taskItemView } from './components/TaskCheckbox';
import { checkList } from './feature';

/**
 * Toggles a task list from Mod+Shift+9, `[ ] ` or `[x] ` at a line start, or the toolbar, and checks an item from its
 * checkbox or Mod+Enter; its items nest, outdent and split as list items do.
 */
export const taskListEditor = defineEditorPart(checkList, {
    needs: ['attributes', 'commands', 'lists'],
    commands: {
        'list.task.toggle': {
            payload: { fields: { checked: { type: 'boolean', optional: true } } },
            run: (api, payload: { checked?: boolean } | undefined) => {
                if (payload?.checked === undefined) {
                    return api.lists.toggle('task_list', 'task_item');
                }

                return api.lists.toggle('task_list', 'task_item', { checked: payload.checked });
            },
            active: (api) => api.lists.active('task_list'),
        },
        'task.toggle': {
            run: (api) => {
                const found = api.nearest('task_item');
                if (found === undefined || found.nodeId === null) {
                    return false;
                }

                const checked = found.attrs.checked !== true;

                return api.commands.execute('task.setChecked', { nodeId: found.nodeId, checked }).status !== 'rejected';
            },
        },
        'task.setChecked': {
            payload: { fields: { nodeId: { type: 'string' }, checked: { type: 'boolean' } } },
            run: (api, { nodeId, checked }: { nodeId: string; checked: boolean }) =>
                api.attributes.set('task_item', { checked }, { nodeId }),
        },
        'task.indent': { run: (api) => api.lists.indent('task_item') },
        'task.outdent': { run: (api) => api.lists.outdent('task_item') },
    },
    keys: {
        'Mod-Shift-9': 'list.task.toggle',
        'Mod-Enter': 'task.toggle',
        'Mod-]': 'task.indent',
        Tab: 'task.indent',
        'Mod-[': 'task.outdent',
        'Shift-Tab': 'task.outdent',
        Enter: (api) => api.lists.split('task_item'),
        Backspace: (api) => api.lists.outdent('task_item', { atStart: true }),
    },
    inputRules: [
        blockRule({ id: 'list.task.brackets', match: /^\[(?:(?<checked>x)| )?\] $/, command: 'list.task.toggle' }),
    ],
    toolbar: [
        {
            id: 'task-list',
            kind: 'toggle',
            command: 'list.task.toggle',
            labelKey: 'RichTextEditor_taskList',
            icon: 'IconListCheck',
        },
    ],
    views: [taskItemView],
});
