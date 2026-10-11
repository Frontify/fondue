/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, toggleMark } from '#/model';

/** Struck-through text as `s`, toggled on the selection or at the caret. */
export const strike = defineFeature({
    id: 'marks.strike',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        strike: {
            attrs: {},
            html: ['s', 0],
            parse: [
                { tag: 's' },
                { tag: 'del' },
                { tag: 'strike' },
                { style: 'text-decoration', value: 'line-through' },
            ],
            markdown: { open: '~~', close: '~~' },
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    commands: { 'mark.strike.toggle': toggleMark('strike') },
    keys: { 'Mod-Shift-x': 'mark.strike.toggle' },
    inputRules: [{ id: 'strike.tildes', kind: 'mark-delimiter', open: '~~', close: '~~', mark: 'strike' }],
    toolbar: [
        {
            kind: 'toggle',
            command: 'mark.strike.toggle',
            labelKey: 'RichTextEditor_strike',
            icon: 'IconTextFormatStrikethrough',
        },
    ],
});
