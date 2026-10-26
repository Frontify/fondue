/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { taskListEditor } from './editor';
import { taskList } from './feature';
import { taskReader } from './reader';

/** Task lists with checkable items, from Mod+Shift+9, `[ ] ` at a line start, or the toolbar. */
export const taskListPlugin = definePlugin({ feature: taskList, editor: taskListEditor, reader: taskReader });
