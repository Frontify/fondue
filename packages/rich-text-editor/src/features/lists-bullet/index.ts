/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { bulletListEditor } from './editor';
import { bulletList } from './feature';

/** Bulleted lists, from Mod+Shift+8, `-`, `*` or `+` at a line start, or the toolbar. */
export const bulletListPlugin = definePlugin({ feature: bulletList, editor: bulletListEditor });
