/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createLI, createLIC, createOL } from './helpers';

const orderedListMarkdown_0 = `
1. Ordered list item number one.
1. Ordered list item number two.

   1. Ordered list child item number one.
   1. Ordered list child item number two.

      1. Another ordered list child item number one.
      1. Another ordered list child item number two.

   1. Ordered list child item number three.

1. Ordered list item number three.

`;

const orderedListTree_0 = [
    createOL([
        createLI([createLIC('Ordered list item number one.')]),
        createLI([
            createLIC('Ordered list item number two.'),
            createOL([
                createLI([createLIC('Ordered list child item number one.')]),
                createLI([
                    createLIC('Ordered list child item number two.'),
                    createOL([
                        createLI([createLIC('Another ordered list child item number one.')]),
                        createLI([createLIC('Another ordered list child item number two.')]),
                    ]),
                ]),
                createLI([createLIC('Ordered list child item number three.')]),
            ]),
        ]),
        createLI([createLIC('Ordered list item number three.')]),
    ]),
];

const orderedListMarkdown_1 = `
1. This is list item number one.
1. This is list item number two.

`;

const orderedListTree_1 = [
    createOL([
        createLI([createLIC('This is list item number one.')]),
        createLI([createLIC('This is list item number two.')]),
    ]),
];

const orderedListMarkdown_2 = `
1. This is list item number one.
1. This is list item number two.
1. This is list item number three.

   1. This is child item number one.
   1. This is child item number two.


`;

const orderedListTree_2 = [
    createOL([
        createLI([createLIC('This is list item number one.')]),
        createLI([createLIC('This is list item number two.')]),
        createLI([
            createLIC('This is list item number three.'),
            createOL([
                createLI([createLIC('This is child item number one.')]),
                createLI([createLIC('This is child item number two.')]),
            ]),
        ]),
    ]),
];

export const orderedListMarkdown = [orderedListMarkdown_0, orderedListMarkdown_1, orderedListMarkdown_2];
export const orderedListTree = [orderedListTree_0, orderedListTree_1, orderedListTree_2];
