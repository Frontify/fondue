/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { corePlugin, defineEditor, defineReactPresentation, headingPlugin, modelOf, RichTextEditor } from '#/index';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), headingPlugin()] as const;
const model = modelOf(plugins, { id: 'story.blocks-heading', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/blocks.heading',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:blocks.heading', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Headings \`h1\` to \`h6\`. A stored heading keeps its level, even one the policy's \`creatableHeadingLevels\` leaves out, while \`heading.set\` with such a level returns \`not-allowed\`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`blocks.heading\` | \`heading.set\` with \`{ level }\` | \`mac:Mod-Alt-1\` to \`mac:Mod-Alt-6\`, \`other:Ctrl-Shift-1\` to \`other:Ctrl-Shift-6\`, each passing its \`{ level }\`: \`mac:Mod-Alt-1\`, \`mac:Mod-Alt-2\`, \`mac:Mod-Alt-3\`, \`mac:Mod-Alt-4\`, \`mac:Mod-Alt-5\`, \`mac:Mod-Alt-6\`, \`other:Ctrl-Shift-1\`, \`other:Ctrl-Shift-2\`, \`other:Ctrl-Shift-3\`, \`other:Ctrl-Shift-4\`, \`other:Ctrl-Shift-5\`, \`other:Ctrl-Shift-6\` | Creatable heading levels in the text style picker: Heading 1, Heading 2, Heading 3, Heading 4, Heading 5, Heading 6 | \`heading.hashes\` | Turns textblocks into a \`heading\` of that level, keeping inline content and block attributes |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.blocks-heading', model, plugins }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
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
