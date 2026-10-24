/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, featuresById } from '#/features';
import { defineEditor, RichTextEditor, defineReactPresentation } from '#/index';
import { compileContentModel } from '#/model';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const model = compileContentModel([core(), ...featuresById(['lists.item'])], { id: 'story.lists-item', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/lists.item',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:lists.item', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
The \`list_item\` of bulleted and numbered lists. Enter splits an item, Enter in an empty item outdents it or, at the top level, turns it into a paragraph after the list, and Backspace at the start of an item's first paragraph does the same. Tab nests an item under its previous sibling and moves focus out of the editor when the item cannot nest.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`lists.item\` | \`list.indent\`, \`list.outdent\` | \`Mod-]\` and \`Tab\`, \`Mod-[\` and \`Shift-Tab\`, in a list item | none | none | Nests or outdents \`list_item\` nodes, keeping children |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.lists-item', model }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-lists-item',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'lists.item', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                {
                                    type: 'text',
                                    text: 'List items come with lists.bullet and lists.ordered, where Tab and Shift+Tab nest and outdent them.',
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
