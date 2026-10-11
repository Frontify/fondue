/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, links } from '#/features';
import { defineEditor, defineReactPresentation, type ReferenceService, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

const model = compileContentModel([core(), links({ resourceTypes: ['guideline-page'] })], {
    id: 'story.links',
    version: 1,
});

// Guideline pages the popover finds by name, as a host's reference service returns them.
const PAGES = ['Logo', 'Colors', 'Typography'].map((label) => ({
    resourceType: 'guideline-page',
    resourceId: label.toLowerCase(),
    labelSnapshot: label,
    href: `https://brand.example.com/${label.toLowerCase()}`,
}));
const references: ReferenceService = {
    search: ({ query }) =>
        Promise.resolve({
            items: PAGES.filter(({ labelSnapshot }) => labelSnapshot.toLowerCase().includes(query.toLowerCase())),
            nextCursor: null,
        }),
};

const link = (href: string, openInNewWindow: boolean) => ({
    type: 'link',
    attrs: { href, openInNewWindow, styleId: null },
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/links',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Links as the \`link\` mark: an \`a\` with \`href\`, which typing at its end does not extend.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`links\` | \`link.edit\`, \`link.set\` \`{ href, text?, openInNewWindow, styleId }\`, \`link.remove\` | \`Mod-k\` for \`link.edit\` | Link button and the link popover; the link bubble with Open, Edit, Copy and Remove | \`link.autolink\` | Sets \`link\` over the selection or the whole link at a caret, or inserts the visible text as a linked run at a caret outside a link; \`link.remove\` removes the whole link and keeps its text |

Options: \`allowedSchemes\` and \`allowedHosts\` narrow the URL check and never widen it; \`resourceTypes\` names what the popover searches through \`services.references\`.

The popover offers the URL, the text, Open in new window and, with presentation styles that apply to links, a Style select. A URL with no scheme that names a host gets \`https://\`, while \`/docs\`, \`./a.pdf\`, \`#top\` and \`?q=a\` stay relative; one that fails the URL check keeps the popover open with the error on the field. A caret at a link shows the link bubble; Alt+F10 moves focus into it and Escape closes it. Mod+click, or Open, opens the link in a new tab with no opener; in a read-only editor a plain click follows it. Typing a URL and a space or Enter links it, and Backspace right after removes that link and keeps the text.

The reader writes \`target="_blank"\` and \`rel="noopener noreferrer"\` on a new-window link, with out-of-sight text that says it opens a new window; \`toHTML\` writes the two attributes alone.
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.links', model }),
        presentation: defineReactPresentation({ toolbar: [['link.edit']] }),
        services: { references },
        defaultValue: {
            documentId: 'story-links',
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
                            type: 'paragraph',
                            attrs: { lang: null, align: null, styleId: null },
                            content: [
                                { type: 'text', text: 'Read the ' },
                                { type: 'text', text: 'brand guide', marks: [link('https://frontify.com', false)] },
                                { type: 'text', text: ' or ' },
                                {
                                    type: 'text',
                                    text: 'open it in a new window',
                                    marks: [link('https://frontify.com/brand', true)],
                                },
                                { type: 'text', text: '.' },
                            ],
                        },
                    ],
                },
            },
        },
    },
    argTypes: { definition: { control: false }, defaultValue: { control: false }, services: { control: false } },
};
export default meta;

export const Default: StoryObj<typeof RichTextEditor> = {};
