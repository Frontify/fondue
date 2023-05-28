/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';
import { createLinkPlugin as createPlateLinkPlugin, createPluginFactory } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { LINK_PLUGIN } from './id';
import { LinkButton } from './LinkButton';
import { LinkMarkupElement } from './LinkMarkupElement';
import { CSSProperties } from 'react';

export const createLinkPlugin = createPluginFactory({
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
    },
});

export class LinkPlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultLinkStyles, ...props }: PluginProps = {}) {
        super(LINK_PLUGIN, {
            button: LinkButton,
            markupElement: new LinkMarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createLinkPlugin()];
    }
}

const defaultLinkStyles = {
    fontSize: '14px',
    fontStyle: 'normal',
    color: 'rgb(113, 89, 215)',
    textDecoration: 'underline',
    cursor: 'pointer',
};
