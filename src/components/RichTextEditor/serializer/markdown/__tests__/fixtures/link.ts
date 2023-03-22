/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Targets } from '../../types';
import { createLink, createP, createText } from './helpers';

export const linkMarkdownTargetSelf =
    'This is [link to www.frontify.com](https://www.frontify.com/){:target="_self"} to the page.\n\n';
export const linkTreeTargetSelf = [
    createP([
        createText('This is '),
        createLink('https://www.frontify.com/', 'link to www.frontify.com', Targets.Self),
        createText(' to the page.'),
    ]),
];

export const linkMarkdownTargetBlank =
    'This is [link to www.frontify.com](https://www.frontify.com/){:target="_blank"}.\n\n';
export const linkTreeTargetBlank = [
    createP([
        createText('This is '),
        createLink('https://www.frontify.com/', 'link to www.frontify.com'),
        createText('.'),
    ]),
];

export const linkMarkdown = [linkMarkdownTargetSelf, linkMarkdownTargetBlank];
export const linkTree = [linkTreeTargetSelf, linkTreeTargetBlank];
