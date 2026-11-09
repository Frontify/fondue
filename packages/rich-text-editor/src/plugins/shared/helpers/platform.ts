/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * True on Apple platforms, where shortcuts use Cmd instead of Ctrl.
 */
export const isApple = (): boolean => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
