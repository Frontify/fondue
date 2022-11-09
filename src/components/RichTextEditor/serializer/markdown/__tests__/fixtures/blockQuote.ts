/* (c) Copyright Frontify Ltd., all rights reserved. */

export const blockQuoteMarkdown = `> quote
> quote
> quote
> quote

> quote
>
>> quoted quote
`;

export const blockQuoteTree = [
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
