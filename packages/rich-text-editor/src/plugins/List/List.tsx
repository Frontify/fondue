/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListBullet, IconListNumbers, type FondueIcon } from '@frontify/fondue-icons';

import { ANY_LIST, PARAGRAPH, type RteBlockNode, type RtePlugin } from '#/core';

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
    schema: [
        {
            kind: 'block',
            type,
            children: { items: 'listItem' },
            toDom: () => ({ tag, attrs: className ? { class: className } : undefined, children: true }),
            renderComponent: ({ children }) =>
                tag === 'ul' ? <ul className={className}>{children}</ul> : <ol className={className}>{children}</ol>,
        },
        {
            kind: 'block',
            type: 'listItem',
            // The paragraph comes first: it is what a new item is filled with.
            children: { blocks: [PARAGRAPH, ANY_LIST] },
            toDom: () => ({ tag: 'li', attrs: { class: styles.item ?? '' }, children: true }),
            renderComponent: ({ children }) => <li className={styles.item}>{children}</li>,
        },
    ],
    toolbar: (api) => (
        <ToolbarButton
            // The list wraps the item holding the text, so it is above the
            // block the caret is in rather than being that block.
            active={api.selection.get().blocks.some((block) => block.type === type)}
            title={title}
            onClick={() => api.lists.toggle(type)}
        >
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
