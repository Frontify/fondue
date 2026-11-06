/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ANY_LIST, PARAGRAPH, type RteBlockNode, defineBlock, defineContent } from '#/core';

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
const listItem = defineBlock({
    // The paragraph comes first: it is what a new item is filled with.
    content: { blocks: [PARAGRAPH, ANY_LIST] },
    toHtml: () => ({ tag: 'li', attrs: { class: styles.item }, children: true }),
    parse: [{ tag: 'li' }],
});

/** Shared declaration of the two list contents, which differ only in type, tag and marker style. */
const listContent = ({
    type,
    tag,
    className,
}: {
    type: 'bulletList' | 'numberedList';
    tag: 'ul' | 'ol';
    /** The list's own class; the marker per nesting level hangs off it. */
    className: string | undefined;
}) =>
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
export const bulletListContent = listContent({ type: 'bulletList', tag: 'ul', className: styles.bulletList });

/** A numbered list (`ol`). Shares its item with `bulletListContent`. */
export const numberedListContent = listContent({ type: 'numberedList', tag: 'ol', className: styles.numberedList });
