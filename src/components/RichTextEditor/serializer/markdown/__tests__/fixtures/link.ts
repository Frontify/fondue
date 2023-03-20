/* (c) Copyright Frontify Ltd., all rights reserved. */

export const linkMarkdown = 'This is [link to frontify.com](https://www.frontify.com/).\n\n';

export const linkTree = [
    {
        type: 'p',
        children: [
            {
                text: 'This is ',
            },
            {
                type: 'a',
                url: 'https://www.frontify.com/',
                children: [
                    {
                        text: 'link to frontify.com',
                    },
                ],
            },
            {
                text: '.',
            },
        ],
    },
];
