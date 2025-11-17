/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TElement } from '@udecode/slate';
import escapeHtml from 'escape-html';

import { LINK_PLUGIN } from '@components/RichTextEditor/Plugins/LinkPlugin/id';
import { type TLinkElement } from '@components/RichTextEditor/Plugins/LinkPlugin/types';

import { type CSSPropertiesHover } from '../types';
import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';

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

    const target = node?.target ?? '_self';

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
    return `<a dir="auto" class="${defaultClassNames}" style="${reactCssPropsToCss(styles[LINK_PLUGIN])}" target="${target}" href="${escapeHtml(node.url as string)}">${children}</a>`;
};
