/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties } from 'react';
import { isValidUrl } from '@components/RichTextEditor/utils/isValidUrl';
import {
    ELEMENT_LINK,
    LinkRootProps,
    createLinkPlugin as createPlateLinkPlugin,
    createPluginFactory,
} from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { LINK_PLUGIN } from './id';
import { LinkButton } from './LinkButton';
import { defaultStyles } from '@components/RichTextEditor/utils';
import { MarkupElement } from '../MarkupElement';
import { useLink } from './helpers';

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

    plugins() {
        return [createLinkPlugin(this.styles)];
    }
}
class LinkMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LINK, node = LinkMarkupElementNode) {
        super(id, node);
    }
}
const LinkMarkupElementNode = ({ styles, ...props }: LinkRootProps & { styles: CSSProperties }) => {
    const htmlProps = useLink(props);
    const { attributes, children } = props;

    return (
        <a {...attributes} href={htmlProps.href} target={htmlProps.target} style={styles}>
            {children}
        </a>
    );
};

const createLinkPlugin = (styles: CSSProperties) =>
    createPluginFactory({
        ...createPlateLinkPlugin(),
        renderAfterEditable: CustomFloatingLink,
        component: LinkMarkupElementNode,
        options: {
            isUrl: isValidUrl,
            rangeBeforeOptions: {
                matchString: ' ',
                skipInvalid: true,
                afterMatch: true,
            },
            triggerFloatingLinkHotkeys: 'command+k, ctrl+k',
        },
    })({
        component: (props: LinkRootProps) => <LinkMarkupElementNode {...props} styles={styles} />,
    });
