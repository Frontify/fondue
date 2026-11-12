/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * A modifier a hotkey names. `Cmd` is written `Meta`; `Mod` is Command on Apple platforms and Control elsewhere.
 */
export type HotkeyModifier = 'Mod' | 'Meta' | 'Ctrl' | 'Alt' | 'Shift';

/**
 * A hotkey written `Mod-Shift-x`, split into its modifiers and its key. A hotkey of modifiers alone (`Mod`) has an empty key.
 */
export type ParsedHotkey = {
    modifiers: HotkeyModifier[];
    key: string;
};

/**
 * The modifier state of a keyboard or mouse event. `key` is absent on a mouse event.
 */
export type HotkeyEvent = Pick<KeyboardEvent, 'metaKey' | 'ctrlKey' | 'altKey' | 'shiftKey'> & { key?: string };

const MODIFIER_NAMES: Readonly<Record<string, HotkeyModifier>> = {
    mod: 'Mod',
    cmd: 'Meta',
    meta: 'Meta',
    ctrl: 'Ctrl',
    control: 'Ctrl',
    alt: 'Alt',
    shift: 'Shift',
};

/** Splits on every hyphen but a last one, which is the key itself: `Mod--` is Mod and the minus key. */
const HOTKEY_SEPARATOR = /-(?!$)/;

const APPLE_PLATFORM = /Mac|iPhone|iPad/;

const isApplePlatform = (): boolean => typeof navigator !== 'undefined' && APPLE_PLATFORM.test(navigator.platform);

const modifierNamed = (name: string): HotkeyModifier | undefined => MODIFIER_NAMES[name.toLowerCase()];

/**
 * A hotkey as its modifiers and key.
 *
 * @param keys - The hotkey in `Mod-b` style. Modifiers are Mod, Cmd, Meta, Ctrl, Alt and Shift in any case.
 * @returns The modifiers, with `Cmd` as `Meta`, and the key as written.
 * @throws When a part before the key is not a modifier.
 * @example
 * parseHotkey('Mod-Shift-x'); // { modifiers: ['Mod', 'Shift'], key: 'x' }
 */
export const parseHotkey = (keys: string): ParsedHotkey => {
    const parts = keys.split(HOTKEY_SEPARATOR);
    const modifiers: HotkeyModifier[] = [];
    let key = '';
    for (const [index, part] of parts.entries()) {
        const modifier = modifierNamed(part);
        if (modifier !== undefined) {
            modifiers.push(modifier);
            continue;
        }
        if (index < parts.length - 1) {
            throw new Error(`Unknown modifier "${part}" in hotkey "${keys}".`);
        }
        key = part;
    }
    return { modifiers, key };
};

/**
 * Whether an event is exactly this hotkey: its key and every modifier it names, and no other modifier.
 *
 * @param keys - The hotkey in `Mod-b` style.
 * @param event - A keyboard event, or a mouse event for a hotkey of modifiers alone.
 * @param apple - Whether `Mod` is Command. Defaults to the current platform.
 * @example
 * matchesHotkey('Mod', clickEvent); // true for Command+click on a Mac, Control+click elsewhere
 */
export const matchesHotkey = (keys: string, event: HotkeyEvent, apple: boolean = isApplePlatform()): boolean => {
    const { modifiers, key } = parseHotkey(keys);
    const named = (modifier: HotkeyModifier): boolean => modifiers.includes(modifier);
    const expectedMeta = named('Meta') || (named('Mod') && apple);
    const expectedCtrl = named('Ctrl') || (named('Mod') && !apple);
    return (
        event.metaKey === expectedMeta &&
        event.ctrlKey === expectedCtrl &&
        event.altKey === named('Alt') &&
        event.shiftKey === named('Shift') &&
        (event.key ?? '').toLowerCase() === key.toLowerCase()
    );
};
