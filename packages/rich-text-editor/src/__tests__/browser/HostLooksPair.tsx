/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import {
    type ButtonLook,
    bulletListContent,
    bulletListPlugin,
    checkListContent,
    checkListPlugin,
    fontColorContent,
    fontColorPlugin,
    type TextLinkLook,
    type LinkAppearance,
    linkContent,
    linkPlugin,
    quoteContent,
    quotePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    type RtePlugin,
    type TextLook,
    textStyleContent,
    textStylePlugin,
} from '../../index';

import { BODY_QUOTE_LINK_DOCUMENT } from './hostStylingValues';

type HostLooksPairProps = {
    body?: TextLook;
    quote?: TextLook;
    link?: TextLinkLook;
    buttons?: Partial<Record<LinkAppearance, ButtonLook>>;
    /**
     * The document both surfaces draw.
     * @default BODY_QUOTE_LINK_DOCUMENT
     */
    value?: RteDocument;
};

const pluginsWithLooks = ({ body, quote, link, buttons }: HostLooksPairProps): RtePlugin[] => [
    textStylePlugin({ presets: { body, quote } }),
    bulletListPlugin(),
    checkListPlugin(),
    fontColorPlugin(),
    quotePlugin(),
    linkPlugin({ look: { text: link, button: buttons } }),
];

// The renderer gets content only, as a page that only shows documents would, so the looks must travel with the content.
const contentWithLooks = ({ body, quote, link, buttons }: HostLooksPairProps) => [
    textStyleContent({ presets: { body, quote } }),
    bulletListContent,
    checkListContent,
    fontColorContent,
    quoteContent,
    linkContent({ look: { text: link, button: buttons } }),
];

/** The renderer and the editor side by side, drawing body text, a quote and links with the same looks. */
export const HostLooksPair = ({ value = BODY_QUOTE_LINK_DOCUMENT, ...looks }: HostLooksPairProps) => {
    const plugins = pluginsWithLooks(looks);
    const content = contentWithLooks(looks);

    return (
        <>
            <div data-testid="renderer">
                <RichTextRenderer value={value} plugins={content} />
            </div>
            <div data-testid="editor">
                <RichTextEditor value={value} plugins={plugins} />
            </div>
        </>
    );
};
