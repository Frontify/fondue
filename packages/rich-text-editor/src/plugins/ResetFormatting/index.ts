/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { formatClearEditor } from './editor';
import { resetFormatting } from './feature';

/** Clear formatting: Mod+\ clears inline marks, and the toolbar button clears blocks too. */
export const resetFormattingPlugin = definePlugin({ feature: resetFormatting, editor: formatClearEditor });
