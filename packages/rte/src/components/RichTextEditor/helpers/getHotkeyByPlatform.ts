/* (c) Copyright Frontify Ltd., all rights reserved. */

export const PLATFORM_MAC = 'Mac';

export const getHotkeyByPlatform = (shortcut: string, browserPlatform = navigator.platform): string => {
    if (browserPlatform.includes(PLATFORM_MAC)) {
        return shortcut.replace(/ctrl|Ctrl/, '⌘');
    }

    return shortcut;
};
