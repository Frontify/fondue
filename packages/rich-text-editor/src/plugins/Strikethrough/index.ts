/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { strikeEditor } from './editor';
import { strikethrough } from './feature';

/** Strikethrough text: the `s` mark, Mod+Shift+X, `~~`, and a toolbar toggle. */
export const strikethroughPlugin = definePlugin({ feature: strikethrough, editor: strikeEditor });
