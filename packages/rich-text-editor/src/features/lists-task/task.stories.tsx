/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, featuresById } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name (SPEC-rich-text/AC-053).
const model = compileContentModel([core(), ...featuresById(['lists.task'])], { id: 'story.lists-task', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/lists.task',
    component: RichTextEditor,
    tags: ['feature:lists.task', 'feature:core'],
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
