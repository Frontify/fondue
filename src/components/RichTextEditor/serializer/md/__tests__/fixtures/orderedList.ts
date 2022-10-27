/* (c) Copyright Frontify Ltd., all rights reserved. */

export const orderedListMD = `
1. First line of the list
1. Second text of ordered list
   1. aaa
   1. aaa
      1. eeeee
      1. eeeee
   1. aaa
1. Final phrase
`;

export const orderedListTree = [
    {
        type: 'ol',
        children: [
            {
                type: 'li',
                children: [
                    {
                        type: 'p',
                        children: [
                            {
                                text: 'ordered list',
                            },
                        ],
                    },
                ],
            },
            {
                type: 'li',
                children: [
                    {
                        type: 'p',
                        children: [
                            {
                                text: 'ordered list',
                            },
                        ],
                    },
                ],
            },
            {
                type: 'li',
                children: [
                    {
                        type: 'p',
                        children: [
                            {
                                text: 'ordered list',
                            },
                        ],
                    },
                    {
                        type: 'ol',
                        children: [
                            {
                                type: 'li',
                                children: [
                                    {
                                        type: 'p',
                                        children: [
                                            {
                                                text: 'aaa',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: 'li',
                                children: [
                                    {
                                        type: 'p',
                                        children: [
                                            {
                                                text: 'aaa',
                                            },
                                        ],
                                    },
                                    {
                                        type: 'ol',
                                        children: [
                                            {
                                                type: 'li',
                                                children: [
                                                    {
                                                        type: 'p',
                                                        children: [
                                                            {
                                                                text: 'eeeee',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: 'li',
                                                children: [
                                                    {
                                                        type: 'p',
                                                        children: [
                                                            {
                                                                text: 'eeeee',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: 'li',
                                children: [
                                    {
                                        type: 'p',
                                        children: [
                                            {
                                                text: 'aaa',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'li',
                children: [
                    {
                        type: 'p',
                        children: [
                            {
                                text: 'ordered list',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
