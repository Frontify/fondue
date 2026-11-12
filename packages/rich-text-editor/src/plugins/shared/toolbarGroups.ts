/* (c) Copyright Frontify Ltd., all rights reserved. */

// The built-in toolbar groups, 100 apart so a host can place its own between two: `{ id: 'review', order: TOOLBAR_GROUPS.link.order + 10 }`.
// One named export per group, read as a namespace (`import * as TOOLBAR_GROUPS`): a plugin's `toolbarGroup: TOOLBAR_GROUPS.marks` then stays removable by tree shaking, which a property read on an object is not.

import { type RteToolbarGroup } from '#/core';

export const history: RteToolbarGroup = { id: 'history', order: 100 };
export const text: RteToolbarGroup = { id: 'text', order: 200 };
export const marks: RteToolbarGroup = { id: 'marks', order: 300 };
export const color: RteToolbarGroup = { id: 'color', order: 400 };
export const link: RteToolbarGroup = { id: 'link', order: 500 };
export const lists: RteToolbarGroup = { id: 'lists', order: 600 };
export const align: RteToolbarGroup = { id: 'align', order: 700 };
export const insert: RteToolbarGroup = { id: 'insert', order: 800 };
export const panels: RteToolbarGroup = { id: 'panels', order: 900 };
