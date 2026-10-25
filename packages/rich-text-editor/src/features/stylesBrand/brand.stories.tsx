/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { defineReactPresentation } from '#/entries/authoring';
import {
    brandStylesPlugin,
    corePlugin,
    defineEditor,
    headingPlugin,
    modelOf,
    quotePlugin,
    RichTextEditor,
} from '#/index';

// A feature story installs only its feature and what it requires, which its `feature:` tags name.
const plugins = [corePlugin(), headingPlugin(), quotePlugin(), brandStylesPlugin()] as const;
const model = modelOf(plugins, {
    id: 'story.styles-brand',
    version: 1,
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/styles.brand',
    component: RichTextEditor,
    tags: ['autodocs', 'feature:styles.brand', 'feature:blocks.heading', 'feature:blocks.quote', 'feature:core'],
    parameters: {
        docs: {
            description: {
                component: `
Brand styles: \`styleId\` on \`paragraph\`, \`heading\` and \`blockquote\`, which the presentation's \`styles\` resolve to a recipe. The editor and the reader apply each recipe through a class of one generated stylesheet, and a recipe may declare \`hover\` declarations. A style changes only how a block looks, never its node type or heading level. An ID the styles miss or deprecate keeps the block's default look and reports one \`styles.unknown-style\` warning.

The text style picker lists the styles that are not deprecated and apply to the block's type, each row previewing its font family, size and weight; Default style removes the block's style.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`styles.brand\` | \`block.style.set\` with \`{ styleId }\`, \`null\` for the default | none | Brand styles in the text style picker, filtered by \`appliesTo\` | none | Changes only the block's \`styleId\` |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.styles-brand', model, plugins }),
        presentation: defineReactPresentation({
            toolbar: [['text-style']],
            styles: [
                {
                    id: 'brand.title',
                    label: 'Title',
                    appliesTo: ['heading'],
                    deprecated: false,
                    recipe: { fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700 },
                },
                {
                    id: 'brand.lead',
                    label: 'Lead',
                    appliesTo: ['paragraph'],
                    deprecated: false,
                    recipe: { fontSize: 20, lineHeight: 1.5, fontWeight: 300 },
                },
                {
                    id: 'brand.legacy',
                    label: 'Legacy',
                    appliesTo: ['paragraph'],
                    deprecated: true,
                    recipe: { fontSize: 18 },
                },
            ],
        }),
        defaultValue: {
            documentId: 'story-styles-brand',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'blocks.heading', version: 1 },
                    { id: 'blocks.quote', version: 1 },
                    { id: 'core', version: 1 },
                    { id: 'styles.brand', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'heading',
                            attrs: { nodeId: 'heading-1', level: 2, lang: null, styleId: 'brand.title' },
                            content: [{ type: 'text', text: 'Our voice' }],
                        },
                        {
                            type: 'paragraph',
                            attrs: { lang: null, styleId: 'brand.lead' },
                            content: [{ type: 'text', text: 'We speak plainly and warmly.' }],
                        },
                        {
                            type: 'paragraph',
                            attrs: { lang: null, styleId: null },
                            content: [
                                { type: 'text', text: 'Pick a style for this paragraph in the text style picker.' },
                            ],
                        },
                    ],
                },
            },
        },
    },
    argTypes: {
        definition: { control: false },
        defaultValue: { control: false },
        presentation: { control: false },
    },
};
export default meta;

export const Default: StoryObj<typeof RichTextEditor> = {};
