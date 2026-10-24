/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import {
    type ColorToken,
    contentChecksPlugin,
    corePlugin,
    defineEditor,
    defineReactPresentation,
    fontColorPlugin,
    headingPlugin,
    linksPlugin,
    mediaImagePlugin,
    modelOf,
    RichTextEditor,
} from '#/index';
import demoImage from '#/react/examples/demo-image.svg?no-inline';

// A feature story installs its feature and what it requires, plus the features whose content it checks, which its `feature:` tags name.
const plugins = [
    corePlugin(),
    headingPlugin(),
    linksPlugin(),
    mediaImagePlugin(),
    fontColorPlugin(),
    contentChecksPlugin(),
] as const;
const model = modelOf(plugins, {
    id: 'story.a11y-content-checks',
    version: 1,
});

const colorTokens: readonly ColorToken[] = [
    { id: 'brand.pale', label: 'Pale grey', value: '#c8c8c8', usage: ['font_color'] },
    { id: 'brand.ink', label: 'Ink', value: '#1a1a2e', usage: ['font_color'] },
];

const resolveAssetUrl = () => demoImage;

const text = (value: string) => ({ type: 'text', text: value });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/a11y.content-checks',
    component: RichTextEditor,
    tags: [
        'autodocs',
        'feature:a11y.content-checks',
        'feature:core',
        'feature:blocks.heading',
        'feature:links',
        'feature:media.image',
        'feature:marks.font-color',
    ],
    parameters: {
        docs: {
            description: {
                component: `
Accessibility checks of the content. Accessibility checks, in the toolbar, opens the issues panel: a region whose summary heading, which takes focus, counts the errors, the warnings and the items to review, then lists each issue in document order with its severity as text, the rule's name and ID and up to 60 characters of the text it concerns. Go to selects what the issue names, scrolls it into view and focuses the surface, and the panel stays open. Fix runs the repair: a command such as \`paragraph.set\` or \`heading.set\` as one undo step, or a dialog, popover or menu that returns focus to Fix when it closes. How to decide explains each rule. A warning or a review can be dismissed until its content changes or the page reloads, and Show dismissed lists it again; an error cannot, since each has a repair. While the panel is open, the surface outlines each automatic issue and marks it with an icon. Pressing Accessibility checks again while the panel is open moves focus to the issue last acted on, and Close or Escape closes the panel and returns focus to the surface.

The checks run 750 ms after the last change and when the panel opens, never while text is being composed. They store nothing in the document and never block a save. \`findContentIssues(document, options)\` from \`./model\` finds the same issues with the same IDs on a server. The option \`enclosingHeadingLevel\` is the host page's heading level around the editor, which the first heading is checked against; without it, the first heading is exempt.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`a11y.content-checks\` | \`checks.open\` |  | Checks button in the find and replace group, and the issues panel |  | None; the author fixes each finding with the owning feature's commands |

| Rule ID | Kind | Severity | Finds | Repair |
|---|---|---|---|---|
| \`image.alt-missing\` | automatic | error | An image whose alternative text is missing | The alternative text dialog |
| \`image.alt-suspicious\` | automatic | warning | Meaningful alternative text equal to the image label, ending in an image file extension, or a generic word | The alternative text dialog |
| \`image.content-review\` | manual | review | Any image | None |
| \`link.text-empty\` | automatic | error | A link whose text is empty after trimming | The link popover |
| \`link.text-vague\` | automatic | warning | Link text on the locale's vague list, after trimming and case folding | The link popover |
| \`link.purpose-review\` | manual | review | Any link | None |
| \`heading.empty\` | automatic | error | A heading with no text | \`paragraph.set\` |
| \`heading.skipped-level\` | automatic | warning | A heading more than one level below the previous one | \`heading.set\` with the level one below the previous one |
| \`heading.descriptive-review\` | manual | review | Any heading | None |
| \`contrast.low\` | automatic | error | Coloured text below 4.5:1, or 3:1 for large text, against a known opaque background | The colour menu with the passing tokens |
| \`contrast.unknown\` | automatic | review | Coloured text whose colour or background cannot be resolved | The colour menu |
| \`color.meaning-review\` | manual | review | Any text or highlight colour | None |
| \`language.parts-review\` | manual | review | Once per document | The language dialog, with \`marks.language\` |
| \`sensory.review\` | manual | review | Once per document | None |
| \`structure.review\` | manual | review | Once per document | None |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.a11y-content-checks', model, plugins }),
        presentation: defineReactPresentation({
            toolbar: [['checks.open', 'link.edit', 'mark.color.menu.open', 'image.insert']],
            colorTokens,
            resolveAssetUrl,
        }),
        defaultValue: {
            documentId: 'story-a11y-content-checks',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: model.capabilities,
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'heading',
                            attrs: { nodeId: 'heading-1', level: 1, lang: null },
                            content: [text('Launch checklist')],
                        },
                        {
                            type: 'heading',
                            attrs: { nodeId: 'heading-2', level: 3, lang: null },
                            content: [text('Skips a level')],
                        },
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                text('The brand guide is '),
                                {
                                    type: 'text',
                                    text: 'here',
                                    marks: [{ type: 'link', attrs: { href: 'https://example.com/guide' } }],
                                },
                                text('. '),
                                {
                                    type: 'text',
                                    text: 'Pale grey text is hard to read.',
                                    marks: [{ type: 'font_color', attrs: { tokenId: 'brand.pale', value: null } }],
                                },
                            ],
                        },
                        {
                            type: 'figure',
                            attrs: { nodeId: 'figure-1', align: 'center' },
                            content: [
                                {
                                    type: 'asset_image',
                                    attrs: {
                                        nodeId: 'image-1',
                                        assetId: 'harbour',
                                        labelSnapshot: 'harbour.jpg',
                                        altIntent: 'missing',
                                        altText: '',
                                    },
                                },
                            ],
                        },
                        { type: 'heading', attrs: { nodeId: 'heading-3', level: 2, lang: null } },
                    ],
                },
            },
        },
    },
    argTypes: { definition: { control: false }, defaultValue: { control: false }, presentation: { control: false } },
};
export default meta;

export const Default: StoryObj<typeof RichTextEditor> = {};
