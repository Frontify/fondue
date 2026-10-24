/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { columnsPlugin, corePlugin, defineEditor, defineReactPresentation, modelOf, RichTextEditor } from '#/index';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), columnsPlugin()] as const;
const model = modelOf(plugins, { id: 'story.layout-columns', version: 1 });

const paragraph = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/layout.columns',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:layout.columns', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Column breaks as \`column_break\`, which sit only between top-level blocks. The host sets the column count and gap through the presentation's \`columns\` (1 to 6) and \`columnGap\` (\`normal\`, or a length in \`px\` or \`rem\`); the document stores only where the author forced a break, as Word and the legacy editor do.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`layout.columns\` | \`column.break.insert\` | \`Mod-Shift-Enter\` (⇧⌘Enter on Apple platforms, Ctrl+Shift+Enter elsewhere) | Column break in the Brand document toolbar while \`columns\` is above 1 | none | Inserts \`column_break\` after the top-level block that holds the selection end |

- With N columns, the first N - 1 breaks in document order are active and each ends a column. Later breaks stay in the document and show as inactive, so no presentation change removes content.
- \`column.break.insert\` is disabled, and \`execute\` returns \`not-applicable\`, while the document holds N - 1 or more breaks, which every document does under one column. A break inserted after the last block gets an empty paragraph after it, with the caret in it.
- A content root narrower than N times 240 px plus the gaps shows one column in document order, with every break inactive.
- In the editor a break is a separator named "Column break", and "Column break, inactive" while it is inactive. Backspace right after a break, or Delete on a selected break, removes it as one undo step, at the start of a list item too.
- The reader renders columns inside a \`fondue-rte-columns\` container, and \`toHTML\` with \`columns\` above 1 sets \`columns: N 240px\` and \`column-gap\` on the content root, with \`break-after: column\` on each active break.
- Package styles sit in the \`fondue-rte\` cascade layer, so a host rule on \`contentClassName\` overrides the column layout without \`!important\`.
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.layout-columns', model, plugins }),
        presentation: defineReactPresentation({ columns: 2, columnGap: '2rem', toolbar: [['column.break.insert']] }),
        defaultValue: {
            documentId: 'story-layout-columns',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'layout.columns', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        paragraph('Primary colours lead every layout.'),
                        { type: 'column_break' },
                        paragraph('Secondary colours support them. Press Mod-Shift-Enter for another break.'),
                    ],
                },
            },
        },
    },
    argTypes: { definition: { control: false }, defaultValue: { control: false } },
};
export default meta;

export const Default: StoryObj<typeof RichTextEditor> = {};

/** Three breaks under two columns: the first is active, the other two stay in the document and show as inactive. */
export const MoreBreaksThanColumns: StoryObj<typeof RichTextEditor> = {
    args: {
        defaultValue: {
            documentId: 'story-layout-columns-more',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'layout.columns', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        paragraph('One'),
                        { type: 'column_break' },
                        paragraph('Two'),
                        { type: 'column_break' },
                        paragraph('Three'),
                        { type: 'column_break' },
                        paragraph('Four'),
                    ],
                },
            },
        },
    },
};
