/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createP, createText } from './helpers';

const paragraphMarkdown0 =
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n\n';

export const paragraphTree0 = [
    createP([
        createText(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        ),
    ]),
];

const paragraphMarkdown1 = 'First paragraph\n\n&nbsp;\n\nSecond paragraph\n\n';
const paragraphTree1 = [
    createP([createText('First paragraph')]),
    createP([createText('')]),
    createP([createText('Second paragraph')]),
];

const paragraphMarkdown2 = 'First paragraph\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\nSecond paragraph\n\n&nbsp;\n\n&nbsp;\n\n';
const paragraphTree2 = [
    createP([createText('First paragraph')]),
    createP([createText('')]),
    createP([createText('')]),
    createP([createText('')]),
    createP([createText('Second paragraph')]),
    createP([createText('')]),
    createP([createText('')]),
];

export const paragraphMarkdown = [paragraphMarkdown0, paragraphMarkdown1, paragraphMarkdown2];
export const paragraphTree = [paragraphTree0, paragraphTree1, paragraphTree2];
