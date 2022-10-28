/* (c) Copyright Frontify Ltd., all rights reserved. */

export const blockQuoteMD = `> quote
> quote
> quote
> quote

> quote
>
>> quoted quote
`;

export const blockQuoteTree = [
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
