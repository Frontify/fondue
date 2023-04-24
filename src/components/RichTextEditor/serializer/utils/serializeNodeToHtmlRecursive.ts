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
import { LI_CLASSNAMES, getLiStyles } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemMarkupElement';
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
    isText,
} from '@udecode/plate';
import { merge } from '@utilities/merge';
import { buttonNode } from '../nodes/button';
import { checkItemNode } from '../nodes/checkItem';
import { linkNode } from '../nodes/link';
import { mentionHtmlNode } from '../nodes/mentionHtmlNode';
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
        return serializeLeafToHtml(node);
    }

    const rootNestingCount = nestingCount[node.type] || countNodesOfType([node], node.type);
    let children = '';
    for (const element of node.children) {
        children += serializeNodeToHtmlRecursive(element, {
            designTokens,
            nestingCount: {
                ...nestingCount,
                [element.type as string]: rootNestingCount,
            },
            mappedMentionable,
        });
    }

    return (
        MapNodeTypesToHtml[node.type]({
            classNames: getClassNames(node.breakAfterColumn as string | undefined, node.align as string | undefined),
            children,
            designTokens,
            rootNestingCount,
            node,
            mappedMentionable,
        }) ?? children
    );
};

type Arguments = {
    classNames: string;
    designTokens: DesignTokens;
    children: string;
    rootNestingCount: number;
    node: TElement;
    mappedMentionable?: MappedMentionableItems;
};

const MapNodeTypesToHtml: { [key: string]: ({ ...args }: Arguments) => string } = {
    [TextStyles.ELEMENT_HEADING1]: (args) => getTextStyleHtml(TextStyles.ELEMENT_HEADING1, args, 'h1'),
    [TextStyles.ELEMENT_HEADING2]: (args) => getTextStyleHtml(TextStyles.ELEMENT_HEADING2, args, 'h2'),
    [TextStyles.ELEMENT_HEADING3]: (args) => getTextStyleHtml(TextStyles.ELEMENT_HEADING3, args, 'h3'),
    [TextStyles.ELEMENT_HEADING4]: (args) => getTextStyleHtml(TextStyles.ELEMENT_HEADING4, args, 'h4'),
    [ELEMENT_PARAGRAPH]: (args) => getTextStyleHtml(TextStyles.ELEMENT_PARAGRAPH, args, 'p'),
    [TextStyles.ELEMENT_CUSTOM1]: (args) => getTextStyleHtml(TextStyles.ELEMENT_CUSTOM1, args, 'p'),
    [TextStyles.ELEMENT_CUSTOM2]: (args) => getTextStyleHtml(TextStyles.ELEMENT_CUSTOM2, args, 'p'),
    [TextStyles.ELEMENT_CUSTOM3]: (args) => getTextStyleHtml(TextStyles.ELEMENT_CUSTOM3, args, 'p'),
    [TextStyles.ELEMENT_QUOTE]: (args) => getTextStyleHtml(TextStyles.ELEMENT_QUOTE, args, 'p'),
    [TextStyles.ELEMENT_IMAGE_TITLE]: (args) => getTextStyleHtml(TextStyles.ELEMENT_IMAGE_TITLE, args, 'p'),
    [TextStyles.ELEMENT_IMAGE_CAPTION]: (args) => getTextStyleHtml(TextStyles.ELEMENT_IMAGE_CAPTION, args, 'p'),
    [ELEMENT_UL]: (args) => `<ul class="${UL_CLASSES} ${args.classNames}">${args.children}</ul>`,
    [ELEMENT_OL]: ({ classNames, children, node, rootNestingCount }) => {
        const nestingLevel = Math.max(rootNestingCount - countNodesOfType([node], ELEMENT_OL), 0);
        return `<ol class="${getOrderedListClasses(nestingLevel)} ${classNames}" style="${reactCssPropsToCss(
            OL_STYLES,
        )}">${children}</ol>`;
    },
    [ELEMENT_LI]: ({ classNames, designTokens, children, node }) =>
        `<li class="${classNames} ${LI_CLASSNAMES}" style="${reactCssPropsToCss(
            getLiStyles(designTokens, node),
        )}">${children}</li>`,
    [ELEMENT_LIC]: ({ classNames, designTokens, children, node }) => {
        const underline = getUnderlineClassNames(designTokens, node);
        return `<p class="${classNames} ${getLicElementClassNames(
            node,
        )}"><span class="${underline}">${children}</span></p>`;
    },
    [ELEMENT_LINK]: ({ node, children, designTokens, classNames }) =>
        linkNode(node, children, designTokens, classNames),
    [ELEMENT_BUTTON]: ({ node, children, designTokens, classNames }) =>
        buttonNode(node, children, designTokens, classNames),
    [ELEMENT_CHECK_ITEM]: ({ node, children, classNames }) => checkItemNode(node, children, classNames),
    [ELEMENT_MENTION]: ({ node, mappedMentionable }) => mentionHtmlNode(node, { mentionable: mappedMentionable }),
};

const getTextStyleHtml = (
    tag: TextStyles,
    { classNames, designTokens, children }: Arguments,
    htmlTag: 'p' | 'h1' | 'h2' | 'h3' | 'h4',
) => `<${htmlTag} class="${classNames}" style="${reactCssPropsToCss(designTokens[tag])}">${children}</${htmlTag}>`;

const getClassNames = (breakAfterColumn?: string, align?: string) => {
    const breakWordsClass = 'tw-break-words';
    const columnBreakClasses =
        breakAfterColumn === 'active' ? 'tw-break-after-column tw-break-inside-avoid-column' : '';
    const alignClass = align ? alignmentClassnames[align as string] : '';
    return merge([alignClass, breakWordsClass, columnBreakClasses]);
};
