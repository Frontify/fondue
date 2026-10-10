/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSyncExternalStore } from 'react';

import { type KeyBinding } from '#/model';

// Apple symbols in the order macOS menus show them (SPEC-rich-text-editing, Shortcuts).
const APPLE_SYMBOLS: readonly (readonly [string, string])[] = [
    ['Ctrl', '⌃'],
    ['Alt', '⌥'],
    ['Shift', '⇧'],
    ['Mod', '⌘'],
];
const OTHER_ORDER = ['Ctrl', 'Mod', 'Alt', 'Shift'];
const ARIA_NAMES: Readonly<Record<string, string>> = { Ctrl: 'Control', Alt: 'Alt', Shift: 'Shift' };

/**
 * Whether the platform is an Apple one, where `Mod` is ⌘: from `navigator.platform`, which prosemirror-keymap reads to
 * bind `Mod`, so the shown shortcut is the one that works, else from `navigator.userAgentData`.
 */
export const isApplePlatform = (): boolean => {
    if (typeof navigator === 'undefined') {
        return false;
    }
    if (navigator.platform !== '') {
        return /Mac|iP(hone|[oa]d)/.test(navigator.platform);
    }
    const { userAgentData } = navigator as Navigator & { readonly userAgentData?: { readonly platform: string } };
    return userAgentData !== undefined && /^(macOS|iOS)$/.test(userAgentData.platform);
};

interface Parsed {
    readonly modifiers: readonly string[];
    readonly key: string;
}

/** The binding's modifiers and key on this platform, or `undefined` for a binding of the other platform. */
const parse = (binding: KeyBinding, apple: boolean): Parsed | undefined => {
    let rest = binding;
    const platform = /^(mac|other):/.exec(binding);
    if (platform !== null) {
        if ((platform[1] === 'mac') !== apple) {
            return undefined;
        }
        rest = binding.slice(platform[0].length);
    }
    const parts = rest.split('-');
    let key = parts.at(-1) ?? '';
    if (key.length === 1) {
        key = key.toUpperCase();
    }
    return { modifiers: parts.slice(0, -1), key };
};

const noChanges = () => () => undefined;

/** The platform after hydration; the server and the hydrating render take the other platforms, so the markup matches. */
export const useApplePlatform = (): boolean => useSyncExternalStore(noChanges, isApplePlatform, () => false);

/** The first of `bindings` that applies on the platform. */
export const bindingHere = (bindings: readonly KeyBinding[], apple: boolean): KeyBinding | undefined =>
    bindings.find((binding) => parse(binding, apple) !== undefined);

/** The shortcut as a toolbar tooltip or menu row shows it, such as `⇧⌘Z` or `Ctrl+Shift+Z` (SPEC-rich-text-react/AC-039). */
export const shortcutText = (binding: KeyBinding, apple: boolean): string => {
    const parsed = parse(binding, apple);
    if (parsed === undefined) {
        return '';
    }
    if (apple) {
        const symbols = APPLE_SYMBOLS.filter(([name]) => parsed.modifiers.includes(name)).map(([, symbol]) => symbol);
        return `${symbols.join('')}${parsed.key}`;
    }
    const names = OTHER_ORDER.filter((name) => parsed.modifiers.includes(name)).map((name) => {
        if (name === 'Mod') {
            return 'Ctrl';
        }
        return name;
    });
    return [...names, parsed.key].join('+');
};

/** The binding as an `aria-keyshortcuts` value, such as `Meta+B` or `Control+B`. */
export const ariaShortcut = (binding: KeyBinding, apple: boolean): string => {
    const parsed = parse(binding, apple);
    if (parsed === undefined) {
        return '';
    }
    const names = OTHER_ORDER.filter((name) => parsed.modifiers.includes(name)).map((name) => {
        if (name !== 'Mod') {
            return ARIA_NAMES[name];
        }
        if (apple) {
            return 'Meta';
        }
        return 'Control';
    });
    return [...names, parsed.key].join('+');
};

/** The key an event names; with Alt or Shift held, from the physical key, since they change the character on many layouts. */
const keyOf = (event: KeyboardEvent): string => {
    const physical = /^(?:Key|Digit)(\w)$/.exec(event.code);
    if (physical !== null && (event.altKey || event.shiftKey)) {
        return physical[1] ?? '';
    }
    if (event.key.length === 1) {
        return event.key.toUpperCase();
    }
    return event.key;
};

/** Whether `event` presses `binding`, with exactly its modifiers. */
export const pressesBinding = (event: KeyboardEvent, binding: KeyBinding): boolean => {
    const apple = isApplePlatform();
    const parsed = parse(binding, apple);
    if (parsed === undefined) {
        return false;
    }
    const has = (name: string) => parsed.modifiers.includes(name);
    return (
        keyOf(event) === parsed.key &&
        event.altKey === has('Alt') &&
        event.shiftKey === has('Shift') &&
        event.ctrlKey === (has('Ctrl') || (has('Mod') && !apple)) &&
        event.metaKey === (has('Mod') && apple)
    );
};
