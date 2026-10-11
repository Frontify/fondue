/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, featuresById } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const model = compileContentModel([core(), ...featuresById(['lists.task'])], { id: 'story.lists-task', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/lists.task',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:lists.task', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Task lists as \`task_list\` and \`task_item\`. Each item shows a native checkbox labelled by its text; a click, or Space on the focused checkbox, runs \`task.setChecked\`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`lists.task\` | \`list.task.toggle\` with \`{ checked? }\`, \`task.toggle\` (runs \`task.setChecked\` for the item at the selection), \`task.setChecked\` with \`{ nodeId, checked }\`, \`task.indent\`, \`task.outdent\` | \`Mod-Shift-9\`; \`Mod-Enter\` for \`task.toggle\`; \`Mod-]\` and \`Tab\`, \`Mod-[\` and \`Shift-Tab\`, in a task item | Task list toggle; the item checkbox | \`list.task.brackets\` | As \`lists.bullet\`, with \`task_list\` and \`task_item\`; \`task.toggle\` and \`task.setChecked\` flip \`checked\` as one undo step |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.lists-task', model }),
        defaultValue: {
            documentId: 'story-lists-task',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'lists.task', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'task_list',
                            content: [
                                {
                                    type: 'task_item',
                                    attrs: { nodeId: 'task-1', checked: true },
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Approve the palette' }],
                                        },
                                    ],
                                },
                                {
                                    type: 'task_item',
                                    attrs: { nodeId: 'task-2', checked: false },
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Update the templates' }],
                                        },
                                        {
                                            type: 'task_list',
                                            content: [
                                                {
                                                    type: 'task_item',
                                                    attrs: { nodeId: 'task-3', checked: false },
                                                    content: [
                                                        {
                                                            type: 'paragraph',
                                                            attrs: { lang: null },
                                                            content: [{ type: 'text', text: 'Social media' }],
                                                        },
                                                    ],
                                                },
                                                {
                                                    type: 'task_item',
                                                    attrs: { nodeId: 'task-4', checked: true },
                                                    content: [
                                                        {
                                                            type: 'paragraph',
                                                            attrs: { lang: null },
                                                            content: [{ type: 'text', text: 'Print' }],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
        },
    },
    argTypes: { definition: { control: false }, defaultValue: { control: false } },
};
export default meta;

export const Default: StoryObj<typeof RichTextEditor> = {};
