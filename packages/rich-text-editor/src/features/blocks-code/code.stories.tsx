/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { codeBlockPlugin, corePlugin, defineEditor, defineReactPresentation, modelOf, RichTextEditor } from '#/index';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), codeBlockPlugin()] as const;
const model = modelOf(plugins, { id: 'story.blocks-code', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/blocks.code',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:blocks.code', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Code blocks as \`code_block\`. The text keeps spaces, tabs and newlines. A null \`languageId\` is plain text. The block's chrome sets the language and copies the plain text. No mark or input rule applies inside the block, and a paste inserts the plain text only.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`blocks.code\` | \`code-block.toggle\` with \`{ languageId? }\`, \`code-block.language.set\` with \`{ languageId }\`, \`code-block.indent\`, \`code-block.outdent\` | \`Mod-]\` indents the touched lines by two spaces; \`Mod-[\` outdents up to two leading spaces. \`Mod-Enter\` leaves the block for a new paragraph. \`ArrowDown\` at the end, when the block is its parent's last child, inserts an empty paragraph after it. \`Tab\` and \`Shift-Tab\` are not handled, so focus leaves the editor | Code block in the text style picker; the language picker and Copy in the block chrome | \`code.fence\` | Turns the textblock into \`code_block\`, or back into a paragraph when it already is one. The language command sets \`languageId\` as one undo step. Indent and outdent each change the touched lines as one undo step |

\`Mod-]\` and \`Mod-[\` in a code block do not move a list or task item that contains the block. Enter inserts a newline.
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.blocks-code', model, plugins }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-blocks-code',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'blocks.code', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'code_block',
                            attrs: { languageId: 'typescript' },
                            content: [{ type: 'text', text: "const name: string = 'Ada';" }],
                        },
                        {
                            type: 'code_block',
                            attrs: { languageId: null },
                            content: [{ type: 'text', text: 'plain text, with  spaces' }],
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
