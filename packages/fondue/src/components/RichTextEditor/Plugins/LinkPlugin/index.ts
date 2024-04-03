/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin, createPluginFactory } from '@udecode/plate-core';
import { createLinkPlugin as createPlateLinkPlugin } from '@udecode/plate-link';
import { type CSSProperties } from 'react';

import { defaultStyles } from '@components/RichTextEditor/utils';
import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';

import { Plugin, type PluginProps } from '../Plugin';

import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { LinkButton } from './LinkButton';
import { LinkMarkupElement } from './LinkMarkupElement';
import { LINK_PLUGIN } from './id';

const createLinkPlugin: ReturnType<typeof createPluginFactory<NonNullable<unknown>>> = createPluginFactory({
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
