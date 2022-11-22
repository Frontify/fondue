/* (c) Copyright Frontify Ltd., all rights reserved. */

export const orderedListMarkdown = `
1. Ordered list
1. Ordered list

   1. aaa
   1. aaa

      1. eeeee
      1. eeeee

   1. aaa

1. Ordered list

`;

const listItemChild = {
    type: 'p',
    children: [
        {
            text: 'Ordered list',
        },
    ],
};

const listItem = {
    type: 'li',
    children: [listItemChild],
};

const secondListItemChild = {
    type: 'p',
    children: [
        {
            text: 'aaa',
        },
    ],
};

const secondListItem = {
    type: 'li',
    children: [secondListItemChild],
};

const thirdListItemChild = {
    type: 'p',
    children: [
        {
            text: 'eeeee',
        },
    ],
};

const thirdListItem = {
    type: 'li',
    children: [thirdListItemChild],
};

export const orderedListTree = [
    {
        type: 'ol',
        children: [
            listItem,
            {
                type: 'li',
                children: [
                    listItemChild,
                    {
                        type: 'ol',
                        children: [
                            secondListItem,
                            {
                                type: 'li',
                                children: [
                                    secondListItemChild,
                                    {
                                        type: 'ol',
                                        children: [thirdListItem, thirdListItem],
                                    },
                                ],
                            },
                            secondListItem,
                        ],
                    },
                ],
            },
            listItem,
        ],
    },
];
