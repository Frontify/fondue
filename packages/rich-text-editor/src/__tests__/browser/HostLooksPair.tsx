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
    bulletLook?: BulletListLook;
    numberedLook?: NumberedListLook;
    /**
     * The document both surfaces draw.
     * @default BODY_QUOTE_LINK_DOCUMENT
     */
    value?: RteDocument;
};

const pluginsWithLooks = ({ body, quote, link, bulletLook, numberedLook }: HostLooksPairProps): RtePlugin[] => [
    textStylePlugin({ presets: { body, quote, link } }),
    bulletListPlugin({ look: bulletLook }),
    numberedListPlugin({ look: numberedLook }),
    checkListPlugin(),
    fontColorPlugin(),
    quotePlugin(),
    linkPlugin(),
];

// The renderer gets content only, as a page that only shows documents would, so the looks must travel with the content.
const contentWithLooks = ({ body, quote, link, bulletLook, numberedLook }: HostLooksPairProps) => [
    textStyleContent({ presets: { body, quote, link } }),
    bulletListContent({ look: bulletLook }),
    numberedListContent({ look: numberedLook }),
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
