/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListBullet, IconListNumbers, type FondueIcon } from '@frontify/fondue-icons';

import {
    ANY_LIST,
    defineBlock,
    defineContent,
    definePlugin,
    lookProperties,
    PARAGRAPH,
    type RteBlockNode,
    type RteContent,
    type RteLabel,
    type RtePlugin,
    type StyleMap,
} from '#/core';
import { translatedLabel } from '#/ui/translation';

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
 * How a bulleted list looks at one nesting level. Each value is any CSS value, a guideline variable
 * (`var(--f-theme-settings-list-bullet1-color)`) included. A field left out keeps Fondue's look.
 */
export type BulletLevelLook = {
    /**
     * A `list-style-type`, such as `square`, or a quoted string, such as `'–'`, drawn as written. A string gets no
     * room of its own, so set `gap` for room before the item text
     */
    marker?: string;
    /**
     * The marker's colour, which is the item text's colour without one
     */
    color?: string;
    /**
     * The marker's font size, which scales the bullet
     */
    size?: string;
    /**
     * The room before the item text, where the marker hangs
     */
    indent?: string;
    /**
     * The room between the marker and the item text, added to the indent so the text starts at the indent plus the gap
     */
    gap?: string;
};

/**
 * How a numbered list looks at one nesting level. A number keeps the size of the item text, which its room is made for.
 */
export type NumberedLevelLook = Omit<BulletLevelLook, 'size'>;

/**
 * A look for each of the first three nesting levels, outermost first. The three repeat deeper down: the fourth level looks like the first.
 */
export type ListLook<TLevel> = readonly [first?: TLevel, second?: TLevel, third?: TLevel];

/**
 * How a bulleted list looks at each of its first three nesting levels
 */
export type BulletListLook = ListLook<BulletLevelLook>;

/**
 * How a numbered list looks at each of its first three nesting levels
 */
export type NumberedListLook = ListLook<NumberedLevelLook>;

/**
 * The name each field's variable ends in. `list.module.scss` reads the same names.
 */
const NUMBERED_LOOK_FIELDS = {
    marker: 'marker',
    color: 'color',
    indent: 'indent',
    gap: 'gap',
} as const satisfies Record<keyof NumberedLevelLook, string>;

const BULLET_LOOK_FIELDS = {
    ...NUMBERED_LOOK_FIELDS,
    size: 'size',
} as const satisfies Record<keyof BulletLevelLook, string>;

type ListType = 'bulletList' | 'numberedList';

/**
 * The custom properties of a list's look, `--rte-<list type><level>-<field>`, such as `--rte-bullet-list2-color`
 */
const listLookProperties = <TLevel extends Partial<Record<string, string>>>(
    type: ListType,
    look: ListLook<TLevel>,
    fields: Readonly<Record<keyof TLevel & string, string>>,
): Record<string, string> => {
    const properties: Record<string, string> = {};
    for (const [index, level] of look.entries()) {
        if (level !== undefined) {
            Object.assign(properties, lookProperties(`${type}${index + 1}`, level, fields));
        }
    }
    return properties;
};

export type BulletListPluginOptions = {
    /**
     * How the list looks at its first three nesting levels, outermost first. A level or a field left out keeps
     * Fondue's look. A value that is empty or can end its CSS declaration early throws an error naming the level.
     * @default []
     */
    look?: BulletListLook;
};

export type NumberedListPluginOptions = {
    /**
     * How the list looks at its first three nesting levels, outermost first. A level or a field left out keeps
     * Fondue's look. A value that is empty or can end its CSS declaration early throws an error naming the level.
     * @default []
     */
    look?: NumberedListLook;
};

/**
 * A bulleted list, written as `<ul>`, in the host's look. Shares its item with `numberedListContent`. Pass the same
 * `look` as `bulletListPlugin`, so a renderer given only content draws them.
 */
export const bulletListContent = ({ look = [] }: BulletListPluginOptions = {}): RteContent =>
    defineContent({
        blocks: { bulletList, listItem },
        contentProperties: listLookProperties('bulletList', look, BULLET_LOOK_FIELDS),
    });

/**
 * A numbered list, written as `<ol>`, starting at any number, in the host's look. Shares its item with
 * `bulletListContent`. Pass the same `look` as `numberedListPlugin`, so a renderer given only content draws them.
 */
export const numberedListContent = ({ look = [] }: NumberedListPluginOptions = {}): RteContent =>
    defineContent({
        blocks: { numberedList, listItem },
        contentProperties: listLookProperties('numberedList', look, NUMBERED_LOOK_FIELDS),
    });

type ListPluginParams = {
    id: string;
    content: RteContent;
    type: ListType;
    icon: FondueIcon;
    label: RteLabel;
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
    });

/**
 * A bulleted list with the `Mod-Shift-8` shortcut, and `- ` or `* ` while typing
 */
export const bulletListPlugin = (options: BulletListPluginOptions = {}): RtePlugin =>
    listPlugin({
        id: 'bullet-list',
        content: bulletListContent(options),
        type: 'bulletList',
        icon: IconListBullet,
        label: translatedLabel('RichTextEditor_bulletedList'),
        keywords: ['ul', 'unordered', 'bullets'],
        markdown: ['- ', '* '],
        shortcut: 'Mod-Shift-8',
    });

/**
 * A numbered list with the `Mod-Shift-7` shortcut, and `1. ` or `1) ` while typing
 */
export const numberedListPlugin = (options: NumberedListPluginOptions = {}): RtePlugin =>
    listPlugin({
        id: 'numbered-list',
        content: numberedListContent(options),
        type: 'numberedList',
        icon: IconListNumbers,
        label: translatedLabel('RichTextEditor_numberedList'),
        keywords: ['ol', 'ordered', 'numbers'],
        markdown: ['1. ', '1) '],
        shortcut: 'Mod-Shift-7',
    });
