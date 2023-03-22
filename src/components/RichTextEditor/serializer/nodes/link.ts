/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TLinkElement } from '@components/RichTextEditor/Plugins/LinkPlugin/types';
import { DesignTokens } from '@components/RichTextEditor/types';
import { TElement } from '@udecode/plate';
import escapeHtml from 'escape-html';
import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';

export const linkNode = (node: TElement, children: string, designTokens: DesignTokens, defaultClassNames: string) => {
    if (node.chosenLink) {
        const { chosenLink } = node as TLinkElement;
        return `<a class="${defaultClassNames}" style="${reactCssPropsToCss(designTokens.link)}" target=${
            chosenLink?.openInNewTab ? '_blank' : '_self'
        } href="${escapeHtml(chosenLink?.searchResult?.link)}">${children}</a>`;
    }
    return `<a class="${defaultClassNames}" style="${reactCssPropsToCss(designTokens.link)}" target="${
        node?.target ?? '_blank'
    }" href="${escapeHtml(node.url as string)}">${children}</a>`;
};
