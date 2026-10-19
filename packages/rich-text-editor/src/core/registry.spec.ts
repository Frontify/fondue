/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { defineBlock, defineInline, defineMark, type RteInputRule, type RtePlugin } from './plugin';
import { buildPluginRegistry } from './registry';

/**
 * The registry is the one place plugins are read: it gathers their
 * declarations, orders what has an order, and rejects what cannot work.
 */

const mark = (nesting?: number) => defineMark({ nesting, toHtml: () => ({ tag: 'span', children: true }), parse: [] });

const textBlock = () => defineBlock({ content: 'text', toHtml: () => ({ tag: 'p', children: true }), parse: [] });

const inline = () => defineInline({ toHtml: () => ({ tag: 'br' }), parse: [] });

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
});

describe('the marks of a registry', () => {
    it('are ordered by nesting, lower wrapping higher', () => {
        const registry = buildPluginRegistry([
            { id: 'inner', marks: { inner: mark(10) } },
            { id: 'outer', marks: { outer: mark(-10) } },
            { id: 'middle', marks: { middle: mark() } },
        ]);

        expect([...registry.marks.keys()]).toEqual(['outer', 'middle', 'inner']);
    });

    it('keep the order their plugins were passed in on a tie', () => {
        const registry = buildPluginRegistry([
            { id: 'b', marks: { b: mark(1) } },
            { id: 'a', marks: { a: mark(1) } },
            { id: 'c', marks: { c: mark(1) } },
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
            { id: 'a', blocks: { callout: textBlock() } },
            { id: 'b', blocks: { callout: textBlock() } },
        ];

        expect(() => buildPluginRegistry(plugins)).toThrow(
            'Duplicate block type "callout": declared by plugin "a" and plugin "b".',
        );
    });

    it('is an error for marks and inlines alike', () => {
        expect(() =>
            buildPluginRegistry([
                { id: 'a', marks: { highlight: mark() } },
                { id: 'b', marks: { highlight: mark() } },
            ]),
        ).toThrow('Duplicate mark type "highlight": declared by plugin "a" and plugin "b".');
        expect(() =>
            buildPluginRegistry([
                { id: 'a', inlines: { embed: inline() } },
                { id: 'b', inlines: { embed: inline() } },
            ]),
        ).toThrow('Duplicate inline type "embed": declared by plugin "a" and plugin "b".');
    });

    it('is an error when a plugin replaces the paragraph the editor brings', () => {
        expect(() => buildPluginRegistry([{ id: 'a', blocks: { paragraph: textBlock() } }])).toThrow(
            'Duplicate block type "paragraph": built into the editor and declared by plugin "a".',
        );
    });

    it('is fine when it is the very same definition, the way both list plugins share their item', () => {
        const shared = textBlock();

        const registry = buildPluginRegistry([
            { id: 'a', blocks: { item: shared } },
            { id: 'b', blocks: { item: shared } },
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

describe('where a toolbar item goes in the floating bar', () => {
    const button = () => null;
    const placementOf = (plugin: RtePlugin) =>
        buildPluginRegistry([{ ...plugin, toolbarItem: button }]).toolbarItems[0]?.floating;

    it('is inline for a mark', () => {
        expect(placementOf({ id: 'bold', marks: { bold: mark() } })).toBe('inline');
    });

    it('is hidden for anything else, which reaches the bar through commands', () => {
        expect(placementOf({ id: 'quote', blocks: { quote: textBlock() } })).toBe('hidden');
        expect(placementOf({ id: 'mention', inlines: { mention: inline() } })).toBe('hidden');
        expect(placementOf({ id: 'nothing' })).toBe('hidden');
    });

    it('is what the plugin says, over the default', () => {
        expect(placementOf({ id: 'bold', marks: { bold: mark() }, floatingToolbar: 'hidden' })).toBe('hidden');
        expect(placementOf({ id: 'align', floatingToolbar: 'inline' })).toBe('inline');
        expect(placementOf({ id: 'quote', blocks: { quote: textBlock() }, floatingToolbar: 'inline' })).toBe('inline');
    });
});
