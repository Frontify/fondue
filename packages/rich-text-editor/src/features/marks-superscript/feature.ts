/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, toggleMark } from '#/model';

/**
 * Superscript as `sup`, which excludes `subscript`. An exclusion may name only an installed mark and two features
 * cannot require each other, so this one requires `marks.subscript` and holds the exclusion for both.
 */
export const superscript = defineFeature({
    id: 'marks.superscript',
    version: 1,
    requires: [
        { id: 'core', version: 1 },
        { id: 'marks.subscript', version: 1 },
    ],
    marks: {
        superscript: {
            attrs: {},
            html: ['sup', 0],
            parse: [{ tag: 'sup' }, { style: 'vertical-align', value: 'super' }],
            excludes: ['subscript'],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    commands: { 'mark.superscript.toggle': toggleMark('superscript') },
    keys: { 'Mod-.': 'mark.superscript.toggle' },
    toolbar: [
        {
            kind: 'toggle',
            command: 'mark.superscript.toggle',
            labelKey: 'RichTextEditor_superscript',
            icon: 'IconSuperscript',
        },
    ],
});
