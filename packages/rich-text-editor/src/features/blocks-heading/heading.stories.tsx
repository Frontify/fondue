/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, heading } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name (SPEC-rich-text/AC-053).
const model = compileContentModel([core(), heading()], { id: 'story.blocks-heading', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/blocks.heading',
    component: RichTextEditor,
    tags: ['feature:blocks.heading', 'feature:core'],
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.blocks-heading', model }),
        defaultValue: {
            documentId: 'story-blocks-heading',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'blocks.heading', version: 1 },
                    { id: 'core', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'heading',
                            attrs: { nodeId: 'heading-1', level: 2, lang: null },
                            content: [{ type: 'text', text: 'A heading' }],
                        },
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                {
                                    type: 'text',
                                    text: 'Type ## and a space at the start of a paragraph, or press Ctrl+Shift+2 (⌥⌘2 on a Mac), for a heading.',
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
