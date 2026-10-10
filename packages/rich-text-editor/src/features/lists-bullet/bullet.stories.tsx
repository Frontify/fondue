/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, featuresById } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name (SPEC-rich-text/AC-053).
const model = compileContentModel([core(), ...featuresById(['lists.item', 'lists.bullet'])], {
    id: 'story.lists-bullet',
    version: 1,
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/lists.bullet',
    component: RichTextEditor,
    tags: ['feature:lists.bullet', 'feature:lists.item', 'feature:core'],
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.lists-bullet', model }),
        defaultValue: {
            documentId: 'story-lists-bullet',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'lists.bullet', version: 1 },
                    { id: 'lists.item', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [{ type: 'text', text: 'Brand assets:' }],
                        },
                        {
                            type: 'bullet_list',
                            attrs: { marker: null },
                            content: [
                                {
                                    type: 'list_item',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Logos' }],
                                        },
                                        {
                                            type: 'bullet_list',
                                            attrs: { marker: null },
                                            content: [
                                                {
                                                    type: 'list_item',
                                                    content: [
                                                        {
                                                            type: 'paragraph',
                                                            attrs: { lang: null },
                                                            content: [{ type: 'text', text: 'Primary' }],
                                                        },
                                                        {
                                                            type: 'bullet_list',
                                                            attrs: { marker: 'square' },
                                                            content: [
                                                                {
                                                                    type: 'list_item',
                                                                    content: [
                                                                        {
                                                                            type: 'paragraph',
                                                                            attrs: { lang: null },
                                                                            content: [
                                                                                { type: 'text', text: 'Horizontal' },
                                                                            ],
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
                                                            content: [{ type: 'text', text: 'Secondary' }],
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
                                            content: [{ type: 'text', text: 'Fonts' }],
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
