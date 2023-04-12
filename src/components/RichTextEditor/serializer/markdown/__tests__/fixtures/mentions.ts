/* (c) Copyright Frontify Ltd., all rights reserved. */

export const mentionsMarkdown0 = 'Try mentioning characters, like: @[all:false]\n\n';
export const mentionsMarkdown1 = 'Multiple mentions: @[all:true], @[group:10] and @[user:20]\n\n';
export const mentionsMarkdown2 = 'A single mention at the end of a sentence @[group:10]\n\n';
export const mentionsMarkdown3 = 'Mention @[user:20] in the middle of a sentence.\n\n';
export const mentionsMarkdown = [mentionsMarkdown0, mentionsMarkdown1, mentionsMarkdown2, mentionsMarkdown3];

export const mentionsTree0 = [
    {
        type: 'p',
        children: [
            { text: 'Try mentioning characters, like: ' },
            {
                type: 'mention',
                id: 'false',
                category: 'all',
                children: [{ text: '' }],
            },
            { text: '' },
        ],
    },
];
export const mentionsTree1 = [
    {
        type: 'p',
        children: [
            { text: 'Multiple mentions: ' },
            {
                type: 'mention',
                id: 'true',
                category: 'all',
                children: [{ text: '' }],
            },
            { text: ', ' },
            {
                type: 'mention',
                id: '10',
                category: 'group',
                children: [{ text: '' }],
            },
            { text: ' and ' },
            {
                type: 'mention',
                id: '20',
                category: 'user',
                children: [{ text: '' }],
            },
            { text: '' },
        ],
    },
];
export const mentionsTree2 = [
    {
        type: 'p',
        children: [
            { text: 'A single mention at the end of a sentence ' },
            {
                type: 'mention',
                children: [{ text: '' }],
                id: '10',
                category: 'group',
            },
            { text: '' },
        ],
    },
];
export const mentionsTree3 = [
    {
        type: 'p',
        children: [
            { text: 'Mention ' },
            {
                type: 'mention',
                id: '20',
                category: 'user',
                children: [{ text: '' }],
            },
            { text: ' in the middle of a sentence.' },
        ],
    },
];
export const mentionsTree = [mentionsTree0, mentionsTree1, mentionsTree2, mentionsTree3];
