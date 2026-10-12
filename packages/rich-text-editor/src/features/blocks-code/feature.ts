/* (c) Copyright Frontify Ltd., all rights reserved. */

import { blockRule, defineFeature, indentLines, setAttributes, setBlock } from '#/model';

const languageId = { type: 'id', nullable: true, default: null } as const;

/**
 * Code blocks as `code_block`. The text keeps spaces, tabs and newlines, and `languageId` names a language.
 * A null `languageId` is plain text.
 */
export const codeBlock = defineFeature({
    id: 'blocks.code',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        code_block: {
            group: 'block',
            content: 'text*',
            marks: [],
            whitespace: 'pre',
            attrs: { languageId },
            html: ['pre', { 'data-language': { attr: 'languageId' } }, ['code', 0]],
            parse: [{ tag: 'pre', attrs: { languageId: { from: 'data-language' } } }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    commands: {
        'code-block.toggle': setBlock('code_block', {
            toggle: true,
            payload: { fields: { languageId: { type: 'id', nullable: true, optional: true } } },
        }),
        'code-block.language.set': setAttributes('code_block', {
            fields: { languageId: { type: 'id', nullable: true } },
        }),
        'code-block.indent': indentLines('indent'),
        'code-block.outdent': indentLines('outdent'),
    },
    keys: { 'Mod-]': 'code-block.indent', 'Mod-[': 'code-block.outdent' },
    // An empty language capture sets no `languageId`.
    inputRules: [
        blockRule({
            id: 'code.fence',
            match: /^```(?<languageId>[a-z0-9][a-z0-9._:-]{0,127})? $/,
            command: 'code-block.toggle',
        }),
    ],
    decorations: ['code-syntax'],
    toolbar: [
        { kind: 'toggle', command: 'code-block.toggle', labelKey: 'RichTextEditor_codeBlock', icon: 'IconCodeFrame' },
    ],
});
