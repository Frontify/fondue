/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isApple } from './platform';

const MODIFIER_SEPARATOR = '-';

const MOD = 'Mod';

/**
 * A key as people read it: one character is upper-cased, a named key stays as written
 */
const keyName = (part: string): string => {
    if (part.length === 1) {
        return part.toUpperCase();
    }
    return part;
};

/**
 * One part of a shortcut as `aria-keyshortcuts` spells it: `Mod` is `Meta` on Apple systems and `Control` elsewhere
 */
const ariaPart = (part: string, apple: boolean): string => {
    if (part !== MOD) {
        return keyName(part);
    }
    if (apple) {
        return 'Meta';
    }
    return 'Control';
};

/**
 * `Mod-Shift-x` as `aria-keyshortcuts` spells it: `Meta+Shift+X` on Apple systems, `Control+Shift+X` elsewhere
 */
export const ariaKeyShortcut = (shortcut: string, apple = isApple()): string =>
    shortcut
        .split(MODIFIER_SEPARATOR)
        .map((part) => ariaPart(part, apple))
        .join('+');

const APPLE_SYMBOLS: Record<string, string> = { Mod: '⌘', Shift: '⇧', Alt: '⌥', Ctrl: '⌃' };

/**
 * `Mod-Shift-x` as people read it: `⌘⇧X` on Apple systems, `Ctrl+Shift+X` elsewhere
 */
export const readableShortcut = (shortcut: string, apple = isApple()): string => {
    const parts = shortcut.split(MODIFIER_SEPARATOR).map(keyName);
    if (apple) {
        return parts.map((part) => APPLE_SYMBOLS[part] ?? part).join('');
    }
    return parts.map((part) => (part === MOD ? 'Ctrl' : part)).join('+');
};
