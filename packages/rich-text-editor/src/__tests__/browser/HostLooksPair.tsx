/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx and documentSpacing.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { type RteDocumentOf } from '../../core/document';
import {
    bulletListPlugin,
    checkListPlugin,
    columnBreakPlugin,
    fontColorPlugin,
    type LinkLook,
    linkPlugin,
    quotePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RtePlugin,
    type TextLook,
    textStylePlugin,
} from '../../index';

import { BODY_QUOTE_LINK_DOCUMENT } from './hostStylingValues';
import { ownMarginsPlugin } from './ownMarginsPlugin';

type HostLooksPairProps = {
    body?: TextLook;
    quote?: TextLook;
    link?: LinkLook;
    /**
     * The document both surfaces draw.
     * @default BODY_QUOTE_LINK_DOCUMENT
     */
    value?: RteDocumentOf;
    /** Mounts `ownMarginsPlugin`, a block drawn by its own component whose class hands its margins to the document. */
    withOwnMarginsBlock?: boolean;
    /** Mounts `columnBreakPlugin`, a block whose stylesheet hands its margins to the document. */
    withColumnBreak?: boolean;
};

const pluginsWithLooks = ({
    body,
    quote,
    link,
    withOwnMarginsBlock,
    withColumnBreak,
}: HostLooksPairProps): RtePlugin[] => {
    const plugins = [
        textStylePlugin({ presets: { body, quote, link } }),
        bulletListPlugin,
        checkListPlugin,
        fontColorPlugin,
        quotePlugin,
        linkPlugin,
    ];
    if (withOwnMarginsBlock === true) {
        plugins.push(ownMarginsPlugin);
    }
    if (withColumnBreak === true) {
        plugins.push(columnBreakPlugin());
    }
    return plugins;
};

/** The renderer and the editor side by side, drawing body text, a quote and links with the same looks. */
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
