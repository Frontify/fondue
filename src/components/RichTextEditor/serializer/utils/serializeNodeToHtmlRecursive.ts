/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_BUTTON,
    ELEMENT_CHECK_ITEM,
    MappedMentionableItems,
    OL_STYLES,
    UL_CLASSES,
    alignmentClassnames,
    getOrderedListClasses,
} from '@components/RichTextEditor/Plugins';
import { getLicElementClassNames } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemContentMarkupElement';
import { LI_CLASSNAMES, getLiStyles } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemMarkupElement';
import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_MENTION,
    ELEMENT_OL,
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
import { defaultNode } from '../nodes/default';
import { CSSProperties } from 'react';

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
    mappedMentionable?: MappedMentionableItems;
    nestingCount?: NestingCount;
};

export const serializeNodeToHtmlRecursive = (
    node: TDescendant,
    theme: Record<string, CSSProperties & { hover?: CSSProperties }>,
    { mappedMentionable, nestingCount = {} }: SerializeNodeToHtmlRecursiveOptions,
): string => {
    if (isText(node)) {
        return serializeLeafToHtml(node);
    }

    const rootNestingCount = nestingCount[node.type] || countNodesOfType([node], node.type);
    let children = '';
    for (const element of node.children) {
        children += serializeNodeToHtmlRecursive(element, theme, {
            nestingCount: {
                ...nestingCount,
                [element.type as string]: rootNestingCount,
            },
            mappedMentionable,
        });
    }

    const htmlMapper = MapNodeTypesToHtml[node.type];
    if (typeof htmlMapper !== 'undefined') {
        return htmlMapper({
            classNames: getClassNames(node.breakAfterColumn as string | undefined, node.align as string | undefined),
            children,
            rootNestingCount,
            node,
            mappedMentionable,
            theme,
        });
    } else {
        return defaultNode(
            node,
            children,
            theme[node.type],
            getClassNames(node.breakAfterColumn as string | undefined, node.align as string | undefined),
        );
    }
};

type Arguments = {
    classNames: string;
    children: string;
    rootNestingCount: number;
    node: TElement;
    mappedMentionable?: MappedMentionableItems;
    theme: Record<string, CSSProperties & { hover?: CSSProperties }>;
};

const MapNodeTypesToHtml: { [key: string]: ({ ...args }: Arguments) => string } = {
    [ELEMENT_UL]: (args) => `<ul class="${UL_CLASSES} ${args.classNames}">${args.children}</ul>`,
    [ELEMENT_OL]: ({ classNames, children, node, rootNestingCount }) => {
        const nestingLevel = Math.max(rootNestingCount - countNodesOfType([node], ELEMENT_OL), 0);
        return `<ol class="${getOrderedListClasses(nestingLevel)} ${classNames}" style="${reactCssPropsToCss(
            OL_STYLES,
        )}">${children}</ol>`;
    },
    [ELEMENT_LI]: ({ classNames, children, node, theme }) =>
        `<li class="${classNames} ${LI_CLASSNAMES}" style="${reactCssPropsToCss(
            getLiStyles(node, theme),
        )}">${children}</li>`,
    [ELEMENT_LIC]: ({ classNames, children, node }) =>
        `<p class="${classNames} ${getLicElementClassNames(node)}"><span>${children}</span></p>`,
    [ELEMENT_LINK]: ({ node, children, classNames, theme }) => linkNode(node, children, classNames, theme),
    [ELEMENT_BUTTON]: ({ node, children, classNames, theme }) => buttonNode(node, children, classNames, theme),
    [ELEMENT_CHECK_ITEM]: ({ node, children, classNames, theme }) => checkItemNode(node, children, classNames, theme),
    [ELEMENT_MENTION]: ({ node, mappedMentionable }) => mentionHtmlNode(node, { mentionable: mappedMentionable }),
};

const getClassNames = (breakAfterColumn?: string, align?: string) => {
    const breakWordsClass = 'tw-break-words';
    const columnBreakClasses =
        breakAfterColumn === 'active' ? 'tw-break-after-column tw-break-inside-avoid-column' : '';
    const alignClass = align ? alignmentClassnames[align] : '';
    return merge([alignClass, breakWordsClass, columnBreakClasses]);
};
