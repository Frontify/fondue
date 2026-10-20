/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListBullet, IconListNumbers, type FondueIcon } from '@frontify/fondue-icons';

import { ANY_LIST, PARAGRAPH, type RteBlockNode, defineBlock, type RtePlugin } from '#/core';

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
    children: TItem[];
};

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

/** Shared declaration of the two list plugins, which differ only in type, tag, icon, marker style and shortcut. */
const listPlugin = ({
    id,
    type,
    tag,
    icon: Icon,
    title,
    keywords,
    className,
    markdown,
    hotkey,
}: {
    id: string;
    type: 'bulletList' | 'numberedList';
    tag: 'ul' | 'ol';
    icon: FondueIcon;
    title: string;
    /** Words the `/` menu also finds it by. */
    keywords: readonly string[];
    /** The list's own class; the marker per nesting level hangs off it. */
    className: string | undefined;
    /** What starts this list when typed at the beginning of a line. */
    markdown: readonly string[];
    /** The keyboard shortcut that toggles it, as other editors bind it. */
    hotkey: string;
}): RtePlugin => ({
    id,
    blocks: {
        [type]: defineBlock({
            content: { items: 'listItem' },
            toHtml: () => ({ tag, attrs: { class: className }, children: true }),
            parse: [{ tag }],
        }),
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
        tag: 'ul',
        icon: IconListBullet,
        title: 'Bulleted list',
        keywords: ['ul', 'unordered', 'bullets'],
        className: styles.bulletList,
        markdown: ['- ', '* '],
        hotkey: 'Mod-Shift-8',
    });

/** A numbered list (`ol`). Shares its item with `bulletListPlugin`. */
export const numberedListPlugin = (): RtePlugin =>
    listPlugin({
        id: 'numbered-list',
        type: 'numberedList',
        tag: 'ol',
        icon: IconListNumbers,
        title: 'Numbered list',
        keywords: ['ol', 'ordered', 'numbers'],
        className: styles.numberedList,
        markdown: ['1. ', '1) '],
        hotkey: 'Mod-Shift-7',
    });
