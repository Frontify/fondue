/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TLinkElement } from '@components/RichTextEditor/Plugins/LinkPlugin/types';
import { TElement } from '@udecode/slate';
import escapeHtml from 'escape-html';
import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';
import { CSSPropertiesHover } from '../types';
import { LINK_PLUGIN } from '@components/RichTextEditor/Plugins/LinkPlugin/id';

export const linkNode = (
    node: TElement,
    children: string,
    defaultClassNames: string,
    styles: Record<string, CSSPropertiesHover>,
) => {
    if (node.chosenLink) {
        const { chosenLink } = node as TLinkElement;
        return `<a dir="auto" class="${defaultClassNames}" style="${reactCssPropsToCss(styles[LINK_PLUGIN])}" target=${
            chosenLink?.openInNewTab ? '_blank' : '_self'
        } href="${escapeHtml(chosenLink?.searchResult?.link)}">${children}</a>`;
    }
    return `<a dir="auto" class="${defaultClassNames}" style="${reactCssPropsToCss(styles[LINK_PLUGIN])}" target="${
        node?.target ?? '_self'
    }" href="${escapeHtml(node.url as string)}">${children}</a>`;
};
