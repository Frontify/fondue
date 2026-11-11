/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    bulletListPlugin,
    checkListPlugin,
    fontColorPlugin,
    type LinkLook,
    linkPlugin,
    paragraphPlugin,
    quotePlugin,
    type RtePlugin,
    type TextLook,
    textStylePlugin,
    type TextStylePluginOptions,
} from '../../index';

// Apart from the fixture components, because a component test cannot import plain values from the file holding the components it mounts.

export type HostLooksOptions = {
    /** Body text; the plugin is mounted only when this is given. */
    body?: TextLook;
    quote?: TextLook;
    link?: LinkLook;
    presets?: TextStylePluginOptions['presets'];
};

export const pluginsWithLooks = ({ body, quote, link, presets }: HostLooksOptions): RtePlugin[] => {
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
