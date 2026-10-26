/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { defineReactPresentation } from '#/entries/authoring';
import { corePlugin, defineEditor, modelOf, RichTextEditor } from '#/index';
import { FEATURE_TOOLBAR } from '#/react/examples/toolbar';

const plugins = [corePlugin()] as const;
const model = modelOf(plugins, { id: 'story.core', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Plugins/Core',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
The document, paragraphs, text, hard breaks, undo history and block moves that every model installs.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`core\` | \`paragraph.set\`, \`text.insert\` with \`{ text }\`, \`hard-break.insert\`, \`history.undo\`, \`history.redo\`, \`block.move.up\`, \`block.move.down\` | \`mac:Mod-Alt-0\` and \`other:Ctrl-Shift-0\` for \`paragraph.set\`; \`Mod-z\` for \`history.undo\`; \`Mod-Shift-z\` and \`other:Ctrl-y\` for \`history.redo\`; \`Shift-Enter\` for \`hard-break.insert\`; \`Mod-Alt-ArrowUp\` and \`Mod-Alt-ArrowDown\` for \`block.move.up\` and \`block.move.down\` | Normal text in the text style picker; Undo and Redo; Move up and Move down in the More menu | none | Holds \`doc\`, \`paragraph\`, \`text\` and \`hard_break\`; typing inserts text, and \`text.insert\` replaces the selection with its \`text\`; \`hard-break.insert\` inserts \`hard_break\`, or a newline in a code block; \`paragraph.set\` turns textblocks into paragraphs and keeps inline content and block attributes; \`history.undo\` and \`history.redo\` undo and redo one step; the block moves swap the blocks at the selection with their previous or next sibling as one undo step |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.core', model, plugins }),
        presentation: defineReactPresentation({ toolbar: FEATURE_TOOLBAR }),
        defaultValue: {
            documentId: 'story-core',
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
                            content: [{ type: 'text', text: 'Paragraphs hold text.' }],
                        },
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                { type: 'text', text: 'A hard break' },
                                { type: 'hard_break' },
                                { type: 'text', text: 'starts a new line.' },
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
