/* (c) Copyright Frontify Ltd., all rights reserved. */

import { blockRule, defineFeature, indentItem, outdentItem, setAttributes, toggleList, toggleTask } from '#/model';

/** Task lists as `task_list` and `task_item`, whose `checked` a native checkbox in the item's chrome shows. */
export const taskList = defineFeature({
    id: 'lists.task',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        task_list: {
            group: 'block',
            content: 'task_item+',
            attrs: {},
            html: ['ul', { 'data-task-list': '' }, 0],
            parse: [{ tag: 'ul[data-task-list]' }],
        },
        task_item: {
            content: 'paragraph block*',
            attrs: { nodeId: { type: 'string', required: true }, checked: { type: 'boolean', default: false } },
            html: ['li', { 'data-checked': { attr: 'checked' } }, 0],
            parse: [{ tag: 'li[data-checked]', attrs: { checked: { from: 'data-checked', equals: 'true' } } }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    commands: {
        'list.task.toggle': toggleList('task_list', 'task_item', {
            fields: { checked: { type: 'boolean', optional: true } },
        }),
        'task.toggle': toggleTask('task_item', 'task.setChecked'),
        'task.setChecked': setAttributes('task_item', {
            fields: { nodeId: { type: 'string' }, checked: { type: 'boolean' } },
        }),
        'task.indent': indentItem('task_item'),
        'task.outdent': outdentItem('task_item'),
    },
    keys: {
        'Mod-Shift-9': 'list.task.toggle',
        'Mod-Enter': 'task.toggle',
        'Mod-]': 'task.indent',
        Tab: 'task.indent',
        'Mod-[': 'task.outdent',
        'Shift-Tab': 'task.outdent',
    },
    inputRules: [
        blockRule({ id: 'list.task.brackets', match: /^\[(?:(?<checked>x)| )\] $/, command: 'list.task.toggle' }),
    ],
    toolbar: [
        { kind: 'toggle', command: 'list.task.toggle', labelKey: 'RichTextEditor_taskList', icon: 'IconListCheck' },
    ],
});
