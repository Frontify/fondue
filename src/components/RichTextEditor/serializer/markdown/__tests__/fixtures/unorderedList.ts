/* (c) Copyright Frontify Ltd., all rights reserved. */

export const unorderedListMD = `
- list

  - list

    - list

  - list
  - list


`;

export const unorderedListTree = [
    {
        type: 'ul',
        children: [
            {
                type: 'li',
                children: [
                    {
                        type: 'p',
                        children: [
                            {
                                text: 'list',
                            },
                        ],
                    },
                    {
                        type: 'ul',
                        children: [
                            {
                                type: 'li',
                                children: [
                                    {
                                        type: 'p',
                                        children: [
                                            {
                                                text: 'list',
                                            },
                                        ],
                                    },
                                    {
                                        type: 'ul',
                                        children: [
                                            {
                                                type: 'li',
                                                children: [
                                                    {
                                                        type: 'p',
                                                        children: [
                                                            {
                                                                text: 'list',
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
                                                text: 'list',
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
                                                text: 'list',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
