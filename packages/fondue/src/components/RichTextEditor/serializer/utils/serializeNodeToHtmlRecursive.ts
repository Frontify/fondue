/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { type TDescendant, type TElement, isText } from '@udecode/slate';

import { ELEMENT_CHECK_ITEM } from '@components/RichTextEditor/Plugins/CheckboxListPlugin/id';
import {
    LIST_ITEM_SPAN_CLASSES,
    getLicElementClassNames,
} from '@components/RichTextEditor/Plugins/ListPlugin/ListItemContentMarkupElement';
import { LI_CLASSNAMES, getLiStyles } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemMarkupElement';
import {
    OL_STYLES,
    getOrderedListClasses,
} from '@components/RichTextEditor/Plugins/ListPlugin/OrderedListPlugin/OrderedListMarkupElement';
import { UL_CLASSES } from '@components/RichTextEditor/Plugins/ListPlugin/UnorderedListPlugin/UnorderedListMarkupElement';
import { type MappedMentionableItems } from '@components/RichTextEditor/Plugins/MentionPlugin/types';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/types';
import { ELEMENT_BUTTON, alignmentClassnames } from '@components/RichTextEditor/Plugins/helper';
import { merge } from '@utilities/merge';

import { type ButtonStylesType, buttonNode } from '../nodes/button';
import { checkItemNode } from '../nodes/checkItem';
import { linkNode } from '../nodes/link';
import { mentionHtmlNode } from '../nodes/mentionHtmlNode';
import { type CSSPropertiesHover } from '../types';

import { reactCssPropsToCss } from './reactCssPropsToCss';
import { serializeLeafToHtml } from './serializeLeafToHtml';

const getNestingLevels = (nodes: TDescendant[], type: string): number => {
    let maxDepth = 0;

    for (const node of nodes) {
        let currentDepth = 0;
        if (node.type === type) {
            currentDepth = 1;
        }
        if (node.children) {
            currentDepth += getNestingLevels(node.children as TDescendant[], type);
        }
        maxDepth = Math.max(maxDepth, currentDepth);
    }

    return maxDepth;
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
    styles: Record<string, CSSPropertiesHover> | ButtonStylesType,
    { mappedMentionable, nestingCount = {} }: SerializeNodeToHtmlRecursiveOptions,
): string => {
    if (isText(node)) {
        return serializeLeafToHtml(node);
    }

    const rootNestingCount = nestingCount[node.type] || getNestingLevels([node], node.type);
    let children = '';
    for (const element of node.children) {
        children += serializeNodeToHtmlRecursive(element, styles, {
            nestingCount: {
                ...nestingCount,
                [element.type as string]: rootNestingCount,
            },
            mappedMentionable,
        });
    }

    const htmlMapper = MapNodeTypesToHtml[node.type];
    try {
        return (
            htmlMapper({
                classNames: getClassNames(
                    node.breakAfterColumn as string | undefined,
                    node.align as string | undefined,
                ),
                children,
                rootNestingCount,
                node,
                mappedMentionable,
                styles,
            }) ?? children
        );
    } catch {
        console.warn(`The htmlMapper for node type: '${node.type}' does not exist.`);
        return children;
    }
};

type Arguments = {
    classNames: string;
    children: string;
    rootNestingCount: number;
    node: TElement;
    mappedMentionable?: MappedMentionableItems;
    styles: Record<string, CSSPropertiesHover>;
};

const MapNodeTypesToHtml: { [key: string]: ({ ...args }: Arguments) => string } = {
    [TextStyles.heading1]: (args) => getTextStyleHtml(TextStyles.heading1, args, 'h1'),
    [TextStyles.heading2]: (args) => getTextStyleHtml(TextStyles.heading2, args, 'h2'),
    [TextStyles.heading3]: (args) => getTextStyleHtml(TextStyles.heading3, args, 'h3'),
    [TextStyles.heading4]: (args) => getTextStyleHtml(TextStyles.heading4, args, 'h4'),
    [TextStyles.p]: (args) => getTextStyleHtml(TextStyles.p, args, 'p'),
    [TextStyles.custom1]: (args) => getTextStyleHtml(TextStyles.custom1, args, 'p'),
    [TextStyles.custom2]: (args) => getTextStyleHtml(TextStyles.custom2, args, 'p'),
    [TextStyles.custom3]: (args) => getTextStyleHtml(TextStyles.custom3, args, 'p'),
    [TextStyles.quote]: (args) => getTextStyleHtml(TextStyles.quote, args, 'p'),
    [TextStyles.imageTitle]: (args) => getTextStyleHtml(TextStyles.imageTitle, args, 'p'),
    [TextStyles.imageCaption]: (args) => getTextStyleHtml(TextStyles.imageCaption, args, 'p'),
    [ELEMENT_UL]: (args) => `<ul dir="auto" class="${UL_CLASSES} ${args.classNames}">${args.children}</ul>`,
    [ELEMENT_OL]: ({ classNames, children, node, rootNestingCount }) => {
        const nestingLevel = Math.max(rootNestingCount - getNestingLevels([node], ELEMENT_OL), 0);
        return `<ol dir="auto" class="${getOrderedListClasses(nestingLevel)} ${classNames}" style="${reactCssPropsToCss(
            OL_STYLES,
        )}">${children}</ol>`;
    },
    [ELEMENT_LI]: ({ classNames, children, node, styles }) =>
        `<li dir="auto" class="${classNames} ${LI_CLASSNAMES}" style="${reactCssPropsToCss(
            getLiStyles(node, styles),
        )}">${children}</li>`,
    [ELEMENT_LIC]: ({ classNames, children, node }) =>
        `<p dir="auto" class="${classNames} ${getLicElementClassNames(node, false)}"><span class="${LIST_ITEM_SPAN_CLASSES}">${children}</span></p>`,
    [ELEMENT_LINK]: ({ node, children, classNames, styles }) => linkNode(node, children, classNames, styles),
    [ELEMENT_BUTTON]: ({ node, children, classNames, styles }) =>
        buttonNode(node, children, classNames, styles as ButtonStylesType),
    [ELEMENT_CHECK_ITEM]: ({ node, children, classNames, styles }) => checkItemNode(node, children, classNames, styles),
    [ELEMENT_MENTION]: ({ node, mappedMentionable }) => mentionHtmlNode(node, { mentionable: mappedMentionable }),
};

const getTextStyleHtml = (
    tag: TextStyles,
    { classNames, styles, children }: Arguments,
    htmlTag: 'p' | 'h1' | 'h2' | 'h3' | 'h4',
) => `<${htmlTag} dir="auto" class="${classNames}" style="${reactCssPropsToCss(styles[tag])}">${children}</${htmlTag}>`;

const getClassNames = (breakAfterColumn?: string, align?: string) => {
    const breakWordsClass = 'tw-break-words';
    const columnBreakClasses =
        breakAfterColumn === 'active' ? 'tw-break-after-column tw-break-inside-avoid-column' : '';
    const alignClass = align ? alignmentClassnames[align] : '';
    return merge([alignClass, breakWordsClass, columnBreakClasses]);
};
