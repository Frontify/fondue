/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { subscriptEditor } from './editor';
import { subscript } from './feature';

/** Subscript text: the `sub` mark, Mod+Comma, and a toolbar toggle that removes superscript. */
export const subscriptPlugin = definePlugin({ feature: subscript, editor: subscriptEditor });
