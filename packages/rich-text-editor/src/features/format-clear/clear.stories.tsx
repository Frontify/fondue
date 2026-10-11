/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { align, bold, core, formatClear, heading } from '#/features';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { defineEditor, defineReactPresentation, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

const model = compileContentModel([core(), heading(), bold(), align(), listItem(), bulletList(), formatClear()], {
    id: 'story.clear',
    version: 1,
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/format.clear',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Clears formatting. The toolbar button runs \`format.clear\`. Mod+\\ runs \`format.inline.clear\`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`format.clear\` | \`format.clear\`, \`format.inline.clear\` | \`Mod-\\\` for \`format.inline.clear\` | Clear formatting button runs \`format.clear\` | none | \`format.clear\` removes every mark, lifts the selected blocks out of lists, turns them into paragraphs and clears alignment and indent. \`format.inline.clear\` removes formatting marks only |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.clear', model }),
        presentation: defineReactPresentation({
            toolbar: [
                ['mark.bold.toggle'],
                [
                    { command: 'block.align.set', payload: { align: 'left' } },
                    { command: 'block.align.set', payload: { align: 'center' } },
                    { command: 'block.align.set', payload: { align: 'right' } },
                    { command: 'block.align.set', payload: { align: 'justify' } },
                ],
                ['format.clear'],
            ],
        }),
        defaultValue: {
            documentId: 'story-clear',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: model.capabilities,
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'bullet_list',
                            attrs: { marker: null },
                            content: [
                                {
                                    type: 'list_item',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null, align: 'center' },
                                            content: [
                                                { type: 'text', text: 'A ' },
                                                { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
                                                { type: 'text', text: ' list item.' },
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
