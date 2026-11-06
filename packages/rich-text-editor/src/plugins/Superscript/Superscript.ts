/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { superscriptContent } from './content';

/** Superscript text: `<sup>` and `Mod-.`. */
export const superscriptPlugin = definePlugin({
    content: superscriptContent,
    toolbar: [{ icon: IconSuperscript, shortcut: 'Mod-.' }],
});
