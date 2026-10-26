/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { emojiEditor } from './editor';
import { emoji } from './feature';

/** Emoji from a `:` suggestion list or the toolbar picker. */
export const emojiPlugin = definePlugin({ feature: emoji, editor: emojiEditor });
