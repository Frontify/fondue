/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

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
    type TextLook,
    textStylePlugin,
} from '../../index';

import { BODY_QUOTE_LINK_DOCUMENT } from './hostStylingValues';

type HostLooksPairProps = {
    /** Body text; the plugin is mounted only when this is given. */
    body?: TextLook;
    quote?: TextLook;
    link?: LinkLook;
};

const pluginsWithLooks = ({ body, quote, link }: HostLooksPairProps): RtePlugin[] => {
    const plugins = [
        textStylePlugin(),
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
export const HostLooksPair = (props: HostLooksPairProps) => {
    const plugins = pluginsWithLooks(props);

    return (
        <>
            <div data-test-id="renderer">
                <RichTextRenderer value={BODY_QUOTE_LINK_DOCUMENT} plugins={plugins} />
            </div>
            <div data-test-id="editor">
                <RichTextEditor value={BODY_QUOTE_LINK_DOCUMENT} plugins={plugins} />
            </div>
        </>
    );
};
