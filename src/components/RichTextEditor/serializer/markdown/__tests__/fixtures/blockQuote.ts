/* (c) Copyright Frontify Ltd., all rights reserved. */

export const blockQuoteMarkdown_0 = `> quote
quote
quote
quote

> quote
quote

`;
export const blockQuoteTree_0 = [
    {
        type: 'quote',
        children: [
            {
                type: 'p',
                children: [
                    {
                        text: 'quote\nquote\nquote\nquote',
                    },
                ],
            },
        ],
    },
    {
        type: 'quote',
        children: [
            {
                type: 'p',
                children: [
                    {
                        text: 'quote\nquote',
                    },
                ],
            },
        ],
    },
];

export const blockQuoteMarkdown_1 = `> quote
quote
quote
quote

May paragraph line
> quote
quoted quote

`;
const blockQuoteTree_1 = [
    {
        type: 'quote',
        children: [
            {
                type: 'p',
                children: [
                    {
                        text: 'quote\nquote\nquote\nquote',
                    },
                ],
            },
        ],
    },
    {
        type: 'p',
        children: [
            {
                text: 'May paragraph line',
            },
        ],
    },
    {
        type: 'quote',
        children: [
            {
                type: 'p',
                children: [
                    {
                        text: 'quote\nquoted quote',
                    },
                ],
            },
        ],
    },
];

export const blockQuoteMarkdownNested = `> quote
quote
quote
quote

> quote
>> quoted quote

`;
const blockQuoteTreeNested = [
    {
        type: 'quote',
        children: [
            {
                type: 'p',
                children: [
                    {
                        text: 'quote\nquote\nquote\nquote',
                    },
                ],
            },
        ],
    },
    {
        type: 'quote',
        children: [
            {
                type: 'p',
                children: [
                    {
                        text: 'quote',
                    },
                ],
            },
            {
                type: 'quote',
                children: [
                    {
                        type: 'p',
                        children: [
                            {
                                text: 'quoted quote',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const blockQuoteMarkdown = [blockQuoteMarkdown_0, blockQuoteMarkdown_1, blockQuoteMarkdownNested];
export const blockQuoteTree = [blockQuoteTree_0, blockQuoteTree_1, blockQuoteTreeNested];
