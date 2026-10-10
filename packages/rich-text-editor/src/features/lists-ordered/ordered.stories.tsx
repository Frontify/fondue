/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, featuresById } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name (SPEC-rich-text/AC-053).
const model = compileContentModel([core(), ...featuresById(['lists.item', 'lists.ordered'])], {
    id: 'story.lists-ordered',
    version: 1,
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/lists.ordered',
    component: RichTextEditor,
    tags: ['feature:lists.ordered', 'feature:lists.item', 'feature:core'],
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.lists-ordered', model }),
        defaultValue: {
            documentId: 'story-lists-ordered',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'lists.item', version: 1 },
                    { id: 'lists.ordered', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'ordered_list',
                            attrs: { start: 5, marker: null },
                            content: [
                                {
                                    type: 'list_item',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Download the kit' }],
                                        },
                                        {
                                            type: 'ordered_list',
                                            attrs: { start: 1, marker: null },
                                            content: [
                                                {
                                                    type: 'list_item',
                                                    content: [
                                                        {
                                                            type: 'paragraph',
                                                            attrs: { lang: null },
                                                            content: [{ type: 'text', text: 'Unzip it' }],
                                                        },
                                                    ],
                                                },
                                                {
                                                    type: 'list_item',
                                                    content: [
                                                        {
                                                            type: 'paragraph',
                                                            attrs: { lang: null },
                                                            content: [{ type: 'text', text: 'Open the guide' }],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'list_item',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Pick a template' }],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'ordered_list',
                            attrs: { start: 1, marker: 'lower-roman' },
                            content: [
                                {
                                    type: 'list_item',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Roman step' }],
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
