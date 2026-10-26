/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { fontColorEditor } from './editor';
import { fontColor } from './feature';

/** Text colour from the toolbar "A" menu, with Mod+Shift+H to set the last colour again. */
export const fontColorPlugin = definePlugin({ feature: fontColor, editor: fontColorEditor });
