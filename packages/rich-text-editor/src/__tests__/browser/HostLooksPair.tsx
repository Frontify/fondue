/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { RichTextEditor, RichTextRenderer, type RteDocument, type RtePlugin } from '../../index';
import {
    bulletListContent,
    type BulletListLook,
    bulletListPlugin,
    checkListContent,
    checkListPlugin,
    fontColorContent,
    fontColorPlugin,
    linkContent,
    type LinkLook,
    linkPlugin,
    type ListLooks,
    numberedListContent,
    type NumberedListLook,
    numberedListPlugin,
    quoteContent,
    quotePlugin,
    type TextLook,
    textStyleContent,
    textStylePlugin,
} from '../../plugins';

import { BODY_QUOTE_LINK_DOCUMENT } from './hostStylingValues';

type HostLooksPairProps = {
    body?: TextLook;
    quote?: TextLook;
    link?: LinkLook;
    bulletLooks?: ListLooks<BulletListLook>;
    numberedLooks?: ListLooks<NumberedListLook>;
    /**
     * The document both surfaces draw.
     * @default BODY_QUOTE_LINK_DOCUMENT
     */
    value?: RteDocument;
};

const pluginsWithLooks = ({ body, quote, link, bulletLooks, numberedLooks }: HostLooksPairProps): RtePlugin[] => [
    textStylePlugin({ presets: { body, quote, link } }),
    bulletListPlugin({ looks: bulletLooks }),
    numberedListPlugin({ looks: numberedLooks }),
    checkListPlugin(),
    fontColorPlugin(),
    quotePlugin(),
    linkPlugin(),
];

// The renderer gets content only, as a page that only shows documents would, so the looks must travel with the content.
const contentWithLooks = ({ body, quote, link, bulletLooks, numberedLooks }: HostLooksPairProps) => [
    textStyleContent({ presets: { body, quote, link } }),
    bulletListContent({ looks: bulletLooks }),
    numberedListContent({ looks: numberedLooks }),
    checkListContent,
    fontColorContent,
    quoteContent,
    linkContent,
];

/** The renderer and the editor side by side, drawing body text, lists, a quote and links with the same looks. */
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
