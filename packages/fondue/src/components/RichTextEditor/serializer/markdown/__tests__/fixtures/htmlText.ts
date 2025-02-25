/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createP, createText } from './helpers';

export const markdownWithHtml =
    'Presenting the <b>HTML bold tag</b> and escape this value <div>before</div> transformation.\n\n';

export const markdownWithHtmlTree = [
    createP([
        createText('Presenting the <b>HTML bold tag</b> and escape this value <div>before</div> transformation.'),
    ]),
];

export const markdownWithHtmlWithoutEscapingTree = [
    createP([
        createText('Presenting the '),
        createP([createText('<b>')]),
        createText('HTML bold tag'),
        createP([createText('</b>')]),
        createText(' and escape this value '),
        createP([createText('<div>')]),
        createText('before'),
        createP([createText('</div>')]),
        createText(' transformation.'),
    ]),
];
