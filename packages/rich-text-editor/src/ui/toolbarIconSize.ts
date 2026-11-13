/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteIcon } from '#/core';

type RteIconSize = NonNullable<Parameters<RteIcon>[0]['size']>;

/**
 * The size the editor draws every toolbar icon at
 */
export const TOOLBAR_ICON_SIZE = 20 satisfies RteIconSize;

/**
 * The size the editor draws icons at in its menus: Turn into and the `/` menu
 */
export const MENU_ICON_SIZE = 16 satisfies RteIconSize;
