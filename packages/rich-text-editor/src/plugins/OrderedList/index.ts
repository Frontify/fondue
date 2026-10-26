/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { orderedListEditor } from './editor';
import { orderedList } from './feature';

/** Numbered lists, from Mod+Shift+7, `1. ` at a line start, or the toolbar, and a dialog that sets the start number. */
export const orderedListPlugin = definePlugin({ feature: orderedList, editor: orderedListEditor });
