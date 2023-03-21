/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    createBoldText,
    createCodeText,
    createItalicText,
    createP,
    createStrikethroughText,
    createText,
} from './helpers';

const basicMarksMarkdownInLine = 'i am inline text**i am bold**_is it italic_~~could strike~~`inline code`\n\n';
const basicMarksTreeInLine = [
    createP([
        createText('i am inline text'),
        createBoldText('i am bold'),
        createItalicText('is it italic'),
        createStrikethroughText('could strike'),
        createCodeText('inline code'),
    ]),
];

const basicMarksMarkdownMultipleLines = `i am inline text

**i am bold**

_is it italic_

~~could strike~~

\`inline code\`

`;
const basicMarksTreeMultipleLines = [
    createP([createText('i am inline text')]),
    createP([createBoldText('i am bold')]),
    createP([createItalicText('is it italic')]),
    createP([createStrikethroughText('could strike')]),
    createP([createCodeText('inline code')]),
];

const basicMarksMarkdownSoftBreak =
    '**This is bold text**\\\n_This is italic text_\\\n~~Strikethrough text~~\\\nUnstyled text\n\n';
const basicMarksTreeSoftBreak = [
    createP([
        createBoldText('This is bold text\n'),
        createItalicText('This is italic text\n'),
        createStrikethroughText('Strikethrough text\n'),
        createText('Unstyled text'),
    ]),
];

export const basicMarksMarkdown = [
    basicMarksMarkdownInLine,
    basicMarksMarkdownMultipleLines,
    basicMarksMarkdownSoftBreak,
];
export const basicMarksTree = [basicMarksTreeInLine, basicMarksTreeMultipleLines, basicMarksTreeSoftBreak];
