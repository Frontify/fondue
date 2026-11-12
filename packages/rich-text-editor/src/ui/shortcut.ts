/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HotkeyModifier, isApplePlatform, parseHotkey } from '#/core';

const MODIFIER_JOINER = '+';

/**
 * A key as people read it: one character is upper-cased, a named key stays as written
 */
const keyName = (key: string): string => {
    if (key.length === 1) {
        return key.toUpperCase();
    }
    return key;
};

/**
 * The names `aria-keyshortcuts` gives each modifier on Apple systems, where `Mod` is Command
 */
const ARIA_MODIFIERS_APPLE: Record<HotkeyModifier, string> = {
    Mod: 'Meta',
    Meta: 'Meta',
    Ctrl: 'Control',
    Alt: 'Alt',
    Shift: 'Shift',
};

/**
 * The names `aria-keyshortcuts` gives each modifier elsewhere, where `Mod` is Control
 */
const ARIA_MODIFIERS_OTHER: Record<HotkeyModifier, string> = {
    Mod: 'Control',
    Meta: 'Meta',
    Ctrl: 'Control',
    Alt: 'Alt',
    Shift: 'Shift',
};

/**
 * The names people read for each modifier outside Apple systems
 */
const READABLE_MODIFIERS_OTHER: Record<HotkeyModifier, string> = {
    Mod: 'Ctrl',
    Meta: 'Meta',
    Ctrl: 'Ctrl',
    Alt: 'Alt',
    Shift: 'Shift',
};

type AppleModifierSymbol = {
    symbol: string;
    modifiers: readonly HotkeyModifier[];
};

/**
 * The symbols of Apple systems in the order macOS menus list them (⌃⌥⇧⌘), whatever order the shortcut is written in.
 * `Mod` and `Meta` are both Command.
 */
const APPLE_MODIFIER_SYMBOLS: readonly AppleModifierSymbol[] = [
    { symbol: '⌃', modifiers: ['Ctrl'] },
    { symbol: '⌥', modifiers: ['Alt'] },
    { symbol: '⇧', modifiers: ['Shift'] },
    { symbol: '⌘', modifiers: ['Mod', 'Meta'] },
];

/**
 * `Mod-Shift-x` as `aria-keyshortcuts` spells it: `Meta+Shift+X` on Apple systems, `Control+Shift+X` elsewhere
 */
export const ariaKeyShortcut = (shortcut: string, apple = isApplePlatform()): string => {
    const { modifiers, key } = parseHotkey(shortcut);
    const names = apple ? ARIA_MODIFIERS_APPLE : ARIA_MODIFIERS_OTHER;
    return [...modifiers.map((modifier) => names[modifier]), keyName(key)].join(MODIFIER_JOINER);
};

/**
 * `Mod-Shift-x` as people read it: `⇧⌘X` on Apple systems, `Ctrl+Shift+X` elsewhere
 */
export const readableShortcut = (shortcut: string, apple = isApplePlatform()): string => {
    const { modifiers, key } = parseHotkey(shortcut);
    if (apple) {
        const symbols = APPLE_MODIFIER_SYMBOLS.filter((entry) =>
            entry.modifiers.some((modifier) => modifiers.includes(modifier)),
        );
        return symbols.map((entry) => entry.symbol).join('') + keyName(key);
    }
    return [...modifiers.map((modifier) => READABLE_MODIFIERS_OTHER[modifier]), keyName(key)].join(MODIFIER_JOINER);
};
