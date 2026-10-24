/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { corePlugin, defineEditor, defineReactPresentation, modelOf, RichTextEditor, rulePlugin } from '#/index';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), rulePlugin()] as const;
const model = modelOf(plugins, { id: 'story.blocks-rule', version: 1 });

const paragraph = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/blocks.rule',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:blocks.rule', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Horizontal rules as \`horizontal_rule\`, a leaf block that the reader and \`toHTML\` write as \`<hr>\`, plain text as \`---\` on its own line and Markdown as \`---\`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`blocks.rule\` | \`rule.insert\` | none | Divider in the toolbar's insert group | \`rule.dashes\` | Inserts \`horizontal_rule\`, with an empty paragraph after it when it is last |

\`rule.insert\` replaces the empty paragraph that holds the caret, goes before a paragraph with the caret at its start, and otherwise goes after the block that holds the selection end, inside a quote or list item when the caret is in one. The caret moves to the block after the rule.

\`rule.dashes\` turns \`---\`, \`***\` or \`___\` and a space at the start of a paragraph into a rule. Backspace right after the rule's input fires undoes it.

A selected rule, as every leaf block, is removed by Backspace or Delete as one undo step. The arrow keys show a gap cursor beside a leaf block that has no text position next to it, where typing starts a paragraph.
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.blocks-rule', model, plugins }),
        presentation: defineReactPresentation({ toolbar: [['rule.insert']] }),
        defaultValue: {
            documentId: 'story-blocks-rule',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'blocks.rule', version: 1 },
                    { id: 'core', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        paragraph('Logo usage'),
                        { type: 'horizontal_rule' },
                        paragraph('Type --- and a space at the start of a paragraph, or use Divider, for a rule.'),
                    ],
                },
            },
        },
    },
    argTypes: { definition: { control: false }, defaultValue: { control: false } },
};
export default meta;

export const Default: StoryObj<typeof RichTextEditor> = {};
