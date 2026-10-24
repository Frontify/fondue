/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { formatClearEditor } from './editor';
import { formatClear } from './feature';

/** Clear formatting: Mod+\ clears inline marks, and the toolbar button clears blocks too. */
export const formatClearPlugin = definePlugin({ feature: formatClear, editor: formatClearEditor });
