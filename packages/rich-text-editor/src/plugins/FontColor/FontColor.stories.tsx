/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { defineReactPresentation } from '#/entries/authoring';
import { corePlugin, defineEditor, fontColorPlugin, modelOf, RichTextEditor } from '#/index';
import { type RichTextDocument } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), fontColorPlugin()] as const;
const model = modelOf(plugins, { id: 'story.marks-font-color', version: 1 });
const literalPlugins = [corePlugin(), fontColorPlugin({ literalColors: true })] as const;
const literalModel = modelOf(literalPlugins, {
    id: 'story.marks-font-color',
    version: 1,
});

const presentation = defineReactPresentation({
    toolbar: [['mark.color.menu.open']],
    colorTokens: [
        { id: 'brand.red', label: 'Brand red', value: '#c0392b', usage: ['font_color'] },
        { id: 'brand.blue', label: 'Brand blue', value: '#1d4ed8', usage: ['font_color'] },
        { id: 'brand.gray', label: 'Gray', value: '#4b5563', usage: ['font_color'] },
    ],
});

const document: RichTextDocument = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: [
        { id: 'core', version: 1 },
        { id: 'marks.font-color', version: 1 },
    ],
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            {
                type: 'paragraph',
                attrs: { lang: null },
                content: [
                    { type: 'text', text: 'A ' },
                    {
                        type: 'text',
                        text: 'brand red',
                        marks: [{ type: 'font_color', attrs: { tokenId: 'brand.red', value: null } }],
                    },
                    { type: 'text', text: ' token and a ' },
                    {
                        type: 'text',
                        text: 'literal teal',
                        marks: [{ type: 'font_color', attrs: { tokenId: null, value: '#0f766e' } }],
                    },
                    { type: 'text', text: ' colour. Select text and open the colour menu.' },
                ],
            },
        ],
    },
} as unknown as RichTextDocument;

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Plugins/FontColor',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:marks.font-color', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Text colour as \`font_color\`: a presentation colour token, stored as \`tokenId\`, or a literal \`#rrggbb\` or \`#rrggbbaa\` \`value\`. The "A" colour menu lists the presentation's text colours, the highlight colours when \`marks.highlight\` is installed, and Clear, which removes both. Mod+Shift+H sets the last colour a command set in this session again.

With the option \`literalColors\` off, the default, the menu offers only tokens, a stored literal colour stays editable and removable, and pasted colours are dropped with an announcement. With \`literalColors: true\`, a custom colour row opens the Fondue \`ColorPicker\` with values and a gradient; the draft changes nothing until Save, which writes the mark as one undo step, and Cancel or Escape leave the document as it was. Pasted \`color\`, \`background-color\` and \`<font color>\` values are kept as lowercase hex.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`marks.font-color\` | \`mark.font-color.set\` with \`{ tokenId }\`, \`{ value }\` or \`null\`; \`mark.color.reapply\`; \`mark.color.clear\`; \`mark.color.menu.open\`, optionally with \`{ tokenIds }\` | \`Mod-Shift-h\` for \`mark.color.reapply\` | The "A" colour menu: text colours, the highlight colours when \`marks.highlight\` is installed, and Clear | none | Sets or removes \`font_color\`; reapply sets the last colour again; Clear removes \`font_color\` and \`highlight\` as one undo step |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.marks-font-color', model, plugins }),
        presentation,
        defaultValue: { documentId: 'story-marks-font-color', revision: null, document },
    },
    argTypes: {
        definition: { control: false },
        defaultValue: { control: false },
        presentation: { control: false },
    },
};
export default meta;

export const Default: StoryObj<typeof RichTextEditor> = {};

/** With `literalColors: true`, the menu also opens the Fondue `ColorPicker` for any colour. */
export const LiteralColors: StoryObj<typeof RichTextEditor> = {
    args: { definition: defineEditor({ id: 'story.marks-font-color', model: literalModel, plugins: literalPlugins }) },
};
