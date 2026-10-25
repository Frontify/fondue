/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { boldEditor } from './editor';
import { bold } from './feature';

/** Bold text: the `strong` mark, Mod+B, `**` and `__`, and a toolbar toggle. */
export const boldPlugin = definePlugin({ feature: bold, editor: boldEditor });
