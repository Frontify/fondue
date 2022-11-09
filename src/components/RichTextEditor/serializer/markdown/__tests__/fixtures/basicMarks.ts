/* (c) Copyright Frontify Ltd., all rights reserved. */

const basicMarksMarkdown_1 = 'aaaaaaaa**bold**_italic_~~delete~~`inline code`\n';
const basicMarksMarkdown_2 = 'This is ~~text that has strikethrough~~ in it';
export const basicMarksMarkdown = [basicMarksMarkdown_1, basicMarksMarkdown_2];

const basicMarksTree_1 = [
    {
        type: 'p',
        children: [
            {
                text: 'aaaaaaaa',
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
export const basicMarksTree = [basicMarksTree_1, basicMarksTree_2];
