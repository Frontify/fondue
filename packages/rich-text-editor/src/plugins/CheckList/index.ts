/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { taskListEditor } from './editor';
import { checkList } from './feature';
import { taskReader } from './reader';

/** Task lists with checkable items, from Mod+Shift+9, `[ ] ` at a line start, or the toolbar. */
export const checkListPlugin = definePlugin({ feature: checkList, editor: taskListEditor, reader: taskReader });
