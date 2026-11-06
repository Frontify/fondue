/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { subscriptContent } from './content';

/** Subscript text: `<sub>` and `Mod-,`. */
export const subscriptPlugin = definePlugin({
    content: subscriptContent,
    toolbar: [{ icon: IconSubscript, shortcut: 'Mod-,' }],
});
