/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import {
    type BulletListLook,
    bulletListPlugin,
    checkListPlugin,
    fontColorPlugin,
    type LinkLook,
    linkPlugin,
    type ListLooks,
    type NumberedListLook,
    numberedListPlugin,
    quotePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    type RtePlugin,
    type TextLook,
    textStylePlugin,
} from '../../index';

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
    checkListPlugin,
    fontColorPlugin,
    quotePlugin,
    linkPlugin,
];

/** The renderer and the editor side by side, drawing body text, lists, a quote and links with the same looks. */
export const HostLooksPair = ({ value = BODY_QUOTE_LINK_DOCUMENT, ...looks }: HostLooksPairProps) => {
    const plugins = pluginsWithLooks(looks);

    return (
        <>
            <div data-testid="renderer">
                <RichTextRenderer value={value} plugins={plugins} />
            </div>
            <div data-testid="editor">
                <RichTextEditor value={value} plugins={plugins} />
            </div>
        </>
    );
};
