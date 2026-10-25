/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { defineReactPresentation } from '#/entries/authoring';
import { corePlugin, defineEditor, modelOf, RichTextEditor, strikePlugin } from '#/index';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), strikePlugin()] as const;
const model = modelOf(plugins, { id: 'story.marks-strike', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/marks.strike',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:core', 'feature:marks.strike'],
    parameters: {
        docs: {
            description: {
                component: `
Struck-through text as \`s\`, toggled on the selection or at the caret.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`marks.strike\` | \`mark.strike.toggle\` | \`Mod-Shift-x\` | Strikethrough toggle | \`strike.tildes\` | Adds or removes \`strike\` |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.marks-strike', model, plugins }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-marks-strike',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'marks.strike', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                { type: 'text', text: 'Select text and press Mod+Shift+X, or type ~~text~~, to ' },
                                { type: 'text', text: 'strike it through', marks: [{ type: 'strike' }] },
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
