/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, featuresById } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name (SPEC-rich-text/AC-053).
const model = compileContentModel([core(), ...featuresById(['lists.item'])], { id: 'story.lists-item', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/lists.item',
    component: RichTextEditor,
    tags: ['feature:lists.item', 'feature:core'],
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.lists-item', model }),
        defaultValue: {
            documentId: 'story-lists-item',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'lists.item', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                {
                                    type: 'text',
                                    text: 'List items come with lists.bullet and lists.ordered, where Tab and Shift+Tab nest and outdent them.',
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
