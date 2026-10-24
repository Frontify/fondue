/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { italicEditor } from './editor';
import { italic } from './feature';

/** Italic text: the `em` mark, Mod+I, `*` and `_`, and a toolbar toggle. */
export const italicPlugin = definePlugin({ feature: italic, editor: italicEditor });
