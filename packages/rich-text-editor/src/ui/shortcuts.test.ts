/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type KeyBinding } from '#/model';

import { ariaShortcut, bindingHere, shortcutText } from './shortcuts';

const binding = (value: string): KeyBinding => value;

describe('shortcut text', () => {
    it('SPEC-rich-text-react/AC-039 shows Apple symbols for an Apple platform and names joined by + for the others', () => {
        const redo = binding('Mod-Shift-z');

        expect(shortcutText(redo, true)).toBe('⇧⌘Z');
        expect(shortcutText(redo, false)).toBe('Ctrl+Shift+Z');
        expect(shortcutText(binding('Ctrl-Alt-t'), true)).toBe('⌃⌥T');
        expect(shortcutText(binding('Ctrl-Alt-t'), false)).toBe('Ctrl+Alt+T');
    });

    it('SPEC-rich-text-react/AC-039 shows a mac: binding only on Apple and an other: binding only elsewhere', () => {
        expect(shortcutText(binding('mac:Mod-y'), true)).toBe('⌘Y');
        expect(shortcutText(binding('mac:Mod-y'), false)).toBe('');
        expect(shortcutText(binding('other:Mod-y'), true)).toBe('');
        expect(shortcutText(binding('other:Mod-y'), false)).toBe('Ctrl+Y');
    });

    it('SPEC-rich-text-react/AC-039 SPEC-rich-text-editing/AC-005 shows the block moves as the Shortcuts table names them', () => {
        expect(shortcutText(binding('Mod-Alt-ArrowUp'), true)).toBe('⌥⌘↑');
        expect(shortcutText(binding('Mod-Alt-ArrowDown'), true)).toBe('⌥⌘↓');
        expect(shortcutText(binding('Mod-Alt-ArrowUp'), false)).toBe('Ctrl+Alt+Up');
        expect(shortcutText(binding('Mod-Alt-ArrowDown'), false)).toBe('Ctrl+Alt+Down');
    });

    it('SPEC-rich-text-react/AC-079 names modifiers for aria-keyshortcuts by platform', () => {
        expect(ariaShortcut(binding('Mod-Alt-t'), true)).toBe('Meta+Alt+T');
        expect(ariaShortcut(binding('Mod-Alt-t'), false)).toBe('Control+Alt+T');
        expect(ariaShortcut(binding('Ctrl-Shift-b'), true)).toBe('Control+Shift+B');
        expect(ariaShortcut(binding('mac:Mod-y'), false)).toBe('');
    });

    it('SPEC-rich-text-react/AC-039 takes the first binding that applies on the platform', () => {
        const bindings = [binding('mac:Mod-y'), binding('other:Mod-y'), binding('Mod-Shift-z')];

        expect(bindingHere(bindings, true)).toBe('mac:Mod-y');
        expect(bindingHere(bindings, false)).toBe('other:Mod-y');
        expect(bindingHere([binding('mac:Mod-y'), binding('Mod-Shift-z')], false)).toBe('Mod-Shift-z');
        expect(bindingHere([binding('mac:Mod-y')], false)).toBeUndefined();
    });
});
