/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { boldContent } from './content';

/** Bold text: `Mod-b`, and `**text**` while typing. */
export const boldPlugin = definePlugin({
    content: boldContent,
    toolbar: [{ icon: IconTextFormatBold, shortcut: 'Mod-b' }],
    inputRules: [{ delimiter: '**' }],
});
