/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { ariaKeyShortcut, readableShortcut } from './ToolbarButton';

describe('a toolbar shortcut', () => {
    it('is spelled for aria-keyshortcuts by platform', () => {
        expect(ariaKeyShortcut('Mod-b', true)).toBe('Meta+B');
        expect(ariaKeyShortcut('Mod-Shift-x', false)).toBe('Control+Shift+X');
    });

    it('is spelled for people by platform', () => {
        expect(readableShortcut('Mod-Shift-x', true)).toBe('⇧⌘X');
        expect(readableShortcut('Mod-Alt-1', true)).toBe('⌥⌘1');
        expect(readableShortcut('Shift-Ctrl-Alt-Mod-k', true)).toBe('⌃⌥⇧⌘K');
        expect(readableShortcut('Mod-k', false)).toBe('Ctrl+K');
        expect(readableShortcut('Mod-,', false)).toBe('Ctrl+,');
    });
});
