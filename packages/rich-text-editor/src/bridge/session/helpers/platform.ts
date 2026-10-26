/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isApple } from '#/model/internal';

/** Whether the platform is an Apple one, by the check the editor's keymaps use, so the shown shortcut is the one that runs. */
export const isApplePlatform = (): boolean => typeof navigator !== 'undefined' && isApple(navigator);
