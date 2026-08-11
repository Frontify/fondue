/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlockNode, type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './list.module.scss';

/**
 * Lists are the one place the document nests: a list holds items, and an item
 * holds blocks — a paragraph for its text, plus any list nested under it.
 *
 * Both list types share the item, so mounting either one (or both) works; the
 * item's `contains` names every list that could nest inside it and the editor
 * drops the ones that are not mounted.
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

/** Every list a list item may nest, whether or not their plugins are mounted. */
export const NESTABLE_LISTS = ['bulletList', 'numberedList', 'checkList'];

/**
 * The item is declared by whichever list plugin is mounted — the editor keys
 * blocks by type, so declaring it twice is the same as declaring it once.
 */
const createListPlugin = ({
    id,
    type,
    tag,
    label,
    title,
    className,
}: {
    id: string;
    type: 'bulletList' | 'numberedList';
    tag: 'ul' | 'ol';
    label: string;
    title: string;
    /** The list's own class; the marker per nesting level hangs off it. */
    className: string | undefined;
}): RtePlugin => ({
    id,
    schema: {
        blocks: [
            {
                type,
                isList: true,
                content: 'blocks',
                contains: ['listItem'],
                render: ({ children }) =>
                    tag === 'ul' ? (
                        <ul className={className}>{children}</ul>
                    ) : (
                        <ol className={className}>{children}</ol>
                    ),
                parseRules: [{ tag }],
            },
            {
                type: 'listItem',
                content: 'blocks',
                // The paragraph comes first: it is what a new item is filled with.
                contains: ['paragraph', ...NESTABLE_LISTS],
                render: ({ children }) => <li className={styles.item}>{children}</li>,
                parseRules: [{ tag: 'li' }],
            },
        ],
    },
    toolbar: (api) => (
        <ToolbarButton active={api.isBlockActive(type)} title={title} onClick={() => api.toggleList(type)}>
            {label}
        </ToolbarButton>
    ),
    // Enter, Tab and Shift-Tab only mean something inside a list; outside one
    // these report "not handled" and the editor's own bindings take over.
    hotkeys: {
        Enter: (api) => api.splitListItem() || api.outdentListItem(),
        Tab: (api) => api.indentListItem(),
        'Shift-Tab': (api) => api.outdentListItem(),
    },
});

export const BulletListPlugin: RtePlugin = createListPlugin({
    id: 'bullet-list',
    type: 'bulletList',
    tag: 'ul',
    label: '• ―',
    title: 'Bulleted list',
    className: styles.bulletList,
});

export const NumberedListPlugin: RtePlugin = createListPlugin({
    id: 'numbered-list',
    type: 'numberedList',
    tag: 'ol',
    label: '1. ―',
    title: 'Numbered list',
    className: styles.numberedList,
});
