/* (c) Copyright Frontify Ltd., all rights reserved. */

import { macBaseKeymap, pcBaseKeymap } from 'prosemirror-commands';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { fixtureProfiles } from '#/features/__fixtures__/profiles';
import { type ContentNodeJSON } from '#/model';
import { compiledModel } from '#/model/compile';
import { keyOn, modOn } from '#/model/platform';
import { setSelection, typeText } from '#/testing';

import { mountText, para, text, textFeatures, textModel } from '../../../fixtures/editor/text';

const ALL_TYPOGRAPHY = [
    'typography.quotes',
    'typography.ellipsis',
    'typography.dashes',
    'typography.symbols',
    'typography.numeric',
] as const;
const model = textModel(textFeatures(ALL_TYPOGRAPHY));

interface Press {
    readonly key: string;
    readonly meta?: boolean;
    readonly ctrl?: boolean;
    readonly alt?: boolean;
    readonly shift?: boolean;
}
type Mounted = ReturnType<typeof mountText>;

const press = (
    { view }: Mounted,
    { key, meta = false, ctrl = false, alt = false, shift = false }: Press,
    keyCode = 0,
) => {
    const event = new KeyboardEvent('keydown', {
        key,
        metaKey: meta,
        ctrlKey: ctrl,
        altKey: alt,
        shiftKey: shift,
        bubbles: true,
        cancelable: true,
    });
    // ProseMirror reads the legacy `keyCode` of Enter, Escape, Backspace, Delete and the arrows, which no event init sets.
    Object.defineProperty(event, 'keyCode', { get: () => keyCode });
    view.dom.dispatchEvent(event);
    return event.defaultPrevented;
};
const onPlatform = (apple: boolean) =>
    vi.spyOn(navigator, 'platform', 'get').mockReturnValue(apple ? 'MacIntel' : 'Win32');

const heading = (...content: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'heading',
    attrs: { nodeId: 'heading-1', level: 2, lang: null },
    content: [...content],
});

/** A Shortcuts table row of the delivered features: what each platform presses, and the document it starts from. */
interface Row {
    readonly command: string;
    readonly apple: readonly Press[];
    readonly other: readonly Press[];
    readonly start: 'word' | 'heading' | 'typed' | 'undone' | 'first' | 'second';
}
const mark = (command: string, key: string, shift = false): Row => ({
    command,
    apple: [{ key, meta: true, shift }],
    other: [{ key, ctrl: true, shift }],
    start: 'word',
});
const ROWS: readonly Row[] = [
    { command: 'history.undo', apple: [{ key: 'z', meta: true }], other: [{ key: 'z', ctrl: true }], start: 'typed' },
    {
        command: 'history.redo',
        apple: [{ key: 'z', meta: true, shift: true }],
        other: [
            { key: 'y', ctrl: true },
            { key: 'z', ctrl: true, shift: true },
        ],
        start: 'undone',
    },
    {
        command: 'hard-break.insert',
        apple: [{ key: 'Enter', shift: true }],
        other: [{ key: 'Enter', shift: true }],
        start: 'word',
    },
    mark('mark.bold.toggle', 'b'),
    mark('mark.italic.toggle', 'i'),
    mark('mark.underline.toggle', 'u'),
    mark('mark.strike.toggle', 'x', true),
    mark('mark.code.toggle', 'e'),
    mark('mark.subscript.toggle', ','),
    mark('mark.superscript.toggle', '.'),
    {
        command: 'paragraph.set',
        apple: [{ key: '0', meta: true, alt: true }],
        other: [{ key: '0', ctrl: true, shift: true }],
        start: 'heading',
    },
    ...[1, 2, 3, 4, 5, 6].map(
        (level): Row => ({
            command: `heading.set ${level}`,
            apple: [{ key: `${level}`, meta: true, alt: true }],
            other: [{ key: `${level}`, ctrl: true, shift: true }],
            start: 'word',
        }),
    ),
    {
        command: 'block.move.up',
        apple: [{ key: 'ArrowUp', meta: true, alt: true }],
        other: [{ key: 'ArrowUp', ctrl: true, alt: true }],
        start: 'second',
    },
    {
        command: 'block.move.down',
        apple: [{ key: 'ArrowDown', meta: true, alt: true }],
        other: [{ key: 'ArrowDown', ctrl: true, alt: true }],
        start: 'first',
    },
];

const started = (start: Row['start']) => {
    let blocks = [para(text('one two'))];
    if (start === 'heading') {
        blocks = [heading(text('one two'))];
    }
    if (start === 'first' || start === 'second') {
        blocks = [para(text('one')), para(text('two'))];
    }
    const mounted = mountText({ model, blocks });
    if (start === 'typed' || start === 'undone') {
        setSelection(mounted.handle, { text: 'one two', from: 7, to: 7 });
        typeText(mounted.handle, '!');
    }
    if (start === 'undone') {
        mounted.handle.execute('history.undo');
    }
    if (start === 'second') {
        setSelection(mounted.handle, { text: 'two', from: 1, to: 1 });
    } else if (start === 'first') {
        setSelection(mounted.handle, { text: 'one', from: 1, to: 1 });
    } else if (start !== 'typed' && start !== 'undone') {
        setSelection(mounted.handle, { text: 'two' });
    }
    return mounted;
};

/** What the last change reports: the command and its payload level, or `history` for undo and redo. */
const ran = ({ changes }: Mounted) => {
    const change = changes.at(-1);
    if (change === undefined) {
        return 'nothing';
    }
    if (change.origin === 'history') {
        return 'history';
    }
    if (change.commandId === 'heading.set') {
        const [block] = change.readDocument().content.content ?? [];
        let level: unknown;
        if (block !== undefined && block.attrs !== undefined) {
            level = block.attrs.level;
        }
        return `heading.set ${JSON.stringify(level)}`;
    }
    return change.commandId;
};

afterEach(() => vi.restoreAllMocks());

describe('core keys', () => {
    for (const apple of [true, false]) {
        const platform = apple ? 'Apple' : 'other';
        for (const row of ROWS) {
            it(`SPEC-rich-text-editing/AC-005 runs ${row.command} with the ${platform} keys of the Shortcuts table, and not with the other platform's`, () => {
                onPlatform(apple);
                const own = apple ? row.apple : row.other;
                // A key both platforms share runs on both.
                const foreign = (apple ? row.other : row.apple).filter(
                    (keys) => !own.some((mine) => JSON.stringify(mine) === JSON.stringify(keys)),
                );
                const expected = row.command.startsWith('history') ? 'history' : row.command;
                const results = own.map((keys) => {
                    const mounted = started(row.start);
                    const before = mounted.changes.length;
                    press(mounted, keys);
                    const result = [mounted.changes.length - before, ran(mounted)];
                    mounted.unmount();
                    return result;
                });
                const crossed = foreign.map((keys) => {
                    const mounted = started(row.start);
                    const before = mounted.changes.length;
                    press(mounted, keys);
                    const count = mounted.changes.length - before;
                    mounted.unmount();
                    return count;
                });

                expect(results).toEqual(own.map(() => [1, expected]));
                expect(crossed.filter((count) => count > 0)).toEqual([]);
            });
        }
    }

    it('SPEC-rich-text-editing/AC-004 binds no printable key without Ctrl, ⌘ or Alt in the compiled keymap of every profile', () => {
        const profiles = { ...fixtureProfiles(), text: textFeatures(ALL_TYPOGRAPHY) };
        const bare = Object.entries(profiles).flatMap(([name, features]) =>
            compiledModel(textModel(features))
                .keymap.map(({ key }) => key.replace(/^(mac|other):/, ''))
                .filter((key) => {
                    const parts = key.split(/-(?!$)/);
                    const last = parts.at(-1) ?? '';
                    const printable = Array.from(last).length === 1;
                    return printable && !parts.slice(0, -1).some((part) => ['Mod', 'Ctrl', 'Alt'].includes(part));
                })
                .map((key) => `${name}: ${key}`),
        );

        expect(bare).toEqual([]);
    });

    it('SPEC-rich-text-editing/AC-002 prevents no key combination that the keymap leaves unbound, on each platform', () => {
        const named: Readonly<Record<string, number>> = {
            Enter: 13,
            Backspace: 8,
            Delete: 46,
            Tab: 9,
            Escape: 27,
            ' ': 32,
            Home: 36,
            End: 35,
            PageUp: 33,
            PageDown: 34,
            ArrowLeft: 37,
            ArrowUp: 38,
            ArrowRight: 39,
            ArrowDown: 40,
            Insert: 45,
            ContextMenu: 93,
            ...Object.fromEntries(Array.from({ length: 12 }, (_, index) => [`F${index + 1}`, 112 + index])),
        };
        // US layout keys, their legacy `keyCode`, and the character each types with Shift held.
        const punctuation = ",./;'[]\\-=`";
        const codes = [188, 190, 191, 186, 222, 219, 221, 220, 189, 187, 192];
        const keyCodes: Record<string, number> = { ...named };
        for (const [index, key] of [...'abcdefghijklmnopqrstuvwxyz'].entries()) {
            keyCodes[key] = 65 + index;
        }
        for (const [index, key] of [...'0123456789'].entries()) {
            keyCodes[key] = 48 + index;
        }
        for (const [index, key] of [...punctuation].entries()) {
            keyCodes[key] = codes[index] ?? 0;
        }
        const shifted = Object.fromEntries(
            [...`0123456789${punctuation}`].map((key, index) => [key, ')!@#$%^&*(<>?:"{}|_+~'[index]]),
        );
        const modifiers = ['Alt', 'Ctrl', 'Meta', 'Shift'];
        const subsets = Array.from({ length: 16 }, (_, bits) => modifiers.filter((_, index) => bits & (1 << index)));
        const canonical = (mods: readonly string[], key: string) => [...[...mods].sort(), key.toLowerCase()].join('-');
        const bind = (bound: Set<string>, key: string, apple: boolean) => {
            const parts = modOn(key, apple).split(/-(?!$)/);
            bound.add(canonical(parts.slice(0, -1), parts.at(-1) ?? ''));
        };
        const prevented: string[] = [];
        for (const apple of [true, false]) {
            onPlatform(apple);
            const bound = new Set<string>();
            for (const { key } of compiledModel(model).keymap) {
                const here = keyOn(key, apple);
                if (here !== undefined) {
                    bind(bound, here, apple);
                }
            }
            // The base keymap of Key precedence row 10: Enter, Backspace, Delete and select-all.
            for (const key of Object.keys(apple ? macBaseKeymap : pcBaseKeymap)) {
                bind(bound, key, apple);
            }
            // ProseMirror prevents the browser's own bold, italic, undo and redo, which would bypass the history, by
            // its own platform check, which read the test environment's platform when it loaded.
            for (const key of ['b', 'i', 'y', 'z']) {
                bind(bound, `Mod-${key}`, apple);
                bind(bound, `Ctrl-${key}`, apple);
            }
            const mounted = mountText({ model, blocks: [para(text('one two'))] });
            setSelection(mounted.handle, { text: 'one two', from: 3, to: 3 });
            for (const mods of subsets) {
                for (const [key, keyCode] of Object.entries(keyCodes)) {
                    if (bound.has(canonical(mods, key))) {
                        continue;
                    }
                    let typed = key;
                    if (mods.includes('Shift') && key.length === 1) {
                        typed = shifted[key] ?? key.toUpperCase();
                    }
                    const has = (name: string) => mods.includes(name);
                    const pressed = {
                        key: typed,
                        meta: has('Meta'),
                        ctrl: has('Ctrl'),
                        alt: has('Alt'),
                        shift: has('Shift'),
                    };
                    if (press(mounted, pressed, keyCode)) {
                        prevented.push(`${apple ? 'Apple' : 'other'} ${[...mods, key].join('-')}`);
                    }
                }
            }
            mounted.unmount();
            vi.restoreAllMocks();
        }

        expect(prevented).toEqual([]);
    });
});
