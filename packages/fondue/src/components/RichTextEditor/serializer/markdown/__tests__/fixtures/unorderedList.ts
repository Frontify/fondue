/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createLi, createLic, createUl } from './helpers';

export const unorderedListMarkdown0 = `
- list

  - list

    - list

  - list
  - list


`;
const unorderedListTree0 = [
    createUl([
        createLi([
            createLic('list'),
            createUl([
                createLi([createLic('list'), createUl([createLi([createLic('list')])])]),
                createLi([createLic('list')]),
                createLi([createLic('list')]),
            ]),
        ]),
    ]),
];

export const unorderedListMarkdown1 = `
- This is list item number one.
- This is list item number two.

`;
const unorderedListTree1 = [
    createUl([
        createLi([createLic('This is list item number one.')]),
        createLi([createLic('This is list item number two.')]),
    ]),
];

export const unorderedListMarkdown2 = `
- This is list item number one.
- This is list item number two.
- This is list item number three.

  - This is child item number one.
  - This is child item number two.


`;
const unorderedListTree2 = [
    createUl([
        createLi([createLic('This is list item number one.')]),
        createLi([createLic('This is list item number two.')]),
        createLi([
            createLic('This is list item number three.'),
            createUl([
                createLi([createLic('This is child item number one.')]),
                createLi([createLic('This is child item number two.')]),
            ]),
        ]),
    ]),
];

export const unorderedListMarkdown3 = `
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
const unorderedListTree3 = [
    createUl([
        createLi([createLic('This is list item number one.')]),
        createLi([createLic('This is list item number two.')]),
        createLi([
            createLic('This is list item number three.'),
            createUl([
                createLi([createLic('This is child item number one.')]),
                createLi([
                    createLic('This is child item number two.'),
                    createUl([
                        createLi([createLic('This is another child item number one.')]),
                        createLi([createLic('This is another child item number two.')]),
                        createLi([createLic('This is another child item number three.')]),
                    ]),
                ]),
                createLi([createLic('This is child item number three.')]),
            ]),
        ]),
    ]),
];

export const unorderedListTree = [unorderedListTree0, unorderedListTree1, unorderedListTree2, unorderedListTree3];
export const unorderedListMarkdown = [
    unorderedListMarkdown0,
    unorderedListMarkdown1,
    unorderedListMarkdown2,
    unorderedListMarkdown3,
];
