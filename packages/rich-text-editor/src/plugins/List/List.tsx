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
 * The two list plugins differ only in type, tag, icon and marker style, so they
 * share one declaration. The item is declared by whichever of them is mounted;
 * the editor keys blocks by type, so declaring it twice is the same as
 * declaring it once.
 */
const listPlugin = ({
    id,
    type,
    tag,
    icon: Icon,
    title,
    className,
    markdown,
}: {
    id: string;
    type: 'bulletList' | 'numberedList';
    tag: 'ul' | 'ol';
    icon: FondueIcon;
    title: string;
    /** The list's own class; the marker per nesting level hangs off it. */
    className: string | undefined;
    /** What starts this list when typed at the beginning of a line. */
    markdown: readonly string[];
}): RtePlugin => ({
    id,
    blocks: {
        [type]: defineBlock({
            content: { items: 'listItem' },
            toHtml: () => ({ tag, attrs: { class: className }, children: true }),
            parse: [{ tag }],
        }),
        listItem: defineBlock({
            // The paragraph comes first: it is what a new item is filled with.
            content: { blocks: [PARAGRAPH, ANY_LIST] },
            toHtml: () => ({ tag: 'li', attrs: { class: styles.item }, children: true }),
            parse: [{ tag: 'li' }],
        }),
    },
    // Active anywhere inside the list (the caret sits in a paragraph inside an
    // item); toggling wraps or unwraps.
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton active={isActive} title={title} onClick={() => toggle()}>
            <Icon size={16} />
        </ToolbarButton>
    ),
    inputRules: markdown.map((match) => ({ kind: 'list' as const, match, list: type })),
});

export const bulletListPlugin = (): RtePlugin =>
    listPlugin({
        id: 'bullet-list',
        type: 'bulletList',
        tag: 'ul',
        icon: IconListBullet,
        title: 'Bulleted list',
        className: styles.bulletList,
        markdown: ['- ', '* '],
    });

export const numberedListPlugin = (): RtePlugin =>
    listPlugin({
        id: 'numbered-list',
        type: 'numberedList',
        tag: 'ol',
        icon: IconListNumbers,
        title: 'Numbered list',
        className: styles.numberedList,
        markdown: ['1. ', '1) '],
    });
