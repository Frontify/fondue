/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { ariaKeyShortcut, readableShortcut } from './shortcut';

describe('a toolbar shortcut', () => {
    it('is spelled for aria-keyshortcuts by platform', () => {
        expect(ariaKeyShortcut('Mod-b', true)).toBe('Meta+B');
        expect(ariaKeyShortcut('Mod-Shift-x', false)).toBe('Control+Shift+X');
        expect(ariaKeyShortcut('cmd-ctrl-k', false)).toBe('Meta+Control+K');
    });

    it('is spelled for people by platform', () => {
        expect(readableShortcut('Mod-Shift-x', true)).toBe('⇧⌘X');
        expect(readableShortcut('Mod-Alt-1', true)).toBe('⌥⌘1');
        expect(readableShortcut('Shift-Ctrl-Alt-Mod-k', true)).toBe('⌃⌥⇧⌘K');
        expect(readableShortcut('cmd-shift-x', true)).toBe('⇧⌘X');
        expect(readableShortcut('Mod-Meta-x', true)).toBe('⌘X');
        expect(readableShortcut('Alt-F10', true)).toBe('⌥F10');
        expect(readableShortcut('Mod-k', false)).toBe('Ctrl+K');
        expect(readableShortcut('Mod-,', false)).toBe('Ctrl+,');
    });
});
