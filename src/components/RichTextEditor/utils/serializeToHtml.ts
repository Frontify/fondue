import { ELEMENT_LI, ELEMENT_LINK, ELEMENT_OL, ELEMENT_PARAGRAPH, ELEMENT_UL, TDescendant } from '@udecode/plate';
import escapeHtml from 'escape-html';
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
            return `<h1>${children}</h1>`;
        case TextStyles.ELEMENT_HEADING2:
            return `<h2>${children}</h2>`;
        case TextStyles.ELEMENT_HEADING3:
            return `<h3>${children}</h3>`;
        case TextStyles.ELEMENT_HEADING4:
            return `<h4>${children}</h4>`;
        case TextStyles.ELEMENT_CUSTOM1:
            return `<p>${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM2:
            return `<p>${children}</p>`;
        case TextStyles.ELEMENT_CUSTOM3:
            return `<p>${children}</p>`;
        case ELEMENT_PARAGRAPH:
            return `<p>${children}</p>`;
        case ELEMENT_UL:
            return `<ul>${children}</ul>`;
        case ELEMENT_OL:
            return `<ol>${children}</ol>`;
        case ELEMENT_LI:
            return `<li>${children}</li>`;
        case ELEMENT_LINK:
            if (node.url) {
                return `<a href="${escapeHtml(node.url)}">${children}</a>`;
            }
            if (node.chosenLink) {
                return `<a href="${escapeHtml(node.chosenLink.searchResult.link)}">${children}</a>`;
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
        string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
        string = `<i>${string}</i>`;
    }
    if (node.underline) {
        string = `<u>${string}</u>`;
    }
    if (node.strikethrough) {
        string = `<s>${string}</s>`;
    }
    if (node.code) {
        string = `<code>${string}</code>`;
    }
    return string;
};
