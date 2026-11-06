/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { strikethroughContent } from './content';

/** Struck-through text: `Mod-Shift-x`, and `~~text~~` while typing. */
export const strikethroughPlugin = definePlugin({
    content: strikethroughContent,
    toolbar: [{ icon: IconTextFormatStrikethrough, shortcut: 'Mod-Shift-x' }],
    inputRules: [{ delimiter: '~~' }],
});
