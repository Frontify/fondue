/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { strikeEditor } from './editor';
import { strike } from './feature';

/** Strikethrough text: the `s` mark, Mod+Shift+X, `~~`, and a toolbar toggle. */
export const strikePlugin = definePlugin({ feature: strike, editor: strikeEditor });
