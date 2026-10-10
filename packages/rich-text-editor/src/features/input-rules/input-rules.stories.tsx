/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core, inputRules } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

// A feature story installs only its feature and what it requires, which its `feature:` tags name (SPEC-rich-text/AC-053).
const model = compileContentModel(
    [
        core(),
        inputRules({
            typography: [
                'typography.quotes',
                'typography.ellipsis',
                'typography.dashes',
                'typography.symbols',
                'typography.numeric',
            ],
        }),
    ],
    { id: 'story.input-rules', version: 1 },
);

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Features/input-rules',
    component: RichTextEditor,
    tags: ['feature:core', 'feature:input-rules'],
    args: {
        'aria-label': 'Notes',
        definition: defineEditor({ id: 'story.input-rules', model }),
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
                                    text: 'Type "quotes", ..., -- between words, (c), and 1/2 then a space.',
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
