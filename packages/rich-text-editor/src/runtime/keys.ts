/* (c) Copyright Frontify Ltd., all rights reserved. */

// The physical key of a letter or digit, which with Ctrl and Alt alone types itself on any layout.
const PHYSICAL = /^(?:Key([A-Z])|Digit(\d))$/;

/** Whether AltGr typed a character: a key other than its physical key's own, or a symbol from a key `code` cannot name. */
const typesThroughAltGraph = (event: KeyboardEvent): boolean => {
    // No layout types a character with ⌘, and Firefox on macOS reports Option as AltGraph, which ⌥⌘ shortcuts hold.
    if (event.metaKey || Array.from(event.key).length !== 1) {
        return false;
    }
    if (!event.getModifierState('AltGraph') && !(event.ctrlKey && event.altKey)) {
        return false;
    }
    const physical = PHYSICAL.exec(event.code);
    if (physical === null) {
        return !/^[a-z0-9]$/i.test(event.key);
    }
    const [, letter, digit] = physical;
    let own = digit;
    if (letter !== undefined) {
        own = letter.toLowerCase();
    }
    return event.key.toLowerCase() !== own;
};

/**
 * Whether a keydown belongs to a composition, or types a character through AltGr, which current browsers report with
 * the `AltGraph` modifier and older ones on Windows as Ctrl and Alt, so the browser handles it and no package key
 * handler, keymap or toolbar shortcut acts on it (SPEC-rich-text-editing/AC-003, AC-074).
 */
export const passesToBrowser = (event: KeyboardEvent): boolean =>
    event.isComposing || event.keyCode === 229 || typesThroughAltGraph(event);
