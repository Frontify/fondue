/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The platform names of Apple systems, where `Mod` is the Command key
 */
const APPLE_PLATFORM = /Mac|iPhone|iPad/;

/**
 * True on Apple platforms, where shortcuts use Cmd instead of Ctrl.
 */
export const isApple = (): boolean => typeof navigator !== 'undefined' && APPLE_PLATFORM.test(navigator.platform);
