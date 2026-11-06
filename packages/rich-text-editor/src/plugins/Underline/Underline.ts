/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { underlineContent } from './content';

/** Underlined text: `<u>` and `Mod-u`. */
export const underlinePlugin = definePlugin({
    content: underlineContent,
    toolbar: [{ icon: IconTextFormatUnderline, shortcut: 'Mod-u' }],
});
