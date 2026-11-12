/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListBullet, IconListNumbers, type FondueIcon } from '@frontify/fondue-icons';

import {
    ANY_LIST,
    defineBlock,
    defineContent,
    definePlugin,
    PARAGRAPH,
    type RteBlockNode,
    type RteContent,
    type StyleMap,
} from '#/core';

import { PASTED_LISTS } from '../shared/paste/pastedLists';

import styles from './list.module.scss';

/**
 * A list item, holding a paragraph and any lists nested under it
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
    /**
     * The first item's number, absent when it is 1
     */
    start?: number;
    children: TItem[];
};

type NumberedListValue = { start: number | null };

// One shared object: two plugins may declare the same type only with the very same definition.
const listItem = defineBlock({
    // The paragraph comes first: it is what a new item is filled with.
    content: { blocks: [PARAGRAPH, ANY_LIST] },
    toHtml: () => ({ tag: 'li', attrs: { class: styles.item }, children: true }),
    parse: [{ tag: 'li' }],
});

/**
 * The bulleted list, its marker per nesting level hanging off its class
 */
const bulletList = defineBlock({
    content: { items: 'listItem' },
    toHtml: () => ({ tag: 'ul', attrs: { class: styles.bulletList }, children: true }),
    parse: [{ tag: 'ul' }],
});

/**
 * How many digits of a list's first number the stylesheet's marker room fits
 */
const MARKER_DIGITS = 2;

/**
 * The custom property `list.module.scss` widens a numbered list by, once per digit past `MARKER_DIGITS`
 */
const EXTRA_DIGITS_PROPERTY = '--rte-list-extra-digits';

/**
 * The smallest `start` browsers honour: they read the attribute as a 32-bit integer so a list past it does not number as written
 */
const MIN_START = -(2 ** 31);

/**
 * The largest `start` browsers honour, for the same reason as `MIN_START`
 */
const MAX_START = 2 ** 31 - 1;

/**
 * The start to store, or `null` for 1 (what no start means) and for an integer browsers cannot draw or write back as given
 */
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

/**
 * The numbered list, which stores where its numbering starts only when that is not 1
 */
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

/**
 * A bulleted list, written as `<ul>`. Shares its item with `numberedListContent`.
 */
export const bulletListContent = defineContent({ blocks: { bulletList, listItem } });

/**
 * A numbered list, written as `<ol>`, starting at any number. Shares its item with `bulletListContent`.
 */
export const numberedListContent = defineContent({ blocks: { numberedList, listItem } });

type ListPluginParams = {
    id: string;
    content: RteContent;
    type: 'bulletList' | 'numberedList';
    icon: FondueIcon;
    label: string;
    /**
     * Extra words the `/` menu matches this entry by
     */
    keywords: readonly string[];
    /**
     * Text that starts this list when typed at the beginning of a line
     */
    markdown: readonly string[];
    /**
     * The keyboard shortcut that toggles the list
     */
    shortcut: string;
};

/**
 * Declares a list plugin, where the two lists differ only in content, icon, label, shortcut and typing rule
 */
const listPlugin = ({ id, content, type, icon, label, keywords, markdown, shortcut }: ListPluginParams) =>
    definePlugin({
        id,
        content,
        // Active anywhere inside the list (the caret sits in a paragraph inside an
        // item); toggling wraps or unwraps.
        toolbarGroup: 'lists',
        toolbar: [{ toggles: type, label, icon, shortcut, menu: { keywords } }],
        inputRules: markdown.map((match) => ({ kind: 'list' as const, match, list: type })),
        pasteTransforms: [PASTED_LISTS],
    });

/**
 * A bulleted list with the `Mod-Shift-8` shortcut, and `- ` or `* ` while typing
 */
export const bulletListPlugin = /* @__PURE__ */ listPlugin({
    id: 'bullet-list',
    content: bulletListContent,
    type: 'bulletList',
    icon: IconListBullet,
    label: 'Bulleted list',
    keywords: ['ul', 'unordered', 'bullets'],
    markdown: ['- ', '* '],
    shortcut: 'Mod-Shift-8',
});

/**
 * A numbered list with the `Mod-Shift-7` shortcut, and `1. ` or `1) ` while typing
 */
export const numberedListPlugin = /* @__PURE__ */ listPlugin({
    id: 'numbered-list',
    content: numberedListContent,
    type: 'numberedList',
    icon: IconListNumbers,
    label: 'Numbered list',
    keywords: ['ol', 'ordered', 'numbers'],
    markdown: ['1. ', '1) '],
    shortcut: 'Mod-Shift-7',
});
