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
} from '#/core';

import styles from './list.module.scss';

/**
 * Lists are the one place the document nests: a list holds items, and an item
 * holds blocks, a paragraph for its text, plus any list nested under it.
 *
 * Both list types share the item, so mounting either or both works. The item
 * allows `ANY_LIST` inside it, so whatever lists are mounted may nest, a list
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
    children: TItem[];
};

/**
 * The item both list contents declare. One object rather than one each: two
 * plugins may declare the same type only with the very same definition, so
 * mounting either list or both works, and neither can drift from the other.
 */
const listItem = /* @__PURE__ */ defineBlock({
    // The paragraph comes first: it is what a new item is filled with.
    content: { blocks: [PARAGRAPH, ANY_LIST] },
    toHtml: () => ({ tag: 'li', attrs: { class: styles.item }, children: true }),
    parse: [{ tag: 'li' }],
});

type ListContentParams = {
    type: 'bulletList' | 'numberedList';
    tag: 'ul' | 'ol';
    /** The list's own class; the marker per nesting level hangs off it. */
    className: string | undefined;
};

/** Shared declaration of the two list contents, which differ only in type, tag and marker style. */
const listContent = ({ type, tag, className }: ListContentParams) =>
    defineContent({
        blocks: {
            [type]: defineBlock({
                content: { items: 'listItem' },
                toHtml: () => ({ tag, attrs: { class: className }, children: true }),
                parse: [{ tag }],
            }),
            listItem,
        },
    });

/** A bulleted list (`ul`). Shares its item with `numberedListContent`. */
export const bulletListContent = /* @__PURE__ */ listContent({
    type: 'bulletList',
    tag: 'ul',
    className: styles.bulletList,
});

/** A numbered list (`ol`). Shares its item with `bulletListContent`. */
export const numberedListContent = /* @__PURE__ */ listContent({
    type: 'numberedList',
    tag: 'ol',
    className: styles.numberedList,
});

type ListPluginParams = {
    id: string;
    content: RteContent;
    type: 'bulletList' | 'numberedList';
    icon: FondueIcon;
    label: string;
    /** Words the `/` menu also finds it by. */
    keywords: readonly string[];
    /** What starts this list when typed at the beginning of a line. */
    markdown: readonly string[];
    /** The keyboard shortcut that toggles it, as other editors bind it. */
    shortcut: string;
};

/** Shared declaration of the two list plugins, which differ only in content, icon, label, shortcut and typing rule. */
const listPlugin = ({ id, content, type, icon, label, keywords, markdown, shortcut }: ListPluginParams) =>
    definePlugin({
        id,
        content,
        // Active anywhere inside the list (the caret sits in a paragraph inside an
        // item); toggling wraps or unwraps.
        toolbar: [{ toggles: type, label, icon, shortcut, menu: { keywords } }],
        inputRules: markdown.map((match) => ({ kind: 'list' as const, match, list: type })),
    });

/** A bulleted list (`ul`). Shares its item with `numberedListPlugin`. */
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

/** A numbered list (`ol`). Shares its item with `bulletListPlugin`. */
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
