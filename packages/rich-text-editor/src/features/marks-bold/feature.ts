/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, toggleMark } from '#/model';

/** Strong importance as `strong`, toggled on the selection or at the caret. */
export const bold = defineFeature({
    id: 'marks.bold',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        bold: {
            attrs: {},
            html: ['strong', 0],
            parse: [{ tag: 'strong' }, { tag: 'b' }, { style: 'font-weight', value: 'bold' }],
            markdown: { open: '**', close: '**' },
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    commands: { 'mark.bold.toggle': toggleMark('bold') },
    keys: { 'Mod-b': 'mark.bold.toggle' },
    inputRules: [
        { id: 'bold.stars', kind: 'mark-delimiter', open: '**', close: '**', mark: 'bold' },
        { id: 'bold.underscores', kind: 'mark-delimiter', open: '__', close: '__', mark: 'bold' },
    ],
    toolbar: [
        { kind: 'toggle', command: 'mark.bold.toggle', labelKey: 'RichTextEditor_bold', icon: 'IconTextFormatBold' },
    ],
});
