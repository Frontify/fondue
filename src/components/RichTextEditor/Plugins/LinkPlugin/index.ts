/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createLinkPlugin as createPlateLinkPlugin, createPluginFactory } from '@udecode/plate';
import { LINK_PLUGIN } from './id';
import { LinkMarkupElement } from './LinkMarkupElement';
import { LinkButton } from './LinkButton';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { Plugin, PluginProps } from '../Plugin';
import { isUrlOrPath } from './utils';

export const createLinkPlugin = createPluginFactory({
    ...createPlateLinkPlugin(),
    renderAfterEditable: CustomFloatingLink,
    options: {
        isUrl: isUrlOrPath,
        rangeBeforeOptions: {
            matchString: ' ',
            skipInvalid: true,
            afterMatch: true,
        },
        triggerFloatingLinkHotkeys: 'command+k, ctrl+k',
    },
});

export class LinkPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(LINK_PLUGIN, {
            button: LinkButton,
            markupElement: new LinkMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createLinkPlugin()];
    }
}
