/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Driven through the package's public API only: the stored document format is
// what a host's database holds, so a change to it must fail here first.
import {
    blurOnBreakPlugin,
    columnBreakPlugin,
    defaultPlugins,
    mentionPlugin,
    RichTextEditor,
    type RteBlock,
    type RteDocument,
    type RtePlugin,
    typographyPlugin,
} from '../index';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const plugins: readonly RtePlugin[] = [
    ...defaultPlugins,
    mentionPlugin({ items: [] }),
    columnBreakPlugin(),
    blurOnBreakPlugin,
    typographyPlugin,
];

/** Added by the harness, so a paste has somewhere to land and the fixtures stay pure. */
const sacrificial: RteBlock = { type: 'paragraph', children: [{ text: 'edit here' }] };

const goldens = import.meta.glob<RteDocument>('./goldens/*.json', { eager: true, import: 'default' });
const fixtures = Object.entries(goldens).map(([path, doc]) => ({
    name: path.replace(/^.*\/(.*)\.json$/, '$1'),
    doc,
}));

const teardown: (() => void)[] = [];

const mount = (render: (onChange: (doc: RteDocument) => void) => ReactNode) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onChange = vi.fn<(doc: RteDocument) => void>();

    act(() => {
        root.render(render(onChange));
    });
    teardown.push(() => {
        act(() => {
            root.unmount();
        });
        container.remove();
    });

    return {
        container,
        /** What the host would now be holding, or null if it was never told. */
        stored: (): RteDocument | null => onChange.mock.lastCall?.[0] ?? null,
        /** The document the host was handed by the nth change. */
        storedAt: (index: number): RteDocument | null => onChange.mock.calls[index]?.[0] ?? null,
        changes: (): number => onChange.mock.calls.length,
    };
};

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
    vi.restoreAllMocks();
});

/** A paste of one paragraph, dispatched on the editable element with both flavours a browser sends. */
const paste = (container: HTMLElement, text: string): void => {
    const editable = container.querySelector('[contenteditable]');
    if (!editable) {
        throw new Error('the editor has no editable element');
    }
    const data = new DataTransfer();
    data.setData('text/html', `<p>${text}</p>`);
    data.setData('text/plain', text);
    act(() => {
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
    });
};

/** Mounts the blocks behind the sacrificial paragraph and edits that paragraph once. */
const editedCopyOf = (blocks: RteBlock[]) => {
    const editor = mount((onChange) => (
        <RichTextEditor
            // A copy, so an unknown node handed back as the object it came in as is still compared against the original.
            value={{ version: 1, blocks: [sacrificial, ...structuredClone(blocks)] }}
            onChange={onChange}
            plugins={plugins}
        />
    ));
    paste(editor.container, 'typed');
    // Proves the edit landed in the sacrificial paragraph, so a diff after it is a format change.
    expect(editor.changes()).toBe(1);
    expect(editor.stored()?.blocks[0]).toStrictEqual({ type: 'paragraph', children: [{ text: 'typededit here' }] });
    return editor;
};

const expectEditable = (container: HTMLElement): void => {
    expect(container.querySelector('[contenteditable]')).not.toBeNull();
};

const declaresContent = (plugin: RtePlugin): boolean =>
    [plugin.content?.blocks, plugin.content?.marks, plugin.content?.inlines, plugin.content?.blockAttributes].some(
        (declared) => declared !== undefined && Object.keys(declared).length > 0,
    );

describe('the stored document format: golden fixtures', () => {
    it('has one fixture per plugin that declares content, and no others', () => {
        const expected = plugins
            .filter((plugin) => declaresContent(plugin))
            .map((plugin) => plugin.id)
            .sort();

        expect(fixtures.map(({ name }) => name).sort()).toStrictEqual(expected);
    });

    it.each(fixtures)('loads and round-trips $name unchanged', ({ doc }) => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const { container, stored } = editedCopyOf(doc.blocks);

        expectEditable(container);
        expect(container.querySelector('[data-rte-unknown]')).toBeNull();
        expect(warn).not.toHaveBeenCalled();
        expect(stored()).toStrictEqual({ version: 1, blocks: [expect.anything(), ...doc.blocks] });
    });

    it('hands out the same block objects for blocks an edit did not touch', () => {
        const blocks = fixtures.flatMap(({ doc }) => doc.blocks);
        const { container, stored, storedAt } = editedCopyOf(blocks);
        paste(container, 'typed again');

        const first = storedAt(0);
        const second = stored();
        expect(second).not.toBe(first);
        expect(second?.blocks.slice(1)).toHaveLength(blocks.length);
        for (const [index, block] of (second?.blocks ?? []).entries()) {
            if (index > 0) {
                expect(block).toBe(first?.blocks[index]);
            }
        }
    });
});

// --- Seeded random documents ---

/** A small seeded generator, so a failing case is reproduced by its seed alone. */
const mulberry32 = (seed: number): (() => number) => {
    let state = seed;
    return () => {
        state = (state + 0x6d_2b_79_f5) | 0;
        let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
        mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
        return ((mixed ^ (mixed >>> 14)) >>> 0) / 4_294_967_296;
    };
};

type Json = Record<string, unknown>;

// Non-ASCII and unusual whitespace too: the stored text must come back byte for byte.
const WORDS = [
    'alpha',
    'beta',
    'gamma',
    'delta ',
    ' epsilon',
    'zeta eta',
    'x',
    'naïve',
    '👩‍💻 🇨🇭',
    'a\u00A0b',
    'two  spaces',
];
const FLAG_MARKS = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript'];
const COLORS = ['#ff0000', '#f00', 'rgb(1, 2, 3)', 'red'];
const HREFS = ['https://example.com', 'mailto:a@example.com', '/relative'];
const STYLES = [
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'custom1',
    'custom2',
    'custom3',
    'imageTitle',
    'imageCaption',
];
const ALIGNS = ['left', 'center', 'right', 'justify'];
const KINDS = ['user', 'group', 'all'];

// Mark exclusions: the plugin definitions declare none that touch stored marks
// (`excludesInputRules` on code only affects typing), so any subset is valid.
const generateDocument = (seed: number): RteBlock[] => {
    const random = mulberry32(seed);
    const chance = (probability: number): boolean => random() < probability;
    const integer = (limit: number): number => Math.floor(random() * limit);
    const pick = <TItem,>(items: readonly TItem[]): TItem => items[integer(items.length)] as TItem;

    const run = (): Json => {
        const text: Json = { text: pick(WORDS) };
        for (const mark of FLAG_MARKS) {
            if (chance(0.25)) {
                text[mark] = true;
            }
        }
        if (chance(0.15)) {
            text.fontColor = { color: pick(COLORS) };
        }
        if (chance(0.15)) {
            const link: Json = { href: pick(HREFS) };
            if (chance(0.5)) {
                link.openInNewTab = true;
            }
            text.link = link;
        }
        if (chance(0.1)) {
            text.glow = true;
            if (chance(0.5)) {
                text.glow = { hue: integer(360) };
            }
        }
        return text;
    };

    const mention = (): Json => {
        const id = `u${integer(100)}`;
        const value: Json = { type: 'mention', id, username: id, name: `Name ${id}` };
        if (chance(0.5)) {
            value.kind = pick(KINDS);
        }
        return value;
    };

    const keysOf = (child: Json): string =>
        JSON.stringify(
            Object.entries(child)
                .filter(([key]) => key !== 'text')
                .sort(([left], [right]) => left.localeCompare(right)),
        );

    // Canonical form: adjacent runs with equal marks are one run.
    const inlines = (): Json[] => {
        const children: Json[] = [];
        for (let count = integer(5); count > 0; count--) {
            const roll = random();
            if (roll < 0.65) {
                const next = run();
                const last = children[children.length - 1];
                if (last?.text !== undefined && keysOf(last) === keysOf(next)) {
                    last.text = `${last.text as string}${next.text as string}`;
                } else {
                    children.push(next);
                }
            } else if (roll < 0.8) {
                children.push({ type: 'break' });
            } else if (roll < 0.95) {
                children.push(mention());
            } else {
                children.push({ type: 'sparkle', size: integer(10) });
            }
        }
        return children;
    };

    const textBlock = (type: 'paragraph' | 'textStyle' | 'quote'): Json => {
        const block: Json = { type };
        if (type === 'textStyle') {
            block.style = pick(STYLES);
        }
        if (chance(0.3)) {
            block.align = pick(ALIGNS);
        }
        block.children = inlines();
        return block;
    };

    // Wherever blocks go, one no plugin knows may stand in for one.
    const unknownBlock = (): Json => ({
        type: 'sidebar',
        children: [{ text: `unknown ${integer(10)}` }],
        tone: pick(WORDS),
    });

    const list = (depth: number): Json => {
        const type = pick(['bulletList', 'numberedList', 'checkList']);
        const itemType = type === 'checkList' ? 'checkItem' : 'listItem';
        const items: Json[] = [];
        for (let count = 1 + integer(3); count > 0; count--) {
            const item: Json = { type: itemType };
            if (itemType === 'checkItem') {
                item.checked = chance(0.5);
            }
            // Any mix of paragraphs and nested lists, a list first included: the item's content allows it.
            const children: Json[] = [];
            for (let length = 1 + integer(3); length > 0; length--) {
                if (depth < 3 && chance(0.4)) {
                    children.push(list(depth + 1));
                } else if (chance(0.1)) {
                    children.push(unknownBlock());
                } else {
                    children.push(textBlock('paragraph'));
                }
            }
            item.children = children;
            items.push(item);
        }
        return { type, children: items };
    };

    const blocks: Json[] = [];
    for (let count = 1 + integer(6); count > 0; count--) {
        const roll = random();
        if (roll < 0.35) {
            blocks.push(textBlock('paragraph'));
        } else if (roll < 0.5) {
            blocks.push(textBlock('textStyle'));
        } else if (roll < 0.6) {
            blocks.push(textBlock('quote'));
        } else if (roll < 0.85) {
            blocks.push(list(1));
        } else if (roll < 0.95) {
            blocks.push({ type: 'columnBreak' });
        } else {
            blocks.push(unknownBlock());
        }
    }
    return blocks as unknown as RteBlock[];
};

const SEED_COUNT = 500;
const seeds = Array.from({ length: SEED_COUNT }, (_, index) => ({ seed: index + 1 }));

describe('the stored document format: seeded random round trip', () => {
    it.each(seeds)('round-trips the document of seed $seed unchanged', ({ seed }) => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        const blocks = generateDocument(seed);
        const { container, stored } = editedCopyOf(blocks);

        expectEditable(container);
        expect(stored()).toStrictEqual({ version: 1, blocks: [expect.anything(), ...blocks] });
    });
});
