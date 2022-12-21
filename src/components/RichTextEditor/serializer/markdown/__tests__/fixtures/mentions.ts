/* (c) Copyright Frontify Ltd., all rights reserved. */

export const mentionsMarkdown_0 = 'Try mentioning characters, like: @[all: 0]\n';
export const mentionsMarkdown_1 = 'Multiple mentions: @[all: 0], @[group: 10] and @[user: 20]\n';
export const mentionsMarkdown = [mentionsMarkdown_0, mentionsMarkdown_1];

export const mentionsTree_0 = [
    {
        type: 'p',
        children: [
            {
                text: 'Try mentioning characters, like: ',
            },
            {
                type: 'mention',
                // value: 'Aayla Secura',
                key: '0',
                category: 'all',
                children: [
                    {
                        text: '',
                    },
                ],
            },
        ],
    },
];
export const mentionsTree_1 = [
    {
        type: 'p',
        children: [
            {
                text: 'Multiple mentions: ',
            },
            {
                type: 'mention',
                key: '0',
                category: 'all',
                children: [
                    {
                        text: '',
                    },
                ],
            },
            { text: ', ' },
            {
                type: 'mention',
                key: '10',
                category: 'group',
                children: [
                    {
                        text: '',
                    },
                ],
            },
            { text: ' and ' },
            {
                type: 'mention',
                key: '20',
                category: 'user',
                children: [
                    {
                        text: '',
                    },
                ],
            },
        ],
    },
];
export const mentionsTree = [mentionsTree_0, mentionsTree_1];
