/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';

import { buildPluginRegistry, defineBlock, type EditorControlApi, type RteInputRule, type RtePlugin } from '../core';
import {
    autoformatPlugin,
    blurOnBreakPlugin,
    bulletListPlugin,
    columnBreakPlugin,
    defaultPlugins,
    mentionPlugin,
    numberedListPlugin,
    RichTextRenderer,
    serializeToHtml,
    textStylePlugin,
} from '../index';
import { searchIn } from '../plugins/Mention/Mention';

/**
 * The plugin definitions that hold behaviour of their own — what they declare,
 * and what their handlers do with the API they are handed. A fake API stands
 * in for the editor, recording what was asked of it.
 */

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const recordingApi = ({ inList = false } = {}) => {
    const calls: string[] = [];
    const api = {
        lists: {
            split: () => {
                calls.push('split');
                return inList;
            },
            toggle: (type: string) => {
                calls.push(`lists.toggle ${type}`);
            },
        },
        blocks: {
            setType: (type: string, value?: Record<string, unknown>) => {
                calls.push(`blocks.setType ${type}${value ? ` ${JSON.stringify(value)}` : ''}`);
            },
        },
        blur: () => {
            calls.push('blur');
        },
    } as unknown as EditorControlApi;
    return { api, calls };
};

const PEOPLE = [
    { id: '1', username: 'ana', name: 'Ana Muster' },
    { id: '2', username: 'bob', name: 'Robert Brown' },
];

describe('mentionPlugin', () => {
    it('searches a fixed list by username and name, ignoring case', () => {
        const search = searchIn(PEOPLE);

        expect(search('AN')).toEqual([PEOPLE[0]]);
        expect(search('brown')).toEqual([PEOPLE[1]]);
        expect(search('')).toEqual(PEOPLE);
    });

    it('takes a list or a function as items', () => {
        expect(() => mentionPlugin({ items: PEOPLE, href: () => '#' })).not.toThrow();
        expect(() => mentionPlugin({ items: () => Promise.resolve(PEOPLE), href: () => '#' })).not.toThrow();
    });

    it('binds its trigger as a one-character hotkey', () => {
        expect(Object.keys(mentionPlugin({ items: [], href: () => '#', trigger: '#' }).hotkeys ?? {})).toEqual(['#']);
    });

    it('refuses a trigger that is not exactly one character, since it could never fire', () => {
        expect(() => mentionPlugin({ items: [], href: () => '#', trigger: '@@' })).toThrow(/exactly one character/);
        expect(() => mentionPlugin({ items: [], href: () => '#', trigger: '' })).toThrow(/exactly one character/);
    });
});

describe('blurOnBreakPlugin', () => {
    const enter = blurOnBreakPlugin().hotkeys?.Enter;

    it('splits the list item when Enter is pressed inside a list, and keeps focus', () => {
        const { api, calls } = recordingApi({ inList: true });

        expect(enter?.(api)).toBe(true);
        expect(calls).toEqual(['split']);
    });

    it('gives up focus when Enter is pressed anywhere else, adding no paragraph', () => {
        const { api, calls } = recordingApi();

        expect(enter?.(api)).toBe(true);
        expect(calls).toEqual(['split', 'blur']);
    });
});

describe('the list plugins', () => {
    it('toggle their list on the shortcuts other editors use', () => {
        const { api, calls } = recordingApi();

        bulletListPlugin().hotkeys?.['Mod-Shift-8']?.(api);
        numberedListPlugin().hotkeys?.['Mod-Shift-7']?.(api);

        expect(calls).toEqual(['lists.toggle bulletList', 'lists.toggle numberedList']);
    });

    it('share their item, so both can be mounted together', () => {
        const registry = buildPluginRegistry([bulletListPlugin(), numberedListPlugin()]);

        expect(registry.itemTypeByList).toEqual(
            new Map([
                ['bulletList', 'listItem'],
                ['numberedList', 'listItem'],
            ]),
        );
    });
});

describe('textStylePlugin', () => {
    it('binds Mod-Alt-0 to a paragraph and Mod-Alt-1 to 4 to the headings', () => {
        const { api, calls } = recordingApi();
        const hotkeys = textStylePlugin().hotkeys ?? {};

        for (const keys of ['Mod-Alt-0', 'Mod-Alt-1', 'Mod-Alt-4']) {
            hotkeys[keys]?.(api);
        }

        expect(calls).toEqual([
            'blocks.setType paragraph',
            'blocks.setType textStyle {"style":"heading1"}',
            'blocks.setType textStyle {"style":"heading4"}',
        ]);
    });

    it('binds only the styles the editor offers', () => {
        const hotkeys = textStylePlugin({ styles: ['heading2', 'custom1'] }).hotkeys ?? {};

        expect(Object.keys(hotkeys)).toEqual(['Mod-Alt-2']);
    });
});

describe('autoformatPlugin', () => {
    const fractions = (autoformatPlugin().inputRules ?? []).filter(
        (rule): rule is Extract<RteInputRule, { kind: 'text' }> => rule.kind === 'text' && rule.match.includes('/'),
    );

    it('rewrites a fraction only once a space ends it, so dates and longer numbers stay as typed', () => {
        expect(fractions.length).toBeGreaterThan(0);
        for (const rule of fractions) {
            expect(rule.match.endsWith(' ')).toBe(true);
            expect(rule.replaceWith.endsWith(' ')).toBe(true);
        }
    });
});

describe('columnBreakPlugin', () => {
    it('marks the break up as a separator for assistive technology', () => {
        const html = serializeToHtml(
            { version: 1, blocks: [{ type: 'columnBreak' }] },
            { plugins: [columnBreakPlugin()], wrap: false },
        );

        expect(html).toContain('role="separator"');
        expect(html).toContain('aria-label="Column break"');
    });
});

describe('defaultPlugins', () => {
    it('cannot be changed in place', () => {
        expect(Object.isFrozen(defaultPlugins)).toBe(true);
    });
});

describe('the readonly renderer', () => {
    it('redraws only the blocks that changed', () => {
        const drawn: string[] = [];
        const notePlugin: RtePlugin = {
            id: 'note',
            blocks: {
                note: defineBlock<{ label: string }>({
                    defaults: { label: '' },
                    toHtml: ({ label }) => ({ tag: 'p', children: label }),
                    parse: [],
                    render: {
                        component: ({ value }) => {
                            drawn.push(value.label);
                            return <p>{value.label}</p>;
                        },
                    },
                }),
            },
        };
        // One list for both renders, as a host holds it: a new list is a new
        // set of plugins, which redraws everything.
        const plugins = [notePlugin];
        const first = { type: 'note', label: 'one' };
        const doc = { version: 1 as const, blocks: [first, { type: 'note', label: 'two' }] };
        const changed = { ...doc, blocks: [first, { type: 'note', label: 'three' }] };
        const container = window.document.createElement('div');
        const root = createRoot(container);

        act(() => root.render(<RichTextRenderer value={doc} plugins={plugins} />));
        act(() => root.render(<RichTextRenderer value={changed} plugins={plugins} />));

        expect(container.textContent).toBe('onethree');
        expect(drawn).toEqual(['one', 'two', 'three']);
        act(() => root.unmount());
    });
});
