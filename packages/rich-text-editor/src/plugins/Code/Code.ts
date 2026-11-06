/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCode } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { codeContent } from './content';

/** Inline code: `Mod-e`, and `` `text` `` while typing. */
export const codePlugin = definePlugin({
    content: codeContent,
    toolbar: [{ icon: IconCode, shortcut: 'Mod-e' }],
    inputRules: [{ delimiter: '`' }],
});
