/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { core } from '#/features/core/feature';
import { compileContentModel } from '#/model';
import { RichTextReader } from '#/reader';

const model = compileContentModel([core()], { id: 'story.reader', version: 1 });

const text = (value: string) => ({ type: 'text', text: value });
const paragraph = (...content: readonly unknown[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const stored = (...blocks: readonly unknown[]) => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'story.reader', version: 1 },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
});

const meta: Meta<typeof RichTextReader> = {
    title: 'Rich Text Editor/Reader',
    component: RichTextReader,
    tags: ['autodocs'],
    args: { model },
    argTypes: { model: { control: false }, locale: { control: false } },
};
export default meta;

type Story = StoryObj<typeof RichTextReader>;

export const Default: Story = {
    args: {
        document: stored(
            paragraph(text('Published text renders as semantic HTML, on the server and in the browser.')),
            paragraph(text('A line'), { type: 'hard_break' }, text('break keeps its place.')),
        ),
    },
};

/** An opaque island keeps its text in a labelled fallback, with one notice for the document. */
export const UnsupportedContent: Story = {
    args: {
        document: stored(
            paragraph(text('The reader shows what it understands.')),
            {
                type: 'callout',
                attrs: { tone: 'warm' },
                content: [paragraph(text('A block this model does not know.'))],
            },
            paragraph(
                text('An inline one: '),
                { type: 'sticker', content: [text('smile')] },
                text(' stays in its line.'),
            ),
        ),
    },
};

/** A document written for another model shows only a message. */
export const BlockedContent: Story = {
    args: {
        document: { ...stored(paragraph(text('Hidden'))), model: { id: 'another.model', version: 1 } },
    },
};

export const DarkTheme: Story = { ...UnsupportedContent, globals: { theme: 'dark' } };

export const BothThemes: Story = { ...UnsupportedContent, globals: { theme: 'both' } };

export const RightToLeft: Story = { ...UnsupportedContent, globals: { direction: 'rtl' } };

/** The island notice and the fallback labels come from the German locale of the package. */
export const German: Story = {
    ...UnsupportedContent,
    globals: { locale: 'de-DE' },
    play: ({ canvasElement }) => {
        const notice = canvasElement.querySelector('[data-rte-message="islands"]')?.textContent;
        if (notice !== 'Einige Inhalte werden hier nicht unterstützt.') {
            throw new Error(`The notice is "${notice}", expected the German one.`);
        }
    },
};
