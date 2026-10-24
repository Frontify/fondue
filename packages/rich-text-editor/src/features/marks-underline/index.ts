/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { underlineEditor } from './editor';
import { underline } from './feature';

/** Underlined text: the `u` mark, Mod+U, and a toolbar toggle. */
export const underlinePlugin = definePlugin({ feature: underline, editor: underlineEditor });
