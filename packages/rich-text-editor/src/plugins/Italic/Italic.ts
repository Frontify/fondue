/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatItalic } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { italicContent } from './content';

/** Italic text: `Mod-i`, and `*text*` or `_text_` while typing. */
export const italicPlugin = definePlugin({
    content: italicContent,
    toolbar: [{ icon: IconTextFormatItalic, shortcut: 'Mod-i' }],
    // `_text_` is emphasis in markdown, as `*text*` is.
    inputRules: [{ delimiter: '*' }, { delimiter: '_' }],
});
