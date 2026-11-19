/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type HotkeyEvent, matchesHotkey, parseHotkey } from './hotkeys';

const NO_KEYS: HotkeyEvent = { metaKey: false, ctrlKey: false, altKey: false, shiftKey: false };

describe('parseHotkey', () => {
    it('splits the modifiers from the key', () => {
        expect(parseHotkey('Mod-Shift-x')).toEqual({ modifiers: ['Mod', 'Shift'], key: 'x' });
    });

    it('reads every modifier core promises, in any case, with Cmd as Meta', () => {
        expect(parseHotkey('cmd-META-ctrl-Alt-SHIFT-mod-k').modifiers).toEqual([
            'Meta',
            'Meta',
            'Ctrl',
            'Alt',
            'Shift',
            'Mod',
        ]);
    });

    it('reads a hotkey of modifiers alone as having no key', () => {
        expect(parseHotkey('Mod')).toEqual({ modifiers: ['Mod'], key: '' });
    });

    it('reads a last hyphen as the key', () => {
        expect(parseHotkey('Mod--')).toEqual({ modifiers: ['Mod'], key: '-' });
    });

    it('throws on a part before the key that is not a modifier', () => {
        expect(() => parseHotkey('Hyper-k')).toThrow('Unknown modifier "Hyper" in hotkey "Hyper-k".');
    });
});

describe('matchesHotkey', () => {
    it('takes Mod as Command on Apple platforms', () => {
        expect(matchesHotkey('Mod-k', { ...NO_KEYS, metaKey: true, key: 'k' }, true)).toBe(true);
        expect(matchesHotkey('Mod-k', { ...NO_KEYS, ctrlKey: true, key: 'k' }, true)).toBe(false);
    });

    it('takes Mod as Control elsewhere', () => {
        expect(matchesHotkey('Mod-k', { ...NO_KEYS, ctrlKey: true, key: 'k' }, false)).toBe(true);
        expect(matchesHotkey('Mod-k', { ...NO_KEYS, metaKey: true, key: 'k' }, false)).toBe(false);
    });

    it('matches a key whatever its case', () => {
        expect(matchesHotkey('Mod-Shift-x', { ...NO_KEYS, ctrlKey: true, shiftKey: true, key: 'X' }, false)).toBe(true);
    });

    it('refuses a modifier the hotkey does not name', () => {
        expect(matchesHotkey('Mod-k', { ...NO_KEYS, ctrlKey: true, shiftKey: true, key: 'k' }, false)).toBe(false);
    });

    it('refuses a missing modifier or another key', () => {
        expect(matchesHotkey('Mod-Shift-x', { ...NO_KEYS, ctrlKey: true, key: 'x' }, false)).toBe(false);
        expect(matchesHotkey('Mod-k', { ...NO_KEYS, ctrlKey: true, key: 'j' }, false)).toBe(false);
    });

    it('matches a click by its modifiers alone', () => {
        expect(matchesHotkey('Mod', { ...NO_KEYS, metaKey: true }, true)).toBe(true);
        expect(matchesHotkey('Mod', NO_KEYS, true)).toBe(false);
    });

    it('does not match a keystroke against a hotkey of modifiers alone', () => {
        expect(matchesHotkey('Mod', { ...NO_KEYS, ctrlKey: true, key: 'k' }, false)).toBe(false);
    });

    it('matches Cmd and Ctrl as the keys they name, whatever the platform', () => {
        expect(matchesHotkey('Cmd-k', { ...NO_KEYS, metaKey: true, key: 'k' }, false)).toBe(true);
        expect(matchesHotkey('Ctrl-k', { ...NO_KEYS, ctrlKey: true, key: 'k' }, true)).toBe(true);
    });
});
