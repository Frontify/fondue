/* (c) Copyright Frontify Ltd., all rights reserved. */

export const basicMarksMD = `
aaaaaaaa**bold**_italic_~~delete~~\`inline code\`
`;

export const basicMarksTree = [
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
