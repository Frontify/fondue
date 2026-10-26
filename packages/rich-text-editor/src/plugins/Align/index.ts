/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { alignEditor } from './editor';
import { align } from './feature';

/** Left, center, right and justify alignment of paragraphs and headings, from Mod+Shift+L, E, R and J or the toolbar. */
export const alignPlugin = definePlugin({ feature: align, editor: alignEditor });
