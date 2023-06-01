/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BOLD_CLASSES,
    CODE_CLASSES,
    ITALIC_CLASSES,
    STRIKETHROUGH_CLASSES,
    UNDERLINE_CLASSES,
} from '@components/RichTextEditor/Plugins';
import { TText } from '@udecode/plate';
import escapeHtml from 'escape-html';

export const serializeLeafToHtml = (node: TText): string => {
    let string = escapeHtml(node.text);
    string = string.replaceAll('\n', '<br />');
    const { bold, italic, underline, strikethrough, code, subscript, superscript } = node;
    if (bold) {
        string = `<span class="${BOLD_CLASSES}">${string}</span>`;
    }
    if (italic) {
        string = `<span class="${ITALIC_CLASSES}">${string}</span>`;
    }
    if (underline) {
        string = `<span class="${UNDERLINE_CLASSES}">${string}</span>`;
    }
    if (strikethrough) {
        string = `<span class="${STRIKETHROUGH_CLASSES}">${string}</span>`;
    }
    if (code) {
        string = `<span class="${CODE_CLASSES}">${string}</span>`;
    }
    if (subscript) {
        string = `<sub>${string}</sub>`;
    } else if (superscript) {
        string = `<sup>${string}</sup>`;
    }
    return string;
};
