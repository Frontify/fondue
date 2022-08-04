import { ELEMENT_LI, ELEMENT_LINK, ELEMENT_OL, ELEMENT_PARAGRAPH, ELEMENT_UL, TDescendant } from '@udecode/plate';
import escapeHtml from 'escape-html';
import {
    BOLD_CLASSES,
    CODE_CLASSES,
    ITALIC_CLASSES,
    LINK_CLASSES,
    OL_CLASSES,
    STRIKETHROUGH_CLASSES,
    UL_CLASSES,
    UNDERLINE_CLASSES,
} from '../components';
import { ELEMENT_CHECK_ITEM } from '../plugins/checkboxListPlugin/createCheckboxListPlugin';
import { parseRawValue } from './parseRawValue';
import { TextStyles } from './textStyles';

export const serializeRawToHtml = (raw?: string): string => {
    if (!raw) {
        return '';
    }

    const nodes = parseRawValue(raw);

    return serializeNodesToHtml(nodes);
};

export const serializeNodesToHtml = (nodes: TDescendant[]): string => {
    return nodes.map((node) => serializeNodeToHtmlRecursive(node)).join('');
};

const serializeNodeToHtmlRecursive = (node: TDescendant): string => {
    if (!node.children) {
        return serializeLeafToHtml(node);
    }

    const children = node.children.map((n: TDescendant) => serializeNodeToHtmlRecursive(n)).join('');

    switch (node.type) {
        case TextStyles.ELEMENT_HEADING1:
            return `<h1 class="tw-text-5xl tw-font-bold">${children}</h1>`;
        case TextStyles.ELEMENT_HEADING2:
            return `<h2 class="tw-text-4xl">${children}</h2>`;
        case TextStyles.ELEMENT_HEADING3:
            return `<h3 class="tw-text-3xl">${children}</h3>`;
        case TextStyles.ELEMENT_HEADING4:
            return `<h4 class="tw-text-2xl">${children}</h4>`;
        case TextStyles.ELEMENT_CUSTOM1:
            return `<p>${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM2:
            return `<p>${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM3:
            return `<p>${children}</p>`;
        case ELEMENT_PARAGRAPH:
            return `<p>${children}</p>`;
        case ELEMENT_UL:
            return `<ul class="${UL_CLASSES}">${children}</ul>`;
        case ELEMENT_OL:
            return `<ol class="${OL_CLASSES}">${children}</ol>`;
        case ELEMENT_LI:
            return `<li>${children}</li>`;
        case ELEMENT_LINK:
            if (node.url) {
                return `<a class="${LINK_CLASSES}" href="${escapeHtml(node.url)}">${children}</a>`;
            }
            if (node.chosenLink) {
                return `<a class="${LINK_CLASSES}" target=${
                    node.chosenLink.openInNewTab ? '_blank' : '_self'
                } href="${escapeHtml(node.chosenLink.searchResult.link)}">${children}</a>`;
            }
        case ELEMENT_CHECK_ITEM:
            return `<input type="checkbox"/><label>${children}</label>`;

        default:
            return children;
    }
};

const serializeLeafToHtml = (node: TDescendant): string => {
    let string = escapeHtml(node.text);
    if (node.bold) {
        string = `<span class="${BOLD_CLASSES}">${string}</span>`;
    }
    if (node.italic) {
        string = `<span class="${ITALIC_CLASSES}">${string}</span>`;
    }
    if (node.underline) {
        string = `<span class="${UNDERLINE_CLASSES}">${string}</span>`;
    }
    if (node.strikethrough) {
        string = `<span class="${STRIKETHROUGH_CLASSES}">${string}</span>`;
    }
    if (node.code) {
        string = `<span class="${CODE_CLASSES}">${string}</span>`;
    }
    return string;
};
