/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, setBlock } from '#/model';

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

/** Headings `h1` to `h6`, whose level only the `level` attribute sets (SPEC-rich-text-format/AC-028). */
export const heading = defineFeature({
    id: 'blocks.heading',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        heading: {
            group: 'block',
            content: 'inline*',
            attrs: {
                nodeId: { type: 'string', required: true },
                level: { type: 'integer', min: 1, max: 6, required: true },
                lang: { type: 'language', nullable: true, default: null },
            },
            html: [
                { attr: 'level', tags: { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } },
                { lang: { attr: 'lang' } },
                0,
            ],
            parse: LEVELS.map((level) => ({
                tag: `h${level}`,
                attrs: { level: { value: level }, lang: { from: 'lang' } },
            })),
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    commands: {
        'heading.set': setBlock('heading', { payload: { fields: { level: { type: 'integer', min: 1, max: 6 } } } }),
    },
    keys: Object.fromEntries(
        LEVELS.flatMap((level) => [
            [`mac:Mod-Alt-${level}`, { command: 'heading.set', payload: { level } }],
            [`other:Ctrl-Shift-${level}`, { command: 'heading.set', payload: { level } }],
        ]),
    ),
    inputRules: [
        {
            id: 'heading.hashes',
            kind: 'line-start',
            command: 'heading.set',
            markers: LEVELS.map((level) => ({ marker: '#'.repeat(level), payload: { level } })),
        },
    ],
    toolbar: LEVELS.map((level) => ({
        kind: 'toggle' as const,
        command: 'heading.set',
        payload: { level },
        labelKey: `RichTextEditor_heading${level}`,
        icon: 'IconHeading',
    })),
});
