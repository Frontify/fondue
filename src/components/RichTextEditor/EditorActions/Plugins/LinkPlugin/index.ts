/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK, createBoldPlugin, createPluginFactory } from '@udecode/plate';
import { LINK_PLUGIN } from './id';
import { LinkMarkupElement } from './LinkMarkupElement';
import { LinkButton } from './LinkButton';
import { Plugin } from '../Plugin';

export const createLinkChooserPlugin = createPluginFactory({
    key: ELEMENT_LINK,
    isElement: true,
    isInline: true,
});

export class LinkPlugin extends Plugin {
    constructor(id = LINK_PLUGIN, button = LinkButton, markupElement = new LinkMarkupElement()) {
        super(id, button, markupElement);
    }

    plugins() {
        return [createBoldPlugin()];
    }
}
