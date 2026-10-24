/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { corePlugin, defineEditor, defineReactPresentation, emojiPlugin, modelOf, RichTextEditor } from '#/index';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), emojiPlugin()] as const;
const model = modelOf(plugins, { id: 'story.emoji', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/emoji',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:emoji', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Emoji stored as Unicode text. Type \`:\` at a word start, then at least two letters, to open suggestions. Enter or Tab inserts the active emoji. The toolbar button opens the emoji picker.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`emoji\` | \`emoji.picker.open\`; an accepted emoji runs core's \`text.insert\` with \`{ text }\` |  | Emoji button | \`:\` suggestions | Inserts the emoji as a text node |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.emoji', model, plugins }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-emoji',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'emoji', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [{ type: 'text', text: 'Type : and a name, or insert one 🎉.' }],
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
