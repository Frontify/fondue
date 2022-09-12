/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK, createBoldPlugin, createPluginFactory } from '@udecode/plate';
import { LINK_PLUGIN } from './id';
import { LinkMarkupElement } from './LinkMarkupElement';
import { LinkButton } from './LinkButton';
import { Plugin, PluginProps } from '../Plugin';

export const createLinkChooserPlugin = createPluginFactory({
    key: ELEMENT_LINK,
    isElement: true,
    isInline: true,
});

export class LinkPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super({
            id: LINK_PLUGIN,
            button: LinkButton,
            markupElement: new LinkMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createBoldPlugin()];
    }
}
