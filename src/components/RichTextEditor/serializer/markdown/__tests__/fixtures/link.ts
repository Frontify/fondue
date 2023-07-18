/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Targets } from '../../types';
import { createLink, createP, createText } from './helpers';

export const linkMarkdownTargetSelf =
    'This is [link to www.frontify.com](https://www.frontify.com/){:target="_self"} to the page.\n\n';
export const linkTreeTargetSelf = [
    createP([
        createText('This is '),
        createLink('link to www.frontify.com', 'https://www.frontify.com/', Targets.Self),
        createText(' to the page.'),
    ]),
];

export const linkMarkdownTargetBlank =
    'This is [link to www.frontify.com](https://www.frontify.com/){:target="_blank"}.\n\n';
export const linkTreeTargetBlank = [
    createP([
        createText('This is '),
        createLink('link to www.frontify.com', 'https://www.frontify.com/'),
        createText('.'),
    ]),
];

const unsafeLinkMarkdown = '[xss ca-30JS](javascript:alert("XSS-Vulnerability"))';
const unsafeLinkTree = [createP([createLink('xss ca-30JS')])];

const unsafeLinkMarkdownWithTarget = '[xss ca-30JS](javascript:alert("XSS-Vulnerability")){:target="_self"}';
const unsafeLinkTreeWithTarget = [createP([createLink('xss ca-30JS', undefined, '_self'), createText('')])];

const unsafeLinkNotMarkdownStandard = '[xss ca-30JS](javascript:alert("XSS Vulnerability"))';
const unsafeLinkTreeNotMarkdownStandard = [
    createP([createText('[xss ca-30JS](javascript:alert("XSS Vulnerability"))')]),
];

export const linkMarkdown = [
    linkMarkdownTargetSelf,
    linkMarkdownTargetBlank,
    unsafeLinkMarkdown,
    unsafeLinkMarkdownWithTarget,
    unsafeLinkNotMarkdownStandard,
];
export const linkTree = [
    linkTreeTargetSelf,
    linkTreeTargetBlank,
    unsafeLinkTree,
    unsafeLinkTreeWithTarget,
    unsafeLinkTreeNotMarkdownStandard,
];
