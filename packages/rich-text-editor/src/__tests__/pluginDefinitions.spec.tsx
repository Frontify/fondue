/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';

import {
    buildPluginRegistry,
    defineBlock,
    defineContent,
    definePlugin,
    type EditorControlApi,
    type RtePlugin,
} from '../core';
import {
    blurOnBreakPlugin,
    type BlurOnBreakPluginOptions,
    bulletListPlugin,
    columnBreakPlugin,
    defaultPlugins,
    mentionPlugin,
    type MentionPluginOptions,
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

type RecordingApiOptions = { inList?: boolean; empty?: boolean };

const recordingApi = ({ inList = false, empty = false }: RecordingApiOptions = {}) => {
    const calls: string[] = [];
    const api = {
        isEmpty: () => empty,
        announce: (message: string) => {
            calls.push(`announce ${message}`);
        },
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
        selection: { get: () => ({ marks: {} }) },
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

    it('draws a person and a group as links, and everyone, with no profile, as text', () => {
        const plugins = [
            mentionPlugin({ items: [], href: (mention) => (mention.kind === 'all' ? undefined : `/u/${mention.id}`) }),
        ];
        const doc = {
            version: 1 as const,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        // Stored before kinds existed: a person.
                        { type: 'mention', id: 'ana', username: 'ana', name: 'Ana Muster' },
                        { type: 'mention', id: 'design', username: 'design', name: 'Design team', kind: 'group' },
                        { type: 'mention', id: 'all', username: 'all', name: 'Everyone', kind: 'all' },
                    ],
                },
            ],
        };
        const container = window.document.createElement('div');
        const root = createRoot(container);

        act(() => root.render(<RichTextRenderer value={doc} plugins={plugins} />));
        const mentions = [...container.querySelectorAll('[data-mention-id]')];

        expect(mentions.map((mention) => mention.tagName)).toEqual(['A', 'A', 'SPAN']);
        expect(mentions.map((mention) => mention.getAttribute('href'))).toEqual(['/u/ana', '/u/design', null]);
        expect(mentions.map((mention) => mention.textContent)).toEqual(['@ana', '@design', '@all']);
        // Only the group carries an icon.
        expect(mentions.map((mention) => mention.querySelector('svg') !== null)).toEqual([false, true, false]);
        act(() => root.unmount());
    });

    it('writes what the app resolves into the exported HTML, and the same as no resolver for unknown', () => {
        const doc = {
            version: 1 as const,
            blocks: [
                { type: 'paragraph', children: [{ type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' }] },
            ],
        };
        const written = (options: Omit<MentionPluginOptions, 'items'>): string =>
            serializeToHtml(doc, {
                plugins: [...defaultPlugins, mentionPlugin({ ...options, items: [] })],
                wrap: false,
            });

        expect(written({ href: () => '/u' })).toContain('<bdi>@jane</bdi>');
        expect(
            written({ href: () => '/u', resolve: () => ({ status: 'current', username: 'j', name: 'J' }) }),
        ).toContain('<bdi>@j</bdi>');
        // Exports keep `@` and the label; the unavailable note is only for reading.
        const unavailable = written({ href: () => '/u', resolve: () => ({ status: 'unavailable' }) });
        expect(unavailable).toContain('<bdi>@jane</bdi>');
        expect(unavailable).not.toContain('(unavailable)');
        expect(written({ href: () => '/u', resolve: () => ({ status: 'unknown' }) })).toBe(
            written({ href: () => '/u' }),
        );
    });

    it('draws what the app resolves, isolated, and leaves the stored value as it was', () => {
        const resolutions = {
            ana: { status: 'current', username: 'ana.m', name: 'Ana Meier' },
            bob: { status: 'unavailable' },
            cy: { status: 'unknown' },
        } as const;
        const plugins = [
            mentionPlugin({
                items: [],
                href: (mention) => `/u/${mention.id}`,
                // The document below only mentions the ids that `resolutions` lists.
                resolve: (mention) => resolutions[mention.id as keyof typeof resolutions],
            }),
        ];
        const doc = {
            version: 1 as const,
            blocks: [
                {
                    type: 'paragraph',
                    children: ['ana', 'bob', 'cy'].map((id) => ({
                        type: 'mention',
                        id,
                        username: id,
                        name: `Name ${id}`,
                    })),
                },
            ],
        };
        const container = window.document.createElement('div');
        const root = createRoot(container);

        act(() => root.render(<RichTextRenderer value={doc} plugins={plugins} />));
        const mentions = [...container.querySelectorAll('[data-mention-id]')];

        expect(mentions.map((mention) => mention.tagName)).toEqual(['A', 'SPAN', 'A']);
        expect(mentions.map((mention) => mention.textContent)).toEqual(['@ana.m', '@bob (unavailable)', '@cy']);
        expect(mentions.map((mention) => mention.getAttribute('title'))).toEqual(['Ana Meier', 'Name bob', 'Name cy']);
        // The note stays outside the isolated name.
        expect(mentions.map((mention) => mention.querySelector('bdi')?.textContent)).toEqual(['@ana.m', '@bob', '@cy']);
        // The stored username stays in the data, whatever is shown.
        expect(mentions.map((mention) => mention.getAttribute('data-mention-username'))).toEqual(['ana', 'bob', 'cy']);
        // The stored name travels in the markup, whatever the title shows.
        expect(mentions.map((mention) => mention.getAttribute('data-mention-name'))).toEqual([
            'Name ana',
            'Name bob',
            'Name cy',
        ]);
        act(() => root.unmount());
    });

    it('pastes back an empty stored name as empty, never the name shown', () => {
        const plugins = [
            mentionPlugin({
                items: [],
                href: (mention) => `/u/${mention.id}`,
                resolve: () => ({ status: 'current', username: 'jj', name: 'Jane Smith' }),
            }),
        ];
        const html = serializeToHtml(
            {
                version: 1,
                blocks: [
                    { type: 'paragraph', children: [{ type: 'mention', id: 'jane', username: 'jane', name: '' }] },
                ],
            },
            { plugins },
        );
        const element = window.document.createElement('div');
        element.innerHTML = html;
        const anchor = element.querySelector<HTMLElement>('[data-mention-id]');

        const parsed = plugins[0]?.content?.inlines?.mention?.parse[0]?.value?.(anchor as HTMLElement);

        expect(parsed).toEqual({ id: 'jane', username: 'jane', name: '' });
    });
});

describe('blurOnBreakPlugin', () => {
    const enterOf = (options?: BlurOnBreakPluginOptions) => blurOnBreakPlugin(options).hotkeys?.Enter?.run;

    it('splits the list item when Enter is pressed inside a list, and keeps focus', () => {
        const { api, calls } = recordingApi({ inList: true });

        expect(enterOf({ onBreak: () => calls.push('onBreak') })?.(api)).toBe(true);
        expect(calls).toEqual(['split']);
    });

    it('gives up focus when Enter is pressed anywhere else, adding no paragraph', () => {
        const { api, calls } = recordingApi();

        expect(enterOf()?.(api)).toBe(true);
        expect(calls).toEqual(['split', 'blur']);
    });

    it('calls onBreak before it gives up focus', () => {
        const { api, calls } = recordingApi();

        enterOf({ onBreak: () => calls.push('onBreak') })?.(api);

        expect(calls).toEqual(['split', 'onBreak', 'blur']);
    });

    it("refuses an empty editor when required, with default words or the host's own", () => {
        const first = recordingApi({ empty: true });
        const second = recordingApi({ empty: true });

        enterOf({ required: true, onBreak: () => first.calls.push('onBreak') })?.(first.api);
        enterOf({ required: 'Write first.' })?.(second.api);

        expect(first.calls).toEqual(['split', 'announce Type something before submitting.']);
        expect(second.calls).toEqual(['split', 'announce Write first.']);
    });

    it('refuses an empty editor with the default words when required is an empty string', () => {
        const { api, calls } = recordingApi({ empty: true });

        enterOf({ required: '' })?.(api);

        expect(calls).toEqual(['split', 'announce Type something before submitting.']);
    });

    it('commits a required editor that has something in it', () => {
        const { api, calls } = recordingApi();

        enterOf({ required: true })?.(api);

        expect(calls).toEqual(['split', 'blur']);
    });

    it('describes its key for screen readers when there is something to submit', () => {
        expect(blurOnBreakPlugin({ onBreak: () => {} }).description).toBe('Press Enter to submit.');
    });

    it("adds what is required to the description, in default words or the host's own", () => {
        expect(blurOnBreakPlugin({ onBreak: () => {}, required: true }).description).toBe(
            'Press Enter to submit. Type something before submitting.',
        );
        expect(blurOnBreakPlugin({ onBreak: () => {}, required: 'Write first.' }).description).toBe(
            'Press Enter to submit. Write first.',
        );
    });

    it("says the host's own description in place of the English one, with what is required after it", () => {
        expect(blurOnBreakPlugin({ onBreak: () => {}, description: 'Enter sends it.' }).description).toBe(
            'Enter sends it.',
        );
        expect(
            blurOnBreakPlugin({ onBreak: () => {}, description: 'Enter sends it.', required: 'Write first.' })
                .description,
        ).toBe('Enter sends it. Write first.');
    });

    it('adds nothing to the description when required is false', () => {
        expect(blurOnBreakPlugin({ onBreak: () => {}, required: false }).description).toBe('Press Enter to submit.');
    });

    it('says nothing about submitting when there is no onBreak', () => {
        expect(blurOnBreakPlugin().description).toBeUndefined();
    });

    it('says nothing about a required field when there is no onBreak to submit to', () => {
        expect(blurOnBreakPlugin({ required: true }).description).toBeUndefined();
    });
});

describe('the list plugins', () => {
    it('toggle their list on the shortcuts other editors use', () => {
        const { api, calls } = recordingApi();
        const { hotkeys } = buildPluginRegistry([bulletListPlugin, numberedListPlugin]);

        hotkeys.get('Mod-Shift-8')?.[0]?.(api);
        hotkeys.get('Mod-Shift-7')?.[0]?.(api);

        expect(calls).toEqual(['lists.toggle bulletList', 'lists.toggle numberedList']);
    });

    it('share their item, so both can be mounted together', () => {
        const registry = buildPluginRegistry([bulletListPlugin, numberedListPlugin]);

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
            hotkeys[keys]?.run(api);
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
        const notePlugin: RtePlugin = definePlugin({
            id: 'note',
            content: defineContent({
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
            }),
        });
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
