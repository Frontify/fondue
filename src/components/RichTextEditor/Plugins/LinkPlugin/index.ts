/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';
import { createLinkPlugin as createPlateLinkPlugin, createPluginFactory } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { LinkLoader } from '../types';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { LINK_PLUGIN } from './id';
import { LinkButton } from './LinkButton';
import { LinkMarkupElement } from './LinkMarkupElement';

export const createLinkPlugin = (loadLinkTree?: LinkLoader) =>
    createPluginFactory({
        ...createPlateLinkPlugin(),
        renderAfterEditable: CustomFloatingLink,
        options: {
            isUrl: isValidUrl,
            rangeBeforeOptions: {
                matchString: ' ',
                skipInvalid: true,
                afterMatch: true,
            },
            triggerFloatingLinkHotkeys: 'command+k, ctrl+k',
            loadLinkTree,
        },
    })();

export class LinkPlugin extends Plugin {
    private loadLinkTree?: LinkLoader;

    constructor(props?: PluginProps) {
        super(LINK_PLUGIN, {
            button: LinkButton,
            markupElement: new LinkMarkupElement(),
            ...props,
        });
        this.loadLinkTree = props?.loadLinkTree;
    }

    plugins() {
        return [createLinkPlugin(this.loadLinkTree)];
    }
}
