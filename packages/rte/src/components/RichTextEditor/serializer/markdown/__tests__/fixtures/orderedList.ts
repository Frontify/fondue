/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createLi, createLic, createOl } from './helpers';

const orderedListMarkdown0 = `
1. Ordered list item number one.
1. Ordered list item number two.

   1. Ordered list child item number one.
   1. Ordered list child item number two.

      1. Another ordered list child item number one.
      1. Another ordered list child item number two.

   1. Ordered list child item number three.

1. Ordered list item number three.

`;

const orderedListTree0 = [
    createOl([
        createLi([createLic('Ordered list item number one.')]),
        createLi([
            createLic('Ordered list item number two.'),
            createOl([
                createLi([createLic('Ordered list child item number one.')]),
                createLi([
                    createLic('Ordered list child item number two.'),
                    createOl([
                        createLi([createLic('Another ordered list child item number one.')]),
                        createLi([createLic('Another ordered list child item number two.')]),
                    ]),
                ]),
                createLi([createLic('Ordered list child item number three.')]),
            ]),
        ]),
        createLi([createLic('Ordered list item number three.')]),
    ]),
];

const orderedListMarkdown1 = `
1. This is list item number one.
1. This is list item number two.

`;

const orderedListTree1 = [
    createOl([
        createLi([createLic('This is list item number one.')]),
        createLi([createLic('This is list item number two.')]),
    ]),
];

const orderedListMarkdown2 = `
1. This is list item number one.
1. This is list item number two.
1. This is list item number three.

   1. This is child item number one.
   1. This is child item number two.


`;

const orderedListTree2 = [
    createOl([
        createLi([createLic('This is list item number one.')]),
        createLi([createLic('This is list item number two.')]),
        createLi([
            createLic('This is list item number three.'),
            createOl([
                createLi([createLic('This is child item number one.')]),
                createLi([createLic('This is child item number two.')]),
            ]),
        ]),
    ]),
];

export const orderedListMarkdown = [orderedListMarkdown0, orderedListMarkdown1, orderedListMarkdown2];
export const orderedListTree = [orderedListTree0, orderedListTree1, orderedListTree2];
