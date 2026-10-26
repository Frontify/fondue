/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { listItemEditor } from './editor';
import { listItem } from './feature';

/** List items: Tab and Shift-Tab nest and outdent them, and Enter and Backspace split and outdent them. */
export const listItemPlugin = definePlugin({ feature: listItem, editor: listItemEditor });
