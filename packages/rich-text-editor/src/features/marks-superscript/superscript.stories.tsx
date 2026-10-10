/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, superscript } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name (SPEC-rich-text/AC-053).
const model = compileContentModel([core(), superscript()], { id: 'story.marks-superscript', version: 1 });

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/marks.superscript',
    component: RichTextEditor,
    tags: ['feature:core', 'feature:marks.superscript'],
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.marks-superscript', model }),
        defaultValue: {
            documentId: 'story-marks-superscript',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'marks.superscript', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                { type: 'text', text: 'Press Mod+. for superscript, as in mc' },
                                { type: 'text', text: '2', marks: [{ type: 'superscript' }] },
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
