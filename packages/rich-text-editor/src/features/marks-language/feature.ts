/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, openControl, setMark } from '#/model';

const DIRECTIONS = ['ltr', 'rtl', 'auto'] as const;

/**
 * A passage's language and direction. `mark.language.set` takes `{ lang, dir }` or `null`, and at a caret inside a
 * passage changes or removes the whole passage; text typed at a passage's end stays outside it.
 */
export const language = defineFeature({
    id: 'marks.language',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: {
        languages: { type: 'list', items: { type: 'language' }, default: [] },
    },
    marks: {
        language: {
            attrs: {
                lang: { type: 'language', required: true },
                dir: { type: 'enum', values: DIRECTIONS, nullable: true, default: null },
            },
            html: ['span', { lang: { attr: 'lang' }, dir: { attr: 'dir' } }, 0],
            parse: [{ tag: 'span[lang]', attrs: { lang: { from: 'lang' }, dir: { from: 'dir' } } }],
            inclusive: false,
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    commands: {
        'mark.language.edit': openControl('language'),
        'mark.language.set': setMark(
            'language',
            {
                nullable: true,
                fields: {
                    lang: { type: 'language' },
                    dir: { type: 'enum', values: DIRECTIONS, nullable: true },
                },
            },
            { extendToMarkRange: true },
        ),
    },
    toolbar: [
        {
            kind: 'button',
            command: 'mark.language.edit',
            labelKey: 'RichTextEditor_language',
            icon: 'IconLanguage',
        },
    ],
});
