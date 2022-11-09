/* (c) Copyright Frontify Ltd., all rights reserved. */

export const blockQuoteMD_0 = `> quote
quote
quote
quote

> quote
quote

`;
export const blockQuoteTree_0 = [
    {
        type: 'blockquote',
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
        type: 'blockquote',
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

export const blockQuoteMD_1 = `> quote
quote
quote
quote

May paragraph line
> quote
quoted quote

`;
const blockQuoteTree_1 = [
    {
        type: 'blockquote',
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
        type: 'blockquote',
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

export const blockQuoteMDNested = `> quote
quote
quote
quote

> quote
>> quoted quote

`;
const blockQuoteTreeNested = [
    {
        type: 'blockquote',
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
        type: 'blockquote',
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
                type: 'blockquote',
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

export const blockQuoteMD = [blockQuoteMD_0, blockQuoteMD_1, blockQuoteMDNested];
export const blockQuoteTree = [blockQuoteTree_0, blockQuoteTree_1, blockQuoteTreeNested];
