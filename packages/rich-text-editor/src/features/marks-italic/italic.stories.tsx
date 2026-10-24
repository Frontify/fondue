/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { corePlugin, defineEditor, defineReactPresentation, italicPlugin, modelOf, RichTextEditor } from '#/index';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), italicPlugin()] as const;
const model = modelOf(plugins, { id: 'story.marks-italic', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/marks.italic',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:core', 'feature:marks.italic'],
    parameters: {
        docs: {
            description: {
                component: `
Emphasis as \`em\`, toggled on the selection or at the caret.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`marks.italic\` | \`mark.italic.toggle\` | \`Mod-i\` | Italic toggle | \`italic.star\`, \`italic.underscore\` | Adds or removes \`italic\` |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.marks-italic', model, plugins }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-marks-italic',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'marks.italic', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                { type: 'text', text: 'Select text and press Mod+I, or type ' },
                                { type: 'text', text: '*text*' },
                                { type: 'text', text: ', to make it ' },
                                { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
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
