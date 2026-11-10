/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import {
    bulletListPlugin,
    checkListPlugin,
    fontColorPlugin,
    type LinkLook,
    linkPlugin,
    paragraphPlugin,
    quotePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RtePlugin,
    type RteDocument,
    serializeToHtml,
    type TextLook,
    textStylePlugin,
    type TextStylePluginOptions,
} from '../../index';

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and
// the plugin list holds functions, which cannot travel as props.

/** One block per text style, in the dropdown's order. */
const ALL_PRESETS_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading1', children: [{ text: 'Heading 1' }] },
        { type: 'textStyle', style: 'heading2', children: [{ text: 'Heading 2' }] },
        { type: 'textStyle', style: 'heading3', children: [{ text: 'Heading 3' }] },
        { type: 'textStyle', style: 'heading4', children: [{ text: 'Heading 4' }] },
        { type: 'textStyle', style: 'custom1', children: [{ text: 'Custom 1' }] },
        { type: 'textStyle', style: 'custom2', children: [{ text: 'Custom 2' }] },
        { type: 'textStyle', style: 'custom3', children: [{ text: 'Custom 3' }] },
        { type: 'textStyle', style: 'imageTitle', children: [{ text: 'Image title' }] },
        { type: 'textStyle', style: 'imageCaption', children: [{ text: 'Image caption' }] },
    ],
};

/** The variable a host defines around its editors, as the guideline's theme settings would. */
const hostVariable = (name: string, value: string): CSSProperties =>
    // CSSProperties has no custom properties.
    ({ [name]: value }) as CSSProperties;

const SECTION_A = hostVariable('--f-h1-color', 'rgb(255, 0, 0)');
const SECTION_B = hostVariable('--f-h1-color', 'rgb(0, 0, 255)');

type HostStylingProps = {
    presets?: TextStylePluginOptions['presets'];
};

/** The renderer and the editor side by side, drawing the same document with the same presets. */
export const HostStylingPair = ({ presets }: HostStylingProps) => (
    <>
        <div data-testid="renderer">
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
        <div data-testid="editor">
            <RichTextEditor value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
    </>
);

/** Two sections that define the same variable differently, each with its own renderer. */
export const HostStylingSections = ({ presets }: HostStylingProps) => (
    <>
        <div data-testid="section-a" style={SECTION_A}>
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
        <div data-testid="section-b" style={SECTION_B}>
            <RichTextRenderer value={ALL_PRESETS_DOCUMENT} plugins={[textStylePlugin({ presets })]} />
        </div>
    </>
);

/** Body text, a block quote and links, with a preset and a heading beside them that the body look must not reach. */
const BODY_QUOTE_LINK_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        { type: 'paragraph', children: [{ text: 'Body text' }] },
        {
            type: 'bulletList',
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'Bullet item' }] }] }],
        },
        {
            type: 'checkList',
            children: [
                {
                    type: 'checkItem',
                    checked: false,
                    children: [{ type: 'paragraph', children: [{ text: 'Check item' }] }],
                },
                {
                    type: 'checkItem',
                    checked: true,
                    children: [{ type: 'paragraph', children: [{ text: 'Done item' }] }],
                },
            ],
        },
        { type: 'quote', children: [{ text: 'A quote' }] },
        { type: 'paragraph', children: [{ text: 'A link', link: { href: 'https://example.com' } }] },
        {
            type: 'paragraph',
            children: [
                {
                    text: 'A coloured link',
                    link: { href: 'https://example.com' },
                    fontColor: { color: '#ff0000' },
                },
            ],
        },
        { type: 'textStyle', style: 'custom1', children: [{ text: 'Custom 1' }] },
        { type: 'textStyle', style: 'heading1', children: [{ text: 'Heading 1' }] },
    ],
};

type HostLooksProps = {
    /** Body text; the plugin is mounted only when this is given. */
    body?: TextLook;
    quote?: TextLook;
    link?: LinkLook;
    presets?: TextStylePluginOptions['presets'];
};

const pluginsWithLooks = ({ body, quote, link, presets }: HostLooksProps): RtePlugin[] => {
    const plugins = [
        textStylePlugin({ presets }),
        bulletListPlugin,
        checkListPlugin,
        fontColorPlugin,
        quotePlugin({ look: quote }),
        linkPlugin({ look: link }),
    ];
    if (body !== undefined) {
        plugins.push(paragraphPlugin({ look: body }));
    }
    return plugins;
};

/** The renderer and the editor side by side, drawing body text, a quote and links with the same looks. */
export const HostLooksPair = (props: HostLooksProps) => {
    const plugins = pluginsWithLooks(props);

    return (
        <>
            <div data-testid="renderer">
                <RichTextRenderer value={BODY_QUOTE_LINK_DOCUMENT} plugins={plugins} />
            </div>
            <div data-testid="editor">
                <RichTextEditor value={BODY_QUOTE_LINK_DOCUMENT} plugins={plugins} />
            </div>
        </>
    );
};

/** Every text style, then body text (in list items too), a quote and a link; the text styles are listed once. */
const EXPORT_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        ...ALL_PRESETS_DOCUMENT.blocks,
        ...BODY_QUOTE_LINK_DOCUMENT.blocks.filter((block) => block.type !== 'textStyle'),
    ],
};

type ExportedHtmlProps = {
    html: string;
    testId: string;
};

const ExportedHtml = ({ html, testId }: ExportedHtmlProps) => (
    // Safe: the HTML is our own serializer's output for a fixed document, so nothing in it comes from a user.
    // oxlint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
    <div data-testid={testId} dangerouslySetInnerHTML={{ __html: html }} />
);

/** The same document exported twice, as classes and as inline styles, with the same looks. */
export const ExportedLooksPair = (props: HostLooksProps) => {
    const plugins = pluginsWithLooks(props);

    return (
        <>
            <ExportedHtml testId="classes" html={serializeToHtml(EXPORT_DOCUMENT, { plugins })} />
            <ExportedHtml testId="inline" html={serializeToHtml(EXPORT_DOCUMENT, { plugins, styling: 'inline' })} />
        </>
    );
};
