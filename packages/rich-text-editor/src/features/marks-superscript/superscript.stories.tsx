/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { corePlugin, defineEditor, defineReactPresentation, modelOf, RichTextEditor, superscriptPlugin } from '#/index';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), superscriptPlugin()] as const;
const model = modelOf(plugins, { id: 'story.marks-superscript', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/marks.superscript',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:core', 'feature:marks.superscript'],
    parameters: {
        docs: {
            description: {
                component: `
Superscript as \`sup\`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`marks.superscript\` | \`mark.superscript.toggle\` | \`Mod-.\` | Superscript toggle | none | Adds or removes \`superscript\`, and removes \`subscript\` from the range |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.marks-superscript', model, plugins }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-marks-superscript',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'marks.superscript', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                { type: 'text', text: 'Press Mod+. for superscript, as in mc' },
                                { type: 'text', text: '2', marks: [{ type: 'superscript' }] },
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
