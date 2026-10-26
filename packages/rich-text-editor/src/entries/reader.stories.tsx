/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { RichTextReader } from '#/entries/reader';
import { deDE } from '#/locales/de-DE';
import { documentModel } from '#/plugins';
import {
    blocksRecord,
    bulletList,
    codeBlock,
    heading,
    mark,
    orderedList,
    paragraph,
    quote,
    text,
} from '#/react/examples/records';
import '#/react/examples/contentStyles';

const model = documentModel;
const stored = (...blocks: Parameters<typeof blocksRecord>[2][]) =>
    blocksRecord(model, 'story-reader', ...blocks).document;
/** The content every reader story shows: headings, lists, a quote, code and a link. */
const CONTENT = [
    heading('heading-1', 1, 'Logo guidelines'),
    paragraph(
        text('Read the '),
        mark('brand guide', 'link', {
            href: 'https://frontify.com',
            openInNewWindow: false,
            styleId: null,
        }),
        text(' before you use the logo.'),
    ),
    heading('heading-2', 2, 'Clear space'),
    bulletList([text('Keep the logo clear of other elements')], [text('Never stretch it')]),
    orderedList([text('Pick the version')], [text('Place it on the page')]),
    quote(text('The logo is the face of the brand.')),
    codeBlock("<img src='logo.svg' alt='Acme logo' />"),
];

const meta: Meta<typeof RichTextReader> = {
    title: 'Rich Text Editor/Reader',
    component: RichTextReader,
    tags: ['autodocs'],
    // Reader content has no editable surface.
    parameters: { noSurface: true },
    args: { model },
    argTypes: { model: { control: false }, locale: { control: false } },
};
export default meta;

type Story = StoryObj<typeof RichTextReader>;

export const Default: Story = {
    args: {
        document: stored(
            ...CONTENT,
            paragraph(text('Published text renders as semantic HTML, on the server and in the browser.')),
            paragraph(text('A line'), { type: 'hard_break' } as never, text('break keeps its place.')),
        ),
    },
};

/** An opaque island keeps its text in a labelled fallback, with one notice for the document. */
export const UnsupportedContent: Story = {
    args: {
        document: stored(
            ...CONTENT,
            paragraph(text('The reader shows what it understands.')),
            {
                type: 'callout',
                attrs: { tone: 'warm' },
                content: [paragraph(text('A block this model does not know.'))],
            },
            paragraph(
                text('An inline one: '),
                { type: 'sticker', content: [text('smile')] } as never,
                text(' stays in its line.'),
            ),
        ),
    },
};

/** A document written for another model shows only a message. */
export const BlockedContent: Story = {
    args: {
        document: { ...stored(...CONTENT), model: { id: 'another.model', version: 1 } },
    },
};

export const DarkTheme: Story = { ...UnsupportedContent, globals: { theme: 'dark' } };

export const BothThemes: Story = { ...UnsupportedContent, globals: { theme: 'both' } };

export const RightToLeft: Story = { ...UnsupportedContent, globals: { direction: 'rtl' } };

/** The island notice and the fallback labels come from the German locale of the package. */
export const German: Story = {
    ...UnsupportedContent,
    args: { ...UnsupportedContent.args, locale: deDE },
    play: ({ canvasElement }) => {
        const notice = canvasElement.querySelector('[data-rte-message="islands"]')?.textContent;
        if (notice !== 'Einige Inhalte werden hier nicht unterstützt.') {
            throw new Error(`The notice is "${notice}", expected the German one.`);
        }
    },
};
