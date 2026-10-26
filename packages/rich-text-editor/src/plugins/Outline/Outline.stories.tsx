/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { defineReactPresentation } from '#/entries/authoring';
import { corePlugin, defineEditor, headingPlugin, modelOf, outlinePlugin, RichTextEditor } from '#/index';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), headingPlugin(), outlinePlugin()] as const;
const model = modelOf(plugins, { id: 'story.nav-outline', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Plugins/Outline',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:nav.outline', 'feature:blocks.heading', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
The outline lists the document's headings in order, each with its stored level, in a navigation landmark named Outline. Choosing a heading moves the selection to its start and scrolls it into view. The document does not change. Escape closes the panel and returns focus to the surface. The toolbar button toggles the panel.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`nav.outline\` | \`outline.toggle\` |  | Outline button and panel |  | None; choosing a heading moves the selection |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.nav-outline', model, plugins }),
        presentation: defineReactPresentation({ toolbar: [['outline.toggle']] }),
        defaultValue: {
            documentId: 'story-nav-outline',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'blocks.heading', version: 1 },
                    { id: 'nav.outline', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'heading',
                            attrs: { nodeId: 'heading-1', level: 1, lang: null },
                            content: [{ type: 'text', text: 'Title' }],
                        },
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [{ type: 'text', text: 'A paragraph between headings.' }],
                        },
                        {
                            type: 'heading',
                            attrs: { nodeId: 'heading-2', level: 2, lang: null },
                            content: [{ type: 'text', text: 'Section' }],
                        },
                    ],
                },
            },
        },
    },
    argTypes: { definition: { control: false }, defaultValue: { control: false }, presentation: { control: false } },
};
export default meta;

export const Default: StoryObj<typeof RichTextEditor> = {};
