/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, featuresById } from '#/features';
import { defineEditor, RichTextEditor, defineReactPresentation } from '#/index';
import { compileContentModel } from '#/model';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const model = compileContentModel([core(), ...featuresById(['lists.item', 'lists.ordered'])], {
    id: 'story.lists-ordered',
    version: 1,
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/lists.ordered',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:lists.ordered', 'feature:lists.item', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Numbered lists as \`ordered_list\`, with \`start\` from 0 to 1,000,000.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`lists.ordered\` | \`list.ordered.toggle\` with \`{ start }\`, \`list.ordered.start.edit\`, \`list.ordered.start.set\` with \`{ start }\` | \`Mod-Shift-7\` | Numbered list toggle, which passes \`{ start: 1 }\`; Start numbering at in the More menu | \`list.ordered.number\` | As \`lists.bullet\`, with \`ordered_list\` and its \`start\` |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.lists-ordered', model }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-lists-ordered',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'lists.item', version: 1 },
                    { id: 'lists.ordered', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'ordered_list',
                            attrs: { start: 5, marker: null },
                            content: [
                                {
                                    type: 'list_item',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Download the kit' }],
                                        },
                                        {
                                            type: 'ordered_list',
                                            attrs: { start: 1, marker: null },
                                            content: [
                                                {
                                                    type: 'list_item',
                                                    content: [
                                                        {
                                                            type: 'paragraph',
                                                            attrs: { lang: null },
                                                            content: [{ type: 'text', text: 'Unzip it' }],
                                                        },
                                                    ],
                                                },
                                                {
                                                    type: 'list_item',
                                                    content: [
                                                        {
                                                            type: 'paragraph',
                                                            attrs: { lang: null },
                                                            content: [{ type: 'text', text: 'Open the guide' }],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'list_item',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Pick a template' }],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'ordered_list',
                            attrs: { start: 1, marker: 'lower-roman' },
                            content: [
                                {
                                    type: 'list_item',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: { lang: null },
                                            content: [{ type: 'text', text: 'Roman step' }],
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
