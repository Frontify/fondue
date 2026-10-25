/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { columnsEditor } from './editor';
import { columns } from './feature';

/** Column breaks between top-level blocks, from Mod+Shift+Enter or the toolbar. */
export const columnsPlugin = definePlugin({ feature: columns, editor: columnsEditor });
