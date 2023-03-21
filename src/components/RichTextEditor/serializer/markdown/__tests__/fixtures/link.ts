/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createLink, createP, createText } from './helpers';

export const linkMarkdown = 'This is [link to www.frontify.com](https://www.frontify.com/).\n\n';
export const linkTree = [
    createP([
        createText('This is '),
        createLink('https://www.frontify.com/', 'link to www.frontify.com'),
        createText('.'),
    ]),
];
