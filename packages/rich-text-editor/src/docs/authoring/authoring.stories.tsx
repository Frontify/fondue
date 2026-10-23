/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { bold, core, strike } from '#/features';
import { defineEditor, defineReactPresentation, RichTextEditor } from '#/index';
import { compileContentModel, type ContentModel, type ContentNodeJSON } from '#/model';

import { calloutEditor } from './callout-editor';
import { callout } from './callout-feature';
import { strongEditor } from './strong';

const strikeModel = compileContentModel([core(), strike()], { id: 'story.authoring-strike', version: 1 });
const calloutModel = compileContentModel([core(), callout()], { id: 'story.authoring-callout', version: 1 });
const strongModel = compileContentModel([core(), bold()], { id: 'story.authoring-strong', version: 1 });

const paragraph = (text: string): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [{ type: 'text', text }],
});

/** A stored document of `model` with `content`, whose `requiredCapabilities` list the features it uses. */
const valueOf = (model: ContentModel, features: readonly string[], content: readonly ContentNodeJSON[]) => ({
    documentId: model.ref.id,
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: model.ref,
        requiredCapabilities: features.map((id) => ({ id, version: 1 })),
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content },
    },
});

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Authoring',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The examples of the Authoring guide, each mounted as a host mounts it: a shipped editor part, a host block with a node view, and a host part that replaces a shipped toolbar entry.',
            },
        },
    },
    args: { 'aria-label': 'Notes' },
    argTypes: {
        definition: { control: false },
        defaultValue: { control: false },
        presentation: { control: false },
    },
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

export const StrikePlugin: Story = {
    name: 'Strike plugin',
    parameters: {
        docs: {
            description: {
                story: '`marks.strike` with its shipped editor part: Mod+Shift+X, `~~text~~` or the toolbar.',
            },
        },
    },
    args: {
        definition: defineEditor({ id: 'story.authoring-strike', model: strikeModel }),
        presentation: defineReactPresentation({ toolbar: [['mark.strike.toggle']] }),
        defaultValue: valueOf(strikeModel, ['core'], [paragraph('Select this text and press Mod+Shift+X.')]),
    },
};

export const CustomBlock: Story = {
    name: 'Custom block with a node view',
    parameters: {
        docs: {
            description: {
                story: 'A host feature `acme.callout` and its editor part: the Callout button wraps the selection, and the node view switches the tone.',
            },
        },
    },
    args: {
        definition: defineEditor({ id: 'story.authoring-callout', model: calloutModel, plugins: [calloutEditor] }),
        presentation: defineReactPresentation({ toolbar: [['callout.toggle']] }),
        defaultValue: valueOf(
            calloutModel,
            ['core', 'acme.callout'],
            [
                { type: 'callout', attrs: { tone: 'note' }, content: [paragraph('Callouts hold paragraphs.')] },
                paragraph('Put the caret here and press Callout.'),
            ],
        ),
    },
};

export const ReplacedToolbarEntry: Story = {
    name: 'Host part replacing a toolbar entry',
    parameters: {
        docs: {
            description: {
                story: 'A host part for `marks.bold` whose toolbar entry `bold` replaces the shipped one, so the button reads Strong.',
            },
        },
    },
    args: {
        definition: defineEditor({ id: 'story.authoring-strong', model: strongModel, plugins: [strongEditor] }),
        presentation: defineReactPresentation({ toolbar: [['mark.bold.toggle']] }),
        defaultValue: valueOf(strongModel, ['core'], [paragraph('Select this text and press Strong.')]),
    },
};
