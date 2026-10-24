/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, quote } from '#/features';
import { defineEditor, RichTextEditor, defineReactPresentation } from '#/index';
import { compileContentModel } from '#/model';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const model = compileContentModel([core(), quote()], { id: 'story.blocks-quote', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/blocks.quote',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:blocks.quote', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Quotations as \`blockquote\`, a container of blocks. Enter in its empty last paragraph removes that paragraph and puts a new paragraph after the quote.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`blocks.quote\` | \`quote.toggle\` | none | Quote in the text style picker; the Quote toggle in the Comment toolbar | \`quote.angle\` | Wraps the selected blocks in \`blockquote\`, or lifts them out when they are already in one |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.blocks-quote', model }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
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
