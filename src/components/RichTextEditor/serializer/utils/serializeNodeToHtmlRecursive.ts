/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_BUTTON,
    ELEMENT_CHECK_ITEM,
    MappedMentionableItems,
    UL_CLASSES,
    getOrderedListClasses,
} from '@components/RichTextEditor/Plugins';
import { getTextStyle } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemContentMarkupElement';
import { TextStyles, alignmentClassnames } from '@components/RichTextEditor/Plugins/TextStylePlugin/TextStyles';
import { DesignTokens } from '@components/RichTextEditor/types';
import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_MENTION,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    TDescendant,
    TElement,
    TText,
    isText,
} from '@udecode/plate';
import { buttonNode } from '../nodes/button';
import { checkItemNode } from '../nodes/checkItem';
import { linkNode } from '../nodes/link';
import { mentionHtmlNode } from '../nodes/mentionHtmlNode';
import { reactCssPropsToCss } from './reactCssPropsToCss';
import { serializeLeafToHtml } from './serializeLeafToHtml';
import { merge } from '@utilities/merge';

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

type SerializeNodeToHtmlRecursiveOptions = {
    designTokens: DesignTokens;
    mappedMentionable?: MappedMentionableItems;
    nestingCount?: NestingCount;
};

export const serializeNodeToHtmlRecursive = (
    node: TDescendant,
    { designTokens, mappedMentionable, nestingCount = {} }: SerializeNodeToHtmlRecursiveOptions,
): string => {
    if (isText(node)) {
        return serializeLeafToHtml(node as TText);
    }

    const rootNestingCount = nestingCount[node.type] || countNodesOfType([node], node.type);
    const children = (node.children as TDescendant[])
        .map((n: TDescendant) =>
            serializeNodeToHtmlRecursive(n, {
                designTokens,
                nestingCount: {
                    ...nestingCount,
                    [n.type as string]: rootNestingCount,
                },
                mappedMentionable,
            }),
        )
        .join('');

    const hasColumnBreak = node.breakAfterColumn === 'active';
    const columnBreakClasses = hasColumnBreak ? 'tw-break-after-column tw-break-inside-avoid-column' : '';
    const breakWordsClass = 'tw-break-words';
    const alignClass = node?.align ? alignmentClassnames[node.align as string] : '';
    const classNames = merge([alignClass, breakWordsClass, columnBreakClasses]);

    switch (node.type) {
        case TextStyles.ELEMENT_HEADING1:
            return `<h1 class="${classNames}" style="${reactCssPropsToCss(designTokens.heading1)}">${children}</h1>`;
        case TextStyles.ELEMENT_HEADING2:
            return `<h2 class="${classNames}" style="${reactCssPropsToCss(designTokens.heading2)}">${children}</h2>`;
        case TextStyles.ELEMENT_HEADING3:
            return `<h3 class="${classNames}" style="${reactCssPropsToCss(designTokens.heading3)}">${children}</h3>`;
        case TextStyles.ELEMENT_HEADING4:
            return `<h4 class="${classNames}" style="${reactCssPropsToCss(designTokens.heading4)}">${children}</h4>`;
        case TextStyles.ELEMENT_CUSTOM1:
            return `<p class="${classNames}" style="${reactCssPropsToCss(designTokens.custom1)}">${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM2:
            return `<p class="${classNames}" style="${reactCssPropsToCss(designTokens.custom2)}">${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM3:
            return `<p class="${classNames}" style="${reactCssPropsToCss(designTokens.custom3)}">${children}</p>`;
        case TextStyles.ELEMENT_QUOTE:
            return `<p class="${classNames}" style="${reactCssPropsToCss(designTokens.quote)}">${children}</p>`;
        case ELEMENT_PARAGRAPH:
            return `<p class="${classNames} style="${reactCssPropsToCss(designTokens.p)}">${children}</p>`;
        case TextStyles.ELEMENT_IMAGE_TITLE:
            return `<p <p class="${classNames}" style="${reactCssPropsToCss(
                designTokens['image-title'],
            )}">${children}</p>`;
        case TextStyles.ELEMENT_IMAGE_CAPTION:
            return `<p <p class="${classNames}" style="${reactCssPropsToCss(
                designTokens.imageCaption,
            )}">${children}</p>`;
        case ELEMENT_UL:
            return `<ul class="${UL_CLASSES} ${classNames}">${children}</ul>`;
        case ELEMENT_OL:
            const nestingLevel = Math.max(rootNestingCount - countNodesOfType([node], ELEMENT_OL), 0);
            return `<ol class="${getOrderedListClasses(nestingLevel)} ${classNames}">${children}</ol>`;
        case ELEMENT_LI:
            const liElement = node as TElement;
            const styledLicElement = (liElement.children[0]?.children as TDescendant[])?.[0];
            const liStyles = { ...designTokens[getTextStyle(styledLicElement)], textDecoration: 'none' };

            return `<li class="${classNames}" style="${reactCssPropsToCss(liStyles)}">${children}</li>`;
        case ELEMENT_LIC:
            const licElement = node as TElement;
            const licStyles = { textDecoration: designTokens[getTextStyle(licElement.children[0])]?.textDecoration };
            return `<p class="${classNames}" style="${reactCssPropsToCss(licStyles)}">${children}</p>`;
        case ELEMENT_LINK:
            return linkNode(node, children, designTokens, classNames);
        case ELEMENT_BUTTON:
            return buttonNode(node, children, designTokens, classNames);
        case ELEMENT_CHECK_ITEM:
            return checkItemNode(node, children, classNames);
        case ELEMENT_MENTION:
            return mentionHtmlNode(node, { mentionable: mappedMentionable });

        default:
            return children;
    }
};
