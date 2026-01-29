/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createImage, createP, createText } from './helpers';

export const imageMarkdownLink =
    'This is ![Awesome Image](https://github.githubassets.com/images/modules/logos_page/Octocat.png).\n\n';
export const imageTreeLink = [
    createP([
        createText('This is '),
        createImage('Awesome Image', 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'),
        createText('.'),
    ]),
];

export const imageMarkdownUnsafeLink = 'This is ![Unsafe link for image](javascript:alert("XSS-Vulnerability")).\n\n';
export const imageTreeUnsafeLink = [
    createP([createText('This is '), createImage('Unsafe link for image'), createText('.')]),
];

export const imageMarkdownNotStandardLink =
    'This is ![Unsafe link for image](javascript:alert("XSS Vulnerability")).\n\n';
export const imageTreeNotStandardLink = [
    createP([createText('This is ![Unsafe link for image](javascript:alert("XSS Vulnerability")).')]),
];

export const imageMarkdown = [imageMarkdownLink, imageMarkdownUnsafeLink, imageMarkdownNotStandardLink];
export const imageTree = [imageTreeLink, imageTreeUnsafeLink, imageTreeNotStandardLink];
