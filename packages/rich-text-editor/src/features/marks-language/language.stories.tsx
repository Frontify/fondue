/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, language } from '#/features';
import { defineEditor, defineReactPresentation, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

const model = compileContentModel([core(), language({ languages: ['en', 'de', 'fr', 'ar'] })], {
    id: 'story.language',
    version: 1,
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/marks.language',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
The language of a passage, as a \`span\` with \`lang\` and \`dir\`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| \`marks.language\` | \`mark.language.edit\`, \`mark.language.set\` \`{ lang, dir }\` or \`null\` | none | Language picker | none | Sets or removes \`language\` |

The picker lists the \`languages\` option, labelled in the UI locale, with a stored tag the list misses first and checked. With no list, it takes a typed tag that \`Intl.getCanonicalLocales\` accepts. A rejected tag does not change the document. At a caret inside a passage, Apply and Remove change the whole passage; text typed at its end stays outside it.
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.language', model }),
        presentation: defineReactPresentation({ toolbar: [['mark.language.edit']] }),
        defaultValue: {
            documentId: 'story-language',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: model.capabilities,
                content: {
                    type: 'doc',
                    attrs: { lang: 'en', dir: 'ltr' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: 'de', align: null },
                            content: [
                                { type: 'text', text: 'Danke, and ' },
                                {
                                    type: 'text',
                                    text: 'شكرا',
                                    marks: [{ type: 'language', attrs: { lang: 'ar', dir: 'rtl' } }],
                                },
                                { type: 'text', text: '.' },
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
