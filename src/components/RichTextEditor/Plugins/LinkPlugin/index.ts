/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';
import { createLinkPlugin as createPlateLinkPlugin, createPluginFactory } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { InternalLinksLoader } from '../types';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { LINK_PLUGIN } from './id';
import { LinkButton } from './LinkButton';
import { LinkMarkupElement } from './LinkMarkupElement';

export const createLinkPlugin = (loadInternalLinks?: InternalLinksLoader) =>
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
            loadInternalLinks,
        },
    })();

export class LinkPlugin extends Plugin {
    private loadInternalLinks?: InternalLinksLoader;

    constructor(props?: PluginProps) {
        super(LINK_PLUGIN, {
            button: LinkButton,
            markupElement: new LinkMarkupElement(),
            ...props,
        });
        this.loadInternalLinks = props?.loadInternalLinks;
    }

    plugins() {
        return [createLinkPlugin(this.loadInternalLinks)];
    }
}
