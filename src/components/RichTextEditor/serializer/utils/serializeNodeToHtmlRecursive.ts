/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_BUTTON,
    ELEMENT_CHECK_ITEM,
    UL_CLASSES,
    getOrderedListClasses,
} from '@components/RichTextEditor/Plugins';
import { TLinkElement } from '@components/RichTextEditor/Plugins/LinkPlugin/types';
import { getTextStyle } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemContentMarkupElement';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/TextStyles';
import { DesignTokens } from '@components/RichTextEditor/types';
import { breakAfterClassNames } from '@components/RichTextEditor/utils';
import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    TDescendant,
    TElement,
    TText,
    isText,
} from '@udecode/plate';
import escapeHtml from 'escape-html';
import { reactCssPropsToCss } from './reactCssPropsToCss';
import { serializeLeafToHtml } from './serializeLeafToHtml';

const countNodesOfType = (nodes: TDescendant[], type: string): number => {
    return nodes.reduce((acc, node) => {
        if (node.type === type) {
            acc++;
        }
        if (node.children) {
            return acc + countNodesOfType(node.children as TDescendant[], type);
        }
        return acc;
    }, 0);
};

type NestingCount = {
    [type: string]: number;
};

export const serializeNodeToHtmlRecursive = (
    node: TDescendant,
    designTokens: DesignTokens,
    nestingCount: NestingCount = {},
): string => {
    if (isText(node)) {
        return serializeLeafToHtml(node as TText);
    }

    const rootNestingCount = nestingCount[node.type] || countNodesOfType([node], node.type);
    const children = (node.children as TDescendant[])
        .map((n: TDescendant) =>
            serializeNodeToHtmlRecursive(n, designTokens, {
                ...nestingCount,
                [n.type as string]: rootNestingCount,
            }),
        )
        .join('');

    console.log(node, 'node');
    const breakAfterColumn = node.breakAfterColumn ? `class="${breakAfterClassNames}" ` : '';

    switch (node.type) {
        case TextStyles.ELEMENT_HEADING1:
            return `<h1 ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.heading1)}">${children}</h1>`;
        case TextStyles.ELEMENT_HEADING2:
            return `<h2 ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.heading2)}">${children}</h2>`;
        case TextStyles.ELEMENT_HEADING3:
            return `<h3 ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.heading3)}">${children}</h3>`;
        case TextStyles.ELEMENT_HEADING4:
            return `<h4 ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.heading4)}">${children}</h4>`;
        case TextStyles.ELEMENT_CUSTOM1:
            return `<p ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.custom1)}">${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM2:
            return `<p ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.custom2)}">${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM3:
            return `<p ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.custom3)}">${children}</p>`;
        case TextStyles.ELEMENT_QUOTE:
            return `<p ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.quote)}">${children}</p>`;
        case ELEMENT_PARAGRAPH:
            return `<p ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.p)}">${children}</p>`;
        case ELEMENT_UL:
            return `<ul class="${UL_CLASSES}">${children}</ul>`;
        case ELEMENT_OL:
            const nestingLevel = Math.max(rootNestingCount - countNodesOfType([node], ELEMENT_OL), 0);
            return `<ol class="${getOrderedListClasses(nestingLevel)}">${children}</ol>`;
        case ELEMENT_LI:
            const liElement = node as TElement;
            const styledLicElement = (liElement.children[0]?.children as TDescendant[])?.[0];
            const liStyles = { ...designTokens[getTextStyle(styledLicElement)], textDecoration: 'none' };

            return `<li style="${reactCssPropsToCss(liStyles)}">${children}</li>`;
        case ELEMENT_LIC:
            const licElement = node as TElement;
            const licStyles = { textDecoration: designTokens[getTextStyle(licElement.children[0])]?.textDecoration };
            return `<p ${breakAfterColumn}style="${reactCssPropsToCss(licStyles)}">${children}</p>`;
        case ELEMENT_LINK:
            if (node.chosenLink) {
                const { chosenLink } = node as TLinkElement;
                return `<a ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.link)}" target=${
                    chosenLink?.openInNewTab ? '_blank' : '_self'
                } href="${escapeHtml(chosenLink?.searchResult?.link)}">${children}</a>`;
            }
            return `<a ${breakAfterColumn}style="${reactCssPropsToCss(designTokens.link)}" href="${escapeHtml(
                node.url as string,
            )}">${children}</a>`;
        case ELEMENT_BUTTON:
            return `<a class="btn btn-${node.buttonStyle}" href="${escapeHtml(node.url as string)}">${children}</a>`;
        case ELEMENT_CHECK_ITEM:
            return `<input type="checkbox"/><label>${children}</label>`;

        default:
            return children;
    }
};
