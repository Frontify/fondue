/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { type EditorControlApi, type RteSelectionSnapshot } from './commands';
import {
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    definePlugin,
    type RteInputRule,
    type RtePlugin,
} from './plugin';
import { buildPluginRegistry } from './registry';

/**
 * The registry is the one place plugins are read: it gathers their
 * declarations, orders what has an order, and rejects what cannot work.
 */

const mark = (nesting?: number) => defineMark({ nesting, toHtml: () => ({ tag: 'span', children: true }), parse: [] });

const textBlock = () => defineBlock({ content: 'text', toHtml: () => ({ tag: 'p', children: true }), parse: [] });

const inline = () => defineInline({ toHtml: () => ({ tag: 'br' }), parse: [] });

const button = () => null;

const icon = () => null;

/** An api whose `marks.toggle` records the type it was given. */
const apiToggling = (toggled: string[]): EditorControlApi =>
    ({
        selection: { get: () => ({ blocks: [] }) },
        marks: { toggle: (type: string) => toggled.push(type) },
    }) as unknown as EditorControlApi;

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
});

describe('the marks of a registry', () => {
    it('are ordered by nesting, lower wrapping higher', () => {
        const registry = buildPluginRegistry([
            { id: 'inner', content: defineContent({ marks: { inner: mark(10) } }) },
            { id: 'outer', content: defineContent({ marks: { outer: mark(-10) } }) },
            { id: 'middle', content: defineContent({ marks: { middle: mark() } }) },
        ]);

        expect([...registry.marks.keys()]).toEqual(['outer', 'middle', 'inner']);
    });

    it('keep the order their plugins were passed in on a tie', () => {
        const registry = buildPluginRegistry([
            { id: 'b', content: defineContent({ marks: { b: mark(1) } }) },
            { id: 'a', content: defineContent({ marks: { a: mark(1) } }) },
            { id: 'c', content: defineContent({ marks: { c: mark(1) } }) },
        ]);

        expect([...registry.marks.keys()]).toEqual(['b', 'a', 'c']);
    });
});

describe('the typing rules of a registry', () => {
    it('put mark rules first, longest delimiter first, and keep everything else as declared', () => {
        const italic: RteInputRule = { kind: 'mark', key: 'italic', delimiter: '*' };
        const bold: RteInputRule = { kind: 'mark', key: 'bold', delimiter: '**' };
        const bullets: RteInputRule = { kind: 'list', match: '- ', list: 'bulletList' };
        const heading: RteInputRule = { kind: 'block', match: '# ', block: 'heading' };

        const registry = buildPluginRegistry([
            { id: 'bullets', inputRules: [bullets] },
            { id: 'italic', inputRules: [italic] },
            { id: 'heading', inputRules: [heading] },
            { id: 'bold', inputRules: [bold] },
        ]);

        expect(registry.inputRules).toEqual([bold, italic, bullets, heading]);
    });
});

describe('the paste handlers of a registry', () => {
    it('are collected in the order plugins were passed', () => {
        const first = () => false;
        const second = () => true;

        const registry = buildPluginRegistry([
            { id: 'a', onPaste: first },
            { id: 'none' },
            { id: 'b', onPaste: second },
        ]);

        expect(registry.pasteHandlers).toEqual([first, second]);
    });
});

describe('a type declared twice', () => {
    it('is an error when two plugins declare different blocks under it', () => {
        const plugins: RtePlugin[] = [
            { id: 'a', content: defineContent({ blocks: { callout: textBlock() } }) },
            { id: 'b', content: defineContent({ blocks: { callout: textBlock() } }) },
        ];

        expect(() => buildPluginRegistry(plugins)).toThrow(
            'Duplicate block type "callout": declared by plugin "a" and plugin "b".',
        );
    });

    it('is an error for marks and inlines alike', () => {
        expect(() =>
            buildPluginRegistry([
                { id: 'a', content: defineContent({ marks: { highlight: mark() } }) },
                { id: 'b', content: defineContent({ marks: { highlight: mark() } }) },
            ]),
        ).toThrow('Duplicate mark type "highlight": declared by plugin "a" and plugin "b".');
        expect(() =>
            buildPluginRegistry([
                { id: 'a', content: defineContent({ inlines: { embed: inline() } }) },
                { id: 'b', content: defineContent({ inlines: { embed: inline() } }) },
            ]),
        ).toThrow('Duplicate inline type "embed": declared by plugin "a" and plugin "b".');
    });

    it('is an error for block attributes too', () => {
        const attribute = () => ({ style: (value: string) => ({ 'text-align': value }), parse: () => null });

        expect(() =>
            buildPluginRegistry([
                { id: 'a', content: defineContent({ blockAttributes: { align: attribute() } }) },
                { id: 'b', content: defineContent({ blockAttributes: { align: attribute() } }) },
            ]),
        ).toThrow('Duplicate block attribute "align": declared by plugin "a" and plugin "b".');
    });

    it('is an error when a plugin replaces the paragraph the editor brings', () => {
        expect(() =>
            buildPluginRegistry([{ id: 'a', content: defineContent({ blocks: { paragraph: textBlock() } }) }]),
        ).toThrow('Duplicate block type "paragraph": built into the editor and declared by plugin "a".');
    });

    it('is fine when it is the very same definition, the way both list plugins share their item', () => {
        const shared = textBlock();

        const registry = buildPluginRegistry([
            { id: 'a', content: defineContent({ blocks: { item: shared } }) },
            { id: 'b', content: defineContent({ blocks: { item: shared } }) },
        ]);

        expect(registry.blocks.get('item')).toBe(shared);
    });
});

describe('a node value', () => {
    it('declares defaults typed by the value, for marks and inlines too', () => {
        const colour = defineMark<{ color: string }>({
            defaults: { color: 'inherit' },
            toHtml: ({ color }) => ({ tag: 'span', attrs: { style: { color } }, children: true }),
            parse: [],
        });
        const embed = defineInline<{ provider: string }>({
            defaults: { provider: 'figma' },
            toHtml: ({ provider }) => ({ tag: 'span', children: provider }),
            parse: [],
        });
        defineMark<{ color: string }>({
            // @ts-expect-error defaults must have the value's shape
            defaults: { colour: 'red' },
            toHtml: () => ({ tag: 'span', children: true }),
            parse: [],
        });

        // @ts-expect-error `tag` is the shorthand for `toHtml` and `parse`, so it excludes `toHtml`
        defineMark({ tag: 'b', toHtml: () => ({ tag: 'b', children: true }) });

        expect(colour.defaults).toEqual({ color: 'inherit' });
        expect(embed.defaults).toEqual({ provider: 'figma' });
    });
});

describe('the block commands of a registry', () => {
    const command = (id: string, group: 'turnInto' | 'insert' = 'turnInto') => ({
        id,
        label: id,
        group,
        run: () => {},
    });

    it('are collected in plugin order', () => {
        const registry = buildPluginRegistry([
            { id: 'a', commands: [command('one'), command('two', 'insert')] },
            { id: 'b' },
            { id: 'c', commands: [command('three')] },
        ]);

        expect(registry.commands.map(({ id }) => id)).toEqual(['one', 'two', 'three']);
    });

    it('may not share an id across plugins', () => {
        expect(() =>
            buildPluginRegistry([
                { id: 'a', commands: [command('same')] },
                { id: 'b', commands: [command('same')] },
            ]),
        ).toThrow('Duplicate command id "same": declared by plugin "a" and plugin "b".');
    });
});

describe('where a toolbar entry goes in the floating bar', () => {
    const placementOf = (plugin: RtePlugin, floating?: 'inline' | 'hidden') =>
        buildPluginRegistry([
            { ...plugin, toolbar: [{ toggles: onlyType(plugin), label: 'Label', render: button, floating }] },
        ]).toolbarItems[0]?.floating;
    const onlyType = (plugin: RtePlugin) => Object.keys({ ...plugin.content?.marks, ...plugin.content?.blocks })[0];

    it('is inline for a mark', () => {
        expect(placementOf({ id: 'bold', content: defineContent({ marks: { bold: mark() } }) })).toBe('inline');
    });

    it('is hidden for anything else, which reaches the bar through commands', () => {
        expect(placementOf({ id: 'quote', content: defineContent({ blocks: { quote: textBlock() } }) })).toBe('hidden');
        expect(
            buildPluginRegistry([
                {
                    id: 'mention',
                    content: defineContent({ inlines: { mention: inline() } }),
                    toolbar: [{ label: 'Label', render: button }],
                },
            ]).toolbarItems[0]?.floating,
        ).toBe('hidden');
        expect(
            buildPluginRegistry([{ id: 'nothing', toolbar: [{ label: 'Label', render: button }] }]).toolbarItems[0]
                ?.floating,
        ).toBe('hidden');
    });

    it('is what the entry says, over the default', () => {
        expect(placementOf({ id: 'bold', content: defineContent({ marks: { bold: mark() } }) }, 'hidden')).toBe(
            'hidden',
        );
        expect(placementOf({ id: 'quote', content: defineContent({ blocks: { quote: textBlock() } }) }, 'inline')).toBe(
            'inline',
        );
        expect(
            buildPluginRegistry([{ id: 'align', toolbar: [{ label: 'Label', render: button, floating: 'inline' }] }])
                .toolbarItems[0]?.floating,
        ).toBe('inline');
    });
});

describe('plugins sharing an id', () => {
    it('are reported, and their toolbar controls still keyed apart', () => {
        const registry = buildPluginRegistry([
            { id: 'same', toolbar: [{ label: 'Label', render: button }] },
            { id: 'other', toolbar: [{ label: 'Label', render: button }] },
            { id: 'same', toolbar: [{ label: 'Label', render: button }] },
        ]);

        expect(registry.duplicateIds).toEqual(['same']);
        expect(registry.toolbarItems.map(({ key }) => key)).toEqual(['same', 'other', 'same#1']);
    });
});

describe('a plugin id', () => {
    it('defaults to the only type its content declares', () => {
        expect(definePlugin({ content: defineContent({ marks: { bold: mark() } }) }).id).toBe('bold');
        expect(definePlugin({ content: defineContent({ inlines: { embed: inline() } }) }).id).toBe('embed');
    });

    it('is what was given, over the default', () => {
        expect(definePlugin({ id: 'strong', content: defineContent({ marks: { bold: mark() } }) }).id).toBe('strong');
    });

    it('is required when the content declares no type, or several, and lists them', () => {
        const several = 'A plugin that declares several types (a, b) needs an `id`.';

        expect(() => definePlugin({})).toThrow('A plugin that declares no type needs an `id`.');
        expect(() => definePlugin({ content: defineContent({ marks: { a: mark(), b: mark() } }) })).toThrow(several);
        expect(() =>
            definePlugin({ content: defineContent({ marks: { a: mark() }, blocks: { b: textBlock() } }) }),
        ).toThrow(several);
    });

    it('cannot be empty', () => {
        expect(() => definePlugin({ id: '', content: defineContent({ marks: { bold: mark() } }) })).toThrow(
            'A plugin `id` cannot be empty.',
        );
    });

    it('rejects a toggled type that only exists on Object.prototype', () => {
        expect(() =>
            buildPluginRegistry([
                definePlugin({ id: 'odd', toolbar: [{ icon, label: 'Odd', toggles: 'constructor' }] }),
            ]),
        ).toThrow('Plugin "odd" toggles "constructor", which its content does not declare.');
    });

    it('is required of a plain object in the plugins list, which is not read as content', () => {
        // @ts-expect-error an untyped caller can leave out the `id`
        expect(() => buildPluginRegistry([{ toolbar: [{ icon }] }])).toThrow('Plugin has no id: no type declared');
    });
});

describe('the type a toolbar entry toggles', () => {
    const content = defineContent({ marks: { bold: mark() }, blocks: { quote: textBlock() } });

    it('defaults to the only type the content declares', () => {
        const registry = buildPluginRegistry([
            { id: 'bold', content: defineContent({ marks: { bold: mark() } }), toolbar: [{ icon, label: 'Bold' }] },
        ]);

        expect(registry.toolbarItems[0]?.own).toEqual({ kind: 'mark', type: 'bold' });
    });

    it('is the one named, among several', () => {
        const registry = buildPluginRegistry([
            {
                id: 'both',
                content,
                toolbar: [
                    { toggles: 'quote', icon, label: 'Quote' },
                    { toggles: 'bold', icon, label: 'Bold' },
                ],
            },
        ]);

        expect(registry.toolbarItems.map(({ own }) => own)).toEqual([
            { kind: 'textBlock', type: 'quote' },
            { kind: 'mark', type: 'bold' },
        ]);
        expect(registry.toolbarItems.map(({ key }) => key)).toEqual(['both', 'both/1']);
    });

    it('is labelled by the entry', () => {
        const registry = buildPluginRegistry([
            {
                id: 'both',
                content,
                toolbar: [
                    { toggles: 'quote', icon, label: 'Quote' },
                    { toggles: 'bold', icon, label: 'Strong' },
                ],
            },
        ]);

        expect(registry.toolbarItems.map(({ label }) => label)).toEqual(['Quote', 'Strong']);
    });

    it('needs a label, which is the control accessible name', () => {
        expect(() =>
            buildPluginRegistry([
                // @ts-expect-error -- an entry without a `label` fails typecheck, and still throws for an untyped caller.
                { id: 'bold', content: defineContent({ marks: { bold: mark() } }), toolbar: [{ icon }] },
            ]),
        ).toThrow('Plugin "bold" has a toolbar entry with no `label`.');
    });

    it('needs a label that is not empty', () => {
        expect(() =>
            buildPluginRegistry([
                { id: 'bold', content: defineContent({ marks: { bold: mark() } }), toolbar: [{ icon, label: '' }] },
            ]),
        ).toThrow('Plugin "bold" has a toolbar entry with no `label`.');
    });

    it('is an error when the content does not declare it', () => {
        expect(() =>
            buildPluginRegistry([{ id: 'both', content, toolbar: [{ toggles: 'italic', icon, label: 'Italic' }] }]),
        ).toThrow('Plugin "both" toggles "italic", which its content does not declare.');
    });

    it('needs an icon when the entry has no `render`', () => {
        expect(() =>
            buildPluginRegistry([
                // @ts-expect-error -- an entry with neither `icon` nor `render` fails typecheck, and still throws for an untyped caller.
                { id: 'bold', content: defineContent({ marks: { bold: mark() } }), toolbar: [{ label: 'Bold' }] },
            ]),
        ).toThrow('Plugin "bold" has a toolbar entry with no `render` and no `icon`.');
    });

    it('needs a toggleable type when the entry has an icon but no `render`', () => {
        expect(() => buildPluginRegistry([{ id: 'nothing', toolbar: [{ icon, label: 'Nothing' }] }])).toThrow(
            'Plugin "nothing" has a toolbar entry with nothing to toggle: name a mark, list, text block, void block or inline with `toggles`.',
        );
    });
});

describe('the hotkeys of a registry', () => {
    const boldContent = defineContent({ marks: { bold: mark() } });

    it('include the shortcut of a toolbar entry, as a toggle of what it toggles', () => {
        const toggled: string[] = [];
        const registry = buildPluginRegistry([
            { id: 'bold', content: boldContent, toolbar: [{ icon, label: 'Bold', shortcut: 'Mod-b' }] },
        ]);

        registry.hotkeys.get('Mod-b')?.[0]?.(apiToggling(toggled));

        expect(toggled).toEqual(['bold']);
    });

    it('are an error for a shortcut on an entry with nothing to toggle', () => {
        expect(() =>
            buildPluginRegistry([
                { id: 'custom', toolbar: [{ label: 'Custom', render: () => null, shortcut: 'Mod-b' }] },
            ]),
        ).toThrow(
            'Plugin "custom" names shortcut "Mod-b" with nothing to toggle: name a mark, list, text block, void block or inline with `toggles`.',
        );
    });

    it('leave a key the plugin binds itself to the plugin, the entry only showing it', () => {
        const own = vi.fn();
        const registry = buildPluginRegistry([
            {
                id: 'bold',
                content: boldContent,
                toolbar: [{ icon, label: 'Bold', shortcut: 'Mod-b' }],
                hotkeys: { 'Mod-b': own },
            },
        ]);

        expect(registry.hotkeys.get('Mod-b')).toEqual([own]);
        expect(registry.toolbarItems[0]?.shortcut).toBe('Mod-b');
    });
});

describe('the menu commands of a toolbar entry', () => {
    const content = defineContent({ blocks: { quote: textBlock() } });

    it("become block commands, ahead of the plugin's own", () => {
        const explicit = { id: 'explicit', label: 'Explicit', group: 'insert' as const, run: () => {} };
        const registry = buildPluginRegistry([
            {
                id: 'quote',
                content,
                toolbar: [{ icon, label: 'Quote', menu: { keywords: ['cite'] } }],
                commands: [explicit],
            },
        ]);

        expect(registry.commands.map(({ id }) => id)).toEqual(['quote', 'explicit']);
        expect(registry.commands[0]).toMatchObject({ label: 'Quote', group: 'turnInto', keywords: ['cite'] });
    });

    it('turn a text block into the type, and know when the selection is in it', () => {
        const types: string[] = [];
        const registry = buildPluginRegistry([{ id: 'quote', content, toolbar: [{ icon, label: 'Quote', menu: {} }] }]);
        const command = registry.commands[0];

        command?.run({ blocks: { setType: (type: string) => types.push(type) } } as unknown as EditorControlApi);

        expect(types).toEqual(['quote']);
        expect(command?.isActive?.({ block: { type: 'quote' } } as RteSelectionSnapshot)).toBe(true);
        expect(command?.isActive?.({ block: { type: 'paragraph' } } as RteSelectionSnapshot)).toBe(false);
    });

    it('may not share an id with a command another plugin declares', () => {
        expect(() =>
            buildPluginRegistry([
                { id: 'quote', content, toolbar: [{ icon, label: 'Quote', menu: {} }] },
                { id: 'other', commands: [{ id: 'quote', label: 'Quote', group: 'insert', run: () => {} }] },
            ]),
        ).toThrow('Duplicate command id "quote": declared by plugin "quote" and plugin "other".');
    });

    it('are an error for a type that is neither a block nor an inline to insert', () => {
        expect(() =>
            buildPluginRegistry([
                {
                    id: 'bold',
                    content: defineContent({ marks: { bold: mark() } }),
                    toolbar: [{ icon, label: 'Quote', menu: {} }],
                },
            ]),
        ).toThrow('Plugin "bold" offers a `menu`');
    });
});

describe('a delimiter typing rule', () => {
    it("becomes a mark rule on the plugin's only mark", () => {
        const registry = buildPluginRegistry([
            { id: 'bold', content: defineContent({ marks: { bold: mark() } }), inputRules: [{ delimiter: '**' }] },
        ]);

        expect(registry.inputRules).toEqual([{ kind: 'mark', key: 'bold', delimiter: '**' }]);
    });

    it('is an error for a plugin without exactly one mark', () => {
        expect(() => buildPluginRegistry([{ id: 'none', inputRules: [{ delimiter: '**' }] }])).toThrow(
            'Plugin "none" has a delimiter rule',
        );
    });
});

describe('the edit views of a registry', () => {
    const view = () => null;

    it('are collected by node type', () => {
        const registry = buildPluginRegistry([
            { id: 'bold', content: defineContent({ marks: { bold: mark() } }), edit: { bold: view } },
        ]);

        expect(registry.edits.get('bold')).toBe(view);
    });

    it("may not name a type the plugin's content does not declare", () => {
        expect(() =>
            buildPluginRegistry([
                { id: 'bold', content: defineContent({ marks: { bold: mark() } }), edit: { italic: view } },
            ]),
        ).toThrow('Plugin "bold" has an edit view for "italic", which its content does not declare.');
    });
});

describe('bare content in a registry', () => {
    it('contributes its types, class and properties, and is no plugin', () => {
        const registry = buildPluginRegistry([
            defineContent({
                marks: { bold: mark() },
                contentClassName: 'columns',
                contentProperties: { '--rte-columns': '3' },
            }),
            { id: 'quote', content: defineContent({ blocks: { quote: textBlock() } }) },
        ]);

        expect([...registry.marks.keys()]).toEqual(['bold']);
        expect(registry.blocks.has('quote')).toBe(true);
        expect(registry.contentClassNames).toEqual(['columns']);
        expect(registry.contentProperties).toEqual({ '--rte-columns': '3' });
        expect(registry.ids).toEqual(['quote']);
    });

    it('is named by its first type when it clashes with another', () => {
        expect(() =>
            buildPluginRegistry([
                defineContent({ marks: { bold: mark() } }),
                { id: 'strong', content: defineContent({ marks: { bold: mark() } }) },
            ]),
        ).toThrow('Duplicate mark type "bold": declared by plugin "bold" and plugin "strong".');
    });
});
