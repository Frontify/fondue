/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, toggleMark } from '#/model';

/** Inline code as `code`, which typing at its end does not extend and inside which no input rule fires. */
export const code = defineFeature({
    id: 'marks.code',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: { code: { attrs: {}, html: ['code', 0], parse: [{ tag: 'code' }], inclusive: false } },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    commands: { 'mark.code.toggle': toggleMark('code') },
    keys: { 'Mod-e': 'mark.code.toggle' },
    inputRules: [{ id: 'code.backtick', kind: 'mark-delimiter', open: '`', close: '`', mark: 'code' }],
    toolbar: [{ kind: 'toggle', command: 'mark.code.toggle', labelKey: 'RichTextEditor_code', icon: 'IconCode' }],
});
