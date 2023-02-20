/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_BUTTON,
    ELEMENT_CHECK_ITEM,
    MappedMentionableItems,
    RichTextButtonStyle,
    UL_CLASSES,
    getOrderedListClasses,
} from '@components/RichTextEditor/Plugins';
import { getButtonStyle } from '@components/RichTextEditor/Plugins/ButtonPlugin/ButtonMarkupElement/ButtonMarkupElementNode';
import { TLinkElement } from '@components/RichTextEditor/Plugins/LinkPlugin/types';
import { getTextStyle } from '@components/RichTextEditor/Plugins/ListPlugin/ListItemContentMarkupElement';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/TextStyles';
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
import { merge } from '@utilities/merge';
import escapeHtml from 'escape-html';
import { mentionHtmlNode } from './mentionHtmlNode';
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
    const defaultClassNames = merge([columnBreakClasses, "empty:after:tw-content-['\\00a0']"]);

    switch (node.type) {
        case TextStyles.ELEMENT_HEADING1:
            return `<h1 class="${defaultClassNames}" style="${reactCssPropsToCss(
                designTokens.heading1,
            )}">${children}</h1>`;
        case TextStyles.ELEMENT_HEADING2:
            return `<h2 class="${defaultClassNames}" style="${reactCssPropsToCss(
                designTokens.heading2,
            )}">${children}</h2>`;
        case TextStyles.ELEMENT_HEADING3:
            return `<h3 class="${defaultClassNames}" style="${reactCssPropsToCss(
                designTokens.heading3,
            )}">${children}</h3>`;
        case TextStyles.ELEMENT_HEADING4:
            return `<h4 class="${defaultClassNames}" style="${reactCssPropsToCss(
                designTokens.heading4,
            )}">${children}</h4>`;
        case TextStyles.ELEMENT_CUSTOM1:
            return `<p class="${defaultClassNames}" style="${reactCssPropsToCss(
                designTokens.custom1,
            )}">${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM2:
            return `<p class="${defaultClassNames}" style="${reactCssPropsToCss(
                designTokens.custom2,
            )}">${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM3:
            return `<p class="${defaultClassNames}" style="${reactCssPropsToCss(
                designTokens.custom3,
            )}">${children}</p>`;
        case TextStyles.ELEMENT_QUOTE:
            return `<p class="${defaultClassNames}" style="${reactCssPropsToCss(designTokens.quote)}">${children}</p>`;
        case ELEMENT_PARAGRAPH:
            return `<p class="${defaultClassNames}" style="${reactCssPropsToCss(designTokens.p)}">${children}</p>`;
        case ELEMENT_UL:
            return `<ul class="${UL_CLASSES} ${defaultClassNames}">${children}</ul>`;
        case ELEMENT_OL:
            const nestingLevel = Math.max(rootNestingCount - countNodesOfType([node], ELEMENT_OL), 0);
            return `<ol class="${getOrderedListClasses(nestingLevel)} ${defaultClassNames}">${children}</ol>`;
        case ELEMENT_LI:
            const liElement = node as TElement;
            const styledLicElement = (liElement.children[0]?.children as TDescendant[])?.[0];
            const liStyles = { ...designTokens[getTextStyle(styledLicElement)], textDecoration: 'none' };

            return `<li class="${defaultClassNames}" style="${reactCssPropsToCss(liStyles)}">${children}</li>`;
        case ELEMENT_LIC:
            const licElement = node as TElement;
            const licStyles = { textDecoration: designTokens[getTextStyle(licElement.children[0])]?.textDecoration };
            return `<p class="${defaultClassNames}" style="${reactCssPropsToCss(licStyles)}">${children}</p>`;
        case ELEMENT_LINK:
            if (node.chosenLink) {
                const { chosenLink } = node as TLinkElement;
                return `<a class="${defaultClassNames}" style="${reactCssPropsToCss(designTokens.link)}" target=${
                    chosenLink?.openInNewTab ? '_blank' : '_self'
                } href="${escapeHtml(chosenLink?.searchResult?.link)}">${children}</a>`;
            }
            return `<a class="${defaultClassNames}" style="${reactCssPropsToCss(designTokens.link)}" href="${escapeHtml(
                node.url as string,
            )}">${children}</a>`;
        case ELEMENT_BUTTON:
            const buttonStyle = getButtonStyle(designTokens, (node.buttonStyle as RichTextButtonStyle) ?? 'primary');
            const defaultStyles = reactCssPropsToCss(buttonStyle);
            return `<a
                href="${node.url}"
                target=${node.target ?? '_blank'}
                style="${defaultStyles}"
                onmouseenter="this.setAttribute('style', '${defaultStyles} ${reactCssPropsToCss(buttonStyle.hover)}');"
                onmouseleave="this.setAttribute('style', '${reactCssPropsToCss(buttonStyle)}');"
                >${children}</a>`;
        case ELEMENT_CHECK_ITEM:
            return `<div disabled class="tw-flex tw-flex-row tw-pb-2 first-of-type:tw-ml-0" style="margin-left:${
                ((node.indent as number) ?? 0) * 24
            }px">
                <div class="tw-flex tw-items-center tw-justify-center tw-select-none tw-mr-1.5">
                    <input class="${defaultClassNames} tw-w-4 tw-h-4 tw-m-0" type="checkbox" ${
                node.checked ? 'checked' : ''
            }/>
                </div>
                <span class="${merge([
                    'tw-flex-1 tw-focus:outline-none',
                    (node.checked as boolean) && 'tw-line-through',
                ])}">${children}</span>
            </div>`;
        case ELEMENT_MENTION:
            return mentionHtmlNode(node, { mentionable: mappedMentionable });

        default:
            return children;
    }
};
