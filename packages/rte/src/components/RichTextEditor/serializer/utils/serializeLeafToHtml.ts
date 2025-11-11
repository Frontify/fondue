/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TText } from '@udecode/slate';
import escapeHtml from 'escape-html';

import { BOLD_CLASSES } from '@components/RichTextEditor/Plugins/MarkPlugin/BoldPlugin/BoldMarkupElement';
import { CODE_CLASSES } from '@components/RichTextEditor/Plugins/MarkPlugin/CodePlugin/CodeMarkupElement';
import { ITALIC_CLASSES } from '@components/RichTextEditor/Plugins/MarkPlugin/ItalicPlugin/ItalicMarkupElement';
import { STRIKETHROUGH_CLASSES } from '@components/RichTextEditor/Plugins/MarkPlugin/StrikethroughPlugin/StrikethroughMarkupElement';
import { UNDERLINE_CLASSES } from '@components/RichTextEditor/Plugins/MarkPlugin/UnderlinePlugin/UnderlineMarkupElement';

export const serializeLeafToHtml = (node: TText): string => {
    let string = escapeHtml(node.text);
    if (string === '') {
        string = '&#xFEFF;';
    }
    string = string.replaceAll('\n', '<br />&#xFEFF;');
    const { bold, italic, underline, strikethrough, code, subscript, superscript, color } = node;
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
    if (color) {
        string = `<span style="color: ${color as string}">${string}</span>`;
    }
    if (subscript) {
        string = `<sub>${string}</sub>`;
    } else if (superscript) {
        string = `<sup>${string}</sup>`;
    }
    return string;
};
