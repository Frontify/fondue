/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, openControl } from '#/model';

/** Emoji as Unicode text, inserted through core's `text.insert` from a `:` suggestion list or the emoji picker. */
export const emoji = defineFeature({
    id: 'emoji',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
    commands: {
        'emoji.picker.open': openControl('emoji'),
    },
    suggestions: [{ trigger: ':', source: 'emoji', command: 'text.insert' }],
    toolbar: [
        { kind: 'button', command: 'emoji.picker.open', labelKey: 'RichTextEditor_emoji', icon: 'IconFaceHappy' },
    ],
});
