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
    children: TItem[];
};

// One shared object: two plugins may declare the same type only with the very same definition.
const listItem = defineBlock({
    // The paragraph comes first: it is what a new item is filled with.
    content: { blocks: [PARAGRAPH, ANY_LIST] },
    toHtml: () => ({ tag: 'li', attrs: { class: styles.item }, children: true }),
    parse: [{ tag: 'li' }],
});

type ListContentParams = {
    type: 'bulletList' | 'numberedList';
    tag: 'ul' | 'ol';
    /**
     * The class that sets the marker style per nesting level
     */
    className: string | undefined;
};

/**
 * Declares a list content, where the two lists differ only in type, tag and marker style
 */
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

/**
 * A bulleted list, written as `<ul>`. Shares its item with `numberedListContent`.
 */
export const bulletListContent = listContent({
    type: 'bulletList',
    tag: 'ul',
    className: styles.bulletList,
});

/**
 * A numbered list, written as `<ol>`. Shares its item with `bulletListContent`.
 */
export const numberedListContent = listContent({
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
        toolbar: [{ toggles: type, label, icon, shortcut, menu: { keywords } }],
        inputRules: markdown.map((match) => ({ kind: 'list' as const, match, list: type })),
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
