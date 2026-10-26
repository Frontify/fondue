/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { superscriptEditor } from './editor';
import { superscript } from './feature';

/** Superscript text: the `sup` mark, Mod+Period, and a toolbar toggle that removes subscript. */
export const superscriptPlugin = definePlugin({ feature: superscript, editor: superscriptEditor });
