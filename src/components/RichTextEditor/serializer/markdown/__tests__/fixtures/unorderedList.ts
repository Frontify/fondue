/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createLI, createLIC, createUL } from './helpers';

export const unorderedListMarkdown_0 = `
- list

  - list

    - list

  - list
  - list


`;
const unorderedListTree_0 = [
    createUL([
        createLI([
            createLIC('list'),
            createUL([
                createLI([createLIC('list'), createUL([createLI([createLIC('list')])])]),
                createLI([createLIC('list')]),
                createLI([createLIC('list')]),
            ]),
        ]),
    ]),
];

export const unorderedListMarkdown_1 = `
- This is list item number one.
- This is list item number two.

`;
const unorderedListTree_1 = [
    createUL([
        createLI([createLIC('This is list item number one.')]),
        createLI([createLIC('This is list item number two.')]),
    ]),
];

export const unorderedListMarkdown_2 = `
- This is list item number one.
- This is list item number two.
- This is list item number three.

  - This is child item number one.
  - This is child item number two.


`;
const unorderedListTree_2 = [
    createUL([
        createLI([createLIC('This is list item number one.')]),
        createLI([createLIC('This is list item number two.')]),
        createLI([
            createLIC('This is list item number three.'),
            createUL([
                createLI([createLIC('This is child item number one.')]),
                createLI([createLIC('This is child item number two.')]),
            ]),
        ]),
    ]),
];

export const unorderedListMarkdown_3 = `
- This is list item number one.
- This is list item number two.
- This is list item number three.

  - This is child item number one.
  - This is child item number two.

    - This is another child item number one.
    - This is another child item number two.
    - This is another child item number three.

  - This is child item number three.


`;
const unorderedListTree_3 = [
    createUL([
        createLI([createLIC('This is list item number one.')]),
        createLI([createLIC('This is list item number two.')]),
        createLI([
            createLIC('This is list item number three.'),
            createUL([
                createLI([createLIC('This is child item number one.')]),
                createLI([
                    createLIC('This is child item number two.'),
                    createUL([
                        createLI([createLIC('This is another child item number one.')]),
                        createLI([createLIC('This is another child item number two.')]),
                        createLI([createLIC('This is another child item number three.')]),
                    ]),
                ]),
                createLI([createLIC('This is child item number three.')]),
            ]),
        ]),
    ]),
];

export const unorderedListTree = [unorderedListTree_0, unorderedListTree_1, unorderedListTree_2, unorderedListTree_3];
export const unorderedListMarkdown = [
    unorderedListMarkdown_0,
    unorderedListMarkdown_1,
    unorderedListMarkdown_2,
    unorderedListMarkdown_3,
];
