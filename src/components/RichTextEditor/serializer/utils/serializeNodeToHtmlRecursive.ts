/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_BUTTON,
    ELEMENT_CHECK_ITEM,
    MappedMentionableItems,
    OL_STYLES,
    UL_CLASSES,
    getOrderedListClasses,
} from '@components/RichTextEditor/Plugins';
import {
    getLicElementClassNames,
    getUnderlineClassNames,
} from '@components/RichTextEditor/Plugins/ListPlugin/ListItemContentMarkupElement';
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
import { LI_CLASSNAMES, getLiStyles } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemMarkupElement';

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

    const breakAfterColumn = node.breakAfterColumn as string | undefined;
    const align = node.align as string | undefined;

    switch (node.type) {
        case TextStyles.ELEMENT_HEADING1:
            return `<h1 class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.heading1,
            )}">${children}</h1>`;
        case TextStyles.ELEMENT_HEADING2:
            return `<h2 class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.heading2,
            )}">${children}</h2>`;
        case TextStyles.ELEMENT_HEADING3:
            return `<h3 class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.heading3,
            )}">${children}</h3>`;
        case TextStyles.ELEMENT_HEADING4:
            return `<h4 class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.heading4,
            )}">${children}</h4>`;
        case TextStyles.ELEMENT_CUSTOM1:
            return `<p class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.custom1,
            )}">${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM2:
            return `<p class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.custom2,
            )}">${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM3:
            return `<p class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.custom3,
            )}">${children}</p>`;
        case TextStyles.ELEMENT_QUOTE:
            return `<p class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.quote,
            )}">${children}</p>`;
        case ELEMENT_PARAGRAPH:
            return `<p class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.p,
            )}">${children}</p>`;
        case TextStyles.ELEMENT_IMAGE_TITLE:
            return `<p class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.imageTitle,
            )}">${children}</p>`;
        case TextStyles.ELEMENT_IMAGE_CAPTION:
            return `<p class="${getClassNames(breakAfterColumn, align)}" style="${reactCssPropsToCss(
                designTokens.imageCaption,
            )}">${children}</p>`;
        case ELEMENT_UL:
            return `<ul class="${UL_CLASSES} ${getClassNames(breakAfterColumn, align)}">${children}</ul>`;
        case ELEMENT_OL:
            const nestingLevel = Math.max(rootNestingCount - countNodesOfType([node], ELEMENT_OL), 0);
            return `<ol class="${getOrderedListClasses(nestingLevel)} ${getClassNames(
                breakAfterColumn,
                align,
            )}" style="${reactCssPropsToCss(OL_STYLES)}">${children}</ol>`;
        case ELEMENT_LI:
            return `<li class="${getClassNames(breakAfterColumn, align)} ${LI_CLASSNAMES}" style="${reactCssPropsToCss(
                getLiStyles(designTokens, node),
            )}">${children}</li>`;
        case ELEMENT_LIC:
            const underline = getUnderlineClassNames(designTokens, node);
            return `<p class="${getClassNames(breakAfterColumn, align)} ${getLicElementClassNames(
                node,
            )}"><span class="${underline}">${children}</span></p>`;
        case ELEMENT_LINK:
            return linkNode(node, children, designTokens, getClassNames(breakAfterColumn, align));
        case ELEMENT_BUTTON:
            return buttonNode(node, children, designTokens, getClassNames(breakAfterColumn, align));
        case ELEMENT_CHECK_ITEM:
            return checkItemNode(node, children, getClassNames(breakAfterColumn, align));
        case ELEMENT_MENTION:
            return mentionHtmlNode(node, { mentionable: mappedMentionable });
        default:
            return children;
    }
};

const getClassNames = (breakAfterColumn?: string, align?: string) => {
    const breakWordsClass = 'tw-break-words';
    const columnBreakClasses =
        breakAfterColumn === 'active' ? 'tw-break-after-column tw-break-inside-avoid-column' : '';
    const alignClass = align ? alignmentClassnames[align as string] : '';
    return merge([alignClass, breakWordsClass, columnBreakClasses]);
};
