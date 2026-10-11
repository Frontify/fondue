/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { align, core, heading } from '#/features';
import { defineEditor, defineReactPresentation, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

const model = compileContentModel([core(), heading(), align()], { id: 'story.align', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/blocks.align',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Physical alignment on paragraphs and headings, written as an inline \`text-align\`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`blocks.align\` | \`block.align.set\` \`{ align }\` | \`Mod-Shift-l\`, \`Mod-Shift-e\`, \`Mod-Shift-r\`, and \`Mod-Shift-j\` when justify is on | Alignment toggles with a mixed state | none | Sets \`align\` on the selected paragraphs and headings, or removes it when every one already has that value |

\`align({ justify: false })\` leaves justify out of the values, the key and the toolbar. An alignment command does not change the document's \`dir\`.
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.align', model }),
        presentation: defineReactPresentation({
            toolbar: [
                [
                    { command: 'block.align.set', payload: { align: 'left' } },
                    { command: 'block.align.set', payload: { align: 'center' } },
                    { command: 'block.align.set', payload: { align: 'right' } },
                    { command: 'block.align.set', payload: { align: 'justify' } },
                ],
            ],
        }),
        defaultValue: {
            documentId: 'story-align',
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
                            type: 'paragraph',
                            attrs: { lang: null, align: 'center' },
                            content: [{ type: 'text', text: 'This paragraph is centered.' }],
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
