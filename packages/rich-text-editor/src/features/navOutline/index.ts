/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { outlineEditor } from './editor';
import { outline } from './feature';

/** An outline panel of the document's headings, toggled from the toolbar. */
export const outlinePlugin = definePlugin({ feature: outline, editor: outlineEditor });
