/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { type TDescendant, type TElement, isText } from '@udecode/slate';

import { ELEMENT_CHECK_ITEM } from '@components/RichTextEditor/Plugins/CheckboxListPlugin/id';
import {
    LIST_BULLET_CONTAINER_CLASSES,
    LIST_ITEM_SPAN_CLASSES,
    getLicElementClassNames,
} from '@components/RichTextEditor/Plugins/ListPlugin/ListItemContentMarkupElement';
import { LI_CLASSNAMES, getLiStyles } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemMarkupElement';
import { OL_CLASSES } from '@components/RichTextEditor/Plugins/ListPlugin/OrderedListPlugin/OrderedListMarkupElement';
import { UL_CLASSES } from '@components/RichTextEditor/Plugins/ListPlugin/UnorderedListPlugin/UnorderedListMarkupElement';
import {
    DEFAULT_OL_STYLES,
    DEFAULT_UL_STYLES,
    type OrderedListLevelStyle,
    type UnorderedListLevelStyle,
} from '@components/RichTextEditor/Plugins/ListPlugin/types';
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

type ListNestingDepth = {
    [ELEMENT_OL]?: number;
    [ELEMENT_UL]?: number;
};

type SerializeNodeToHtmlRecursiveOptions = {
    mappedMentionable?: MappedMentionableItems;
    orderedListStyles?: OrderedListLevelStyle[];
    unorderedListStyles?: UnorderedListLevelStyle[];
    bulletHtml?: string;
    listNestingDepth?: ListNestingDepth;
};

const getBulletHtml = (
    listNode: TElement,
    nestingLevel: number,
    orderedListStyles?: OrderedListLevelStyle[],
    unorderedListStyles?: UnorderedListLevelStyle[],
): string => {
    if (listNode.type === ELEMENT_UL) {
        const ulStyles = unorderedListStyles ?? DEFAULT_UL_STYLES;
        const levelStyle = ulStyles[nestingLevel % ulStyles.length];
        const text = levelStyle.shape ?? "'\u2022'";
        const color = levelStyle.color ?? 'currentColor';
        const size = levelStyle.size ?? '1em';
        return `<span class="${LIST_BULLET_CONTAINER_CLASSES}" style="--bullet-content: ${text}; --bullet-color: ${color}; --bullet-size: ${size};"></span>`;
    }

    if (listNode.type === ELEMENT_OL) {
        const olStyles = orderedListStyles ?? DEFAULT_OL_STYLES;
        const levelStyle = olStyles[nestingLevel % olStyles.length];
        const counterType = levelStyle.counterType;
        const color = levelStyle.color ?? 'currentColor';
        return `<span class="${LIST_BULLET_CONTAINER_CLASSES}" style="--bullet-content: counter(list-counter, ${counterType}) '.'; --bullet-color: ${color};"></span>`;
    }

    return '';
};

export const serializeNodeToHtmlRecursive = (
    node: TDescendant,
    styles: Record<string, CSSPropertiesHover> | ButtonStylesType,
    {
        mappedMentionable,
        orderedListStyles,
        unorderedListStyles,
        bulletHtml: parentBulletHtml = '',
        listNestingDepth = {},
    }: SerializeNodeToHtmlRecursiveOptions,
): string => {
    if (isText(node)) {
        return serializeLeafToHtml(node);
    }

    const isListContainer = node.type === ELEMENT_OL || node.type === ELEMENT_UL;

    const currentListNestingDepth = { ...listNestingDepth };
    if (isListContainer) {
        const key = node.type as typeof ELEMENT_OL | typeof ELEMENT_UL;
        currentListNestingDepth[key] = (currentListNestingDepth[key] ?? -1) + 1;
    }

    const nestingLevel = isListContainer
        ? (currentListNestingDepth[node.type as typeof ELEMENT_OL | typeof ELEMENT_UL] ?? 0)
        : 0;

    let children = '';
    for (let i = 0; i < node.children.length; i++) {
        const element = node.children[i];
        const bulletHtml = isListContainer
            ? getBulletHtml(node, nestingLevel, orderedListStyles, unorderedListStyles)
            : parentBulletHtml;

        children += serializeNodeToHtmlRecursive(element, styles, {
            mappedMentionable,
            orderedListStyles,
            unorderedListStyles,
            bulletHtml,
            listNestingDepth: currentListNestingDepth,
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
                node,
                mappedMentionable,
                styles,
                bulletHtml: parentBulletHtml,
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
    node: TElement;
    mappedMentionable?: MappedMentionableItems;
    styles: Record<string, CSSPropertiesHover>;
    bulletHtml: string;
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
    [ELEMENT_UL]: ({ classNames, children }) => `<ul dir="auto" class="${UL_CLASSES} ${classNames}">${children}</ul>`,
    [ELEMENT_OL]: ({ classNames, children }) => `<ol dir="auto" class="${OL_CLASSES} ${classNames}">${children}</ol>`,
    [ELEMENT_LI]: ({ classNames, children, node, styles }) =>
        `<li dir="auto" class="${classNames} ${LI_CLASSNAMES}" style="${reactCssPropsToCss(
            getLiStyles(node, styles),
        )}">${children}</li>`,
    [ELEMENT_LIC]: ({ classNames, children, node, bulletHtml }) =>
        `<p dir="auto" class="${classNames} ${getLicElementClassNames(node, false)}">${bulletHtml}<span class="${LIST_ITEM_SPAN_CLASSES}">${children}</span></p>`,
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
