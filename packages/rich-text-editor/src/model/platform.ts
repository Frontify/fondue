/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyBinding } from './declarations';

/** What the platform check reads of `navigator`. */
export interface PlatformNavigator {
    readonly platform: string;
    readonly userAgentData?: { readonly platform: string };
}

const PREFIX = /^(mac|other):/;

/**
 * Whether `navigator` is an Apple platform's, where `Mod` is ⌘ and `mac:` bindings apply: from `platform`, which
 * prosemirror-keymap reads to bind `Mod`, else from `userAgentData`.
 */
export const isApple = (navigator: PlatformNavigator): boolean => {
    if (navigator.platform !== '') {
        return /Mac|iP(hone|[oa]d)/.test(navigator.platform);
    }
    const { userAgentData } = navigator;
    return userAgentData !== undefined && /^(macOS|iOS)$/.test(userAgentData.platform);
};

/** Whether the binding starts with `mac:` or `other:`, so it applies on one platform only (SPEC-rich-text-editing). */
export const isPlatformBinding = (binding: KeyBinding): boolean => PREFIX.test(binding);

/** The binding without its platform prefix where it applies, else `undefined`. */
export const keyOn = (binding: KeyBinding, apple: boolean): string | undefined => {
    const prefix = PREFIX.exec(binding);
    if (prefix === null) {
        return binding;
    }
    if ((prefix[1] === 'mac') !== apple) {
        return undefined;
    }
    return binding.slice(prefix[0].length);
};
