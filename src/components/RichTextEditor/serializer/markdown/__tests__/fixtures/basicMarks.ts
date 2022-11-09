/* (c) Copyright Frontify Ltd., all rights reserved. */

const basicMarksMarkdown_1 = 'i am inline text**bold**_italic_~~delete~~`inline code`\n';
const basicMarksTree_1 = [
    {
        type: 'p',
        children: [
            {
                text: 'i am inline text',
            },
            {
                bold: true,
                text: 'bold',
            },
            {
                italic: true,
                text: 'italic',
            },
            {
                strikethrough: true,
                text: 'delete',
            },
            {
                code: true,
                text: 'inline code',
            },
        ],
    },
];

const basicMarksMarkdown_2 = 'This is ~~text that has strikethrough~~ in it';
const basicMarksTree_2 = [
    {
        type: 'p',
        children: [
            {
                text: 'This is ',
            },
            {
                strikethrough: true,
                text: 'text that has strikethrough',
            },
            {
                text: ' in it',
            },
        ],
    },
];

export const basicMarksMarkdown = [basicMarksMarkdown_1, basicMarksMarkdown_2];
export const basicMarksTree = [basicMarksTree_1, basicMarksTree_2];
