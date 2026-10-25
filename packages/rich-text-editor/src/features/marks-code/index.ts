/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { codeEditor } from './editor';
import { code } from './feature';

/** Inline code: the `code` mark, Mod+E, backticks, and a toolbar toggle. */
export const codePlugin = definePlugin({ feature: code, editor: codeEditor });
