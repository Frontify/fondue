/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { bold, core } from '#/features';
import { defineEditor, RichTextEditor, defineReactPresentation } from '#/index';
import { compileContentModel } from '#/model';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

const model = compileContentModel([core(), bold()], { id: 'story.bold', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/marks.bold',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Strong importance as \`strong\`, toggled on the selection or at the caret.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`marks.bold\` | \`mark.bold.toggle\` | \`Mod-b\` | Bold toggle | \`bold.stars\`, \`bold.underscores\` | Adds or removes \`bold\` on the selection, or in the stored marks at a caret |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.bold', model }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-bold',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'marks.bold', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                { type: 'text', text: 'Select text and press Mod+B to make it ' },
                                { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
                                { type: 'text', text: '.' },
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
