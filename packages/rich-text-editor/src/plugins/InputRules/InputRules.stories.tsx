/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { defineReactPresentation } from '#/entries/authoring';
import { corePlugin, defineEditor, inputRulesPlugin, modelOf, RichTextEditor } from '#/index';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [
    corePlugin(),
    inputRulesPlugin({
        typography: [
            'typography.quotes',
            'typography.ellipsis',
            'typography.dashes',
            'typography.symbols',
            'typography.numeric',
        ],
    }),
] as const;
const model = modelOf(plugins, { id: 'story.input-rules', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Plugins/InputRules',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:core', 'feature:input-rules'],
    parameters: {
        docs: {
            description: {
                component: `
The typography input rules, each off until the \`typography\` option lists its ID, such as \`inputRules({ typography: ['typography.dashes'] })\`. Every other rule is in its own feature's row. The editor's \`inputRules\` prop turns all rules off or excludes some by ID.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`input-rules\` | none | none | none | \`typography.quotes\`, \`typography.ellipsis\`, \`typography.dashes\`, \`typography.symbols\`, \`typography.numeric\` | Replaces the typed text with the rule's result as one undo step, which the first Mod+Z reverts: quotes for the language at the caret, \`...\` to an ellipsis, \`--\` before a space or punctuation to an en dash, \`(c)\` \`(r)\` \`(tm)\` \`(sm)\` to © ® ™ ℠, \`+/-\` to ±, \`!=\` to ≠, \`<<\` \`>>\` to « », \`->\` to →, \`<-\` before a space or punctuation to ←, \`<->\` to ↔, and a whole token \`1/2\`, \`1/4\`, \`3/4\`, digits with \`^2\` or \`^3\`, digits \`x\` digits, or \`~\` and a digit before a space to ½, ¼, ¾, ², ³, × or a subscript digit |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.input-rules', model, plugins }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-input-rules',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [{ id: 'core', version: 1 }],
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
                                    text: 'Type "quotes", ..., -- between words, (c), ->, +/-, and 1/2 or ~2 then a space.',
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
