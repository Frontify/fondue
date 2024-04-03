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

const linkMarkdownMailto = '[Email link](mailto:max@muster.com){:target="_blank"}\n\n';
const linkTreeMailto = [createP([createLink('Email link', 'mailto:max@muster.com'), createText('')])];

export const linkMarkdown = [linkMarkdownTargetSelf, linkMarkdownTargetBlank, linkMarkdownMailto];
export const linkTree = [linkTreeTargetSelf, linkTreeTargetBlank, linkTreeMailto];

export const unsafeLinkMarkdown = [
    '[xss ca-30JS](javascript:alert("XSS-Vulnerability"))',
    '[xss ca-30JS](javascript:alert("XSS-Vulnerability")){:target="_self"}',
    '[xss ca-30JS](javascript:alert("XSS Vulnerability"))',
    '[click me](JaVaScRiPt:alert(2024))',
];
export const unsafeLinkTree = [
    [createP([createLink('xss ca-30JS')])],
    [createP([createLink('xss ca-30JS', undefined, '_self'), createText('')])],
    [createP([createText('[xss ca-30JS](javascript:alert("XSS Vulnerability"))')])],
    [createP([createLink('click me')])],
];
