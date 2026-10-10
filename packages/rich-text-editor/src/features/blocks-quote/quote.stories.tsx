/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, quote } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name (SPEC-rich-text/AC-053).
const model = compileContentModel([core(), quote()], { id: 'story.blocks-quote', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/blocks.quote',
    component: RichTextEditor,
    tags: ['feature:blocks.quote', 'feature:core'],
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.blocks-quote', model }),
        defaultValue: {
            documentId: 'story-blocks-quote',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'blocks.quote', version: 1 },
                    { id: 'core', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'blockquote',
                            content: [
                                {
                                    type: 'paragraph',
                                    attrs: { lang: null },
                                    content: [
                                        {
                                            type: 'text',
                                            text: 'Type > and a space at the start of a paragraph for a quote; Enter in its empty last paragraph leaves it.',
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
