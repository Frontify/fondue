/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListBullet, IconListNumbers, type FondueIcon } from '@frontify/fondue-icons';

import {
    ANY_LIST,
    type BlockDefinition,
    PARAGRAPH,
    type RteBlockNode,
    defineBlock,
    type RtePlugin,
    type StyleMap,
} from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './list.module.scss';

/**
 * Lists are the one place the document nests: a list holds items, and an item
 * holds blocks — a paragraph for its text, plus any list nested under it.
 *
 * Both list types share the item, so mounting either or both works. The item
 * allows `ANY_LIST` inside it, so whatever lists are mounted may nest — a list
 * a consumer wrote included.
 */
export type ListItemBlock<TContent extends RteBlockNode = RteBlockNode> = {
    type: 'listItem';
    children: TContent[];
};

export type BulletListBlock<TItem extends RteBlockNode = RteBlockNode> = {
    type: 'bulletList';
    children: TItem[];
};

export type NumberedListBlock<TItem extends RteBlockNode = RteBlockNode> = {
    type: 'numberedList';
    /** The first item's number, absent when it is 1. */
    start?: number;
    children: TItem[];
};

type NumberedListValue = { start: number | null };

/**
 * The item both list plugins declare. One object rather than one each: two
 * plugins may declare the same type only with the very same definition, so
 * mounting either list or both works, and neither can drift from the other.
 */
const listItem = defineBlock({
    // The paragraph comes first: it is what a new item is filled with.
    content: { blocks: [PARAGRAPH, ANY_LIST] },
    toHtml: () => ({ tag: 'li', attrs: { class: styles.item }, children: true }),
    parse: [{ tag: 'li' }],
});

/** The bulleted list, its marker per nesting level hanging off its class. */
const bulletList = defineBlock({
    content: { items: 'listItem' },
    toHtml: () => ({ tag: 'ul', attrs: { class: styles.bulletList }, children: true }),
    parse: [{ tag: 'ul' }],
});

/** How many digits of a list's first number the stylesheet's marker room fits. */
const MARKER_DIGITS = 2;

/** The custom property `list.module.scss` widens a numbered list by, once per digit past `MARKER_DIGITS`. */
const EXTRA_DIGITS_PROPERTY = '--rte-list-extra-digits';

/** The smallest `start` browsers honour: they read the attribute as a 32-bit integer so a list past it does not number as written. */
const MIN_START = -(2 ** 31);

/** The largest `start` browsers honour, for the same reason as `MIN_START`. */
const MAX_START = 2 ** 31 - 1;

/** The start to store, or `null` for 1 (what no start means) and for an integer browsers cannot draw or write back as given. */
const storedStart = (value: unknown): number | null => {
    if (
        typeof value !== 'number' ||
        !Number.isInteger(value) ||
        value < MIN_START ||
        value > MAX_START ||
        value === 1
    ) {
        return null;
    }
    return value;
};

/** The numbered list, which stores where its numbering starts only when that is not 1. */
const numberedList = defineBlock<NumberedListValue>({
    content: { items: 'listItem' },
    defaults: { start: null },
    toHtml: ({ start }) => {
        let first: string | undefined;
        let style: StyleMap | undefined;
        const stored = storedStart(start);
        if (stored !== null) {
            first = String(stored);
        }
        // A list that starts past the stylesheet's room widens for its first number only.
        if (first !== undefined && first.length > MARKER_DIGITS) {
            style = { [EXTRA_DIGITS_PROPERTY]: String(first.length - MARKER_DIGITS) };
        }
        return { tag: 'ol', attrs: { class: styles.numberedList, start: first, style }, children: true };
    },
    parse: [
        {
            tag: 'ol',
            value: (element) => {
                const start = storedStart(Number.parseInt(element.getAttribute('start') ?? '', 10));
                if (start === null) {
                    return {};
                }
                return { start };
            },
        },
    ],
});

type ListPluginParams = {
    id: string;
    type: 'bulletList' | 'numberedList';
    block: BlockDefinition;
    icon: FondueIcon;
    title: string;
    /** Words the `/` menu also finds it by. */
    keywords: readonly string[];
    /** What starts this list when typed at the beginning of a line. */
    markdown: readonly string[];
    /** The keyboard shortcut that toggles it, as other editors bind it. */
    hotkey: string;
};

/** Shared declaration of the two list plugins, which differ only in type, block, icon and shortcut. */
const listPlugin = ({
    id,
    type,
    block,
    icon: Icon,
    title,
    keywords,
    markdown,
    hotkey,
}: ListPluginParams): RtePlugin => ({
    id,
    blocks: {
        [type]: block,
        listItem,
    },
    // Active anywhere inside the list (the caret sits in a paragraph inside an
    // item); toggling wraps or unwraps.
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton active={isActive} title={title} onClick={() => toggle()}>
            <Icon size={16} />
        </ToolbarButton>
    ),
    hotkeys: { [hotkey]: (api) => api.lists.toggle(type) },
    inputRules: markdown.map((match) => ({ kind: 'list' as const, match, list: type })),
    commands: [
        {
            id: type === 'bulletList' ? 'bulleted-list' : 'numbered-list',
            label: title,
            icon: <Icon size={16} />,
            keywords,
            group: 'turnInto',
            isActive: (selection) => selection.blocks.some((block) => block.type === type),
            run: (api) => api.lists.toggle(type),
        },
    ],
});

/** A bulleted list (`ul`). Shares its item with `numberedListPlugin`. */
export const bulletListPlugin = (): RtePlugin =>
    listPlugin({
        id: 'bullet-list',
        type: 'bulletList',
        block: bulletList,
        icon: IconListBullet,
        title: 'Bulleted list',
        keywords: ['ul', 'unordered', 'bullets'],
        markdown: ['- ', '* '],
        hotkey: 'Mod-Shift-8',
    });

/** A numbered list (`ol`). Shares its item with `bulletListPlugin`. */
export const numberedListPlugin = (): RtePlugin =>
    listPlugin({
        id: 'numbered-list',
        type: 'numberedList',
        block: numberedList,
        icon: IconListNumbers,
        title: 'Numbered list',
        keywords: ['ol', 'ordered', 'numbers'],
        markdown: ['1. ', '1) '],
        hotkey: 'Mod-Shift-7',
    });
