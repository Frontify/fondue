/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';
import { createLinkPlugin as createPlateLinkPlugin } from '@udecode/plate-link';
import { PlatePlugin, createPluginFactory } from '@udecode/plate-core';
import { Plugin, PluginProps } from '../Plugin';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { LINK_PLUGIN } from './id';
import { LinkButton } from './LinkButton';
import { LinkMarkupElement } from './LinkMarkupElement';
import { CSSProperties } from 'react';
import { defaultStyles } from '@components/RichTextEditor/utils';

export const createLinkPlugin: ReturnType<typeof createPluginFactory<NonNullable<unknown>>> = createPluginFactory({
    ...createPlateLinkPlugin(),
    renderAfterEditable: CustomFloatingLink,
    options: {
        isUrl: isValidUrl,
        rangeBeforeOptions: {
            matchString: ' ',
            skipInvalid: true,
            afterMatch: true,
        },
        triggerFloatingLinkHotkeys: 'meta+k, ctrl+k',
        keepSelectedTextOnPaste: true,
    },
});

export class LinkPlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles[LINK_PLUGIN], ...props }: PluginProps = {}) {
        super(LINK_PLUGIN, {
            button: LinkButton,
            markupElement: new LinkMarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins(): PlatePlugin[] {
        return [createLinkPlugin()];
    }
}
