/* (c) Copyright Frontify Ltd., all rights reserved. */

export const mentionsMarkdown = 'Try mentioning characters, like: @[all: 0]\n';

export const mentionsTree = [
    {
        type: 'p',
        children: [
            {
                text: 'Try mentioning characters, like: ',
            },
            {
                type: 'mention',
                children: [
                    {
                        text: '',
                    },
                ],
                value: 'Aayla Secura',
                key: '0',
                category: 'all',
            },
        ],
    },
];
