/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListCheck } from '@frontify/fondue-icons';

import { ANY_LIST, PARAGRAPH, type RteBlockNode, type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './checkList.module.scss';

/**
 * A to-do list: the same nesting shape as the other lists, with a `checked`
 * attribute per item. The checkbox is a real input rendered beside the item's
 * content and marked as a toggle for that attribute, which is what makes it
 * clickable inside otherwise declarative rendering.
 */
export type CheckItemBlock<TContent extends RteBlockNode = RteBlockNode> = {
    type: 'checkItem';
    checked?: boolean;
    children: TContent[];
};

export type CheckListBlock<TItem extends RteBlockNode = RteBlockNode> = {
    type: 'checkList';
    children: TItem[];
};

export const checkListPlugin = (): RtePlugin => ({
    id: 'check-list',
    schema: {
        blocks: [
            {
                type: 'checkList',
                isList: true,
                content: 'blocks',
                contains: ['checkItem'],
                render: ({ children }) => (
                    <ul data-check-list="" className={styles.checkList}>
                        {children}
                    </ul>
                ),
                parseRules: [{ tag: 'ul[data-check-list]' }],
            },
            {
                type: 'checkItem',
                content: 'blocks',
                contains: [PARAGRAPH, ANY_LIST],
                attributes: { checked: { default: false } },
                render: ({ node, children }) => {
                    // A render function knows what it declared, so it reads its own block type.
                    const item = node as CheckItemBlock;
                    const checked = Boolean(item.checked);
                    return (
                        <li data-checked={String(checked)} className={styles.item}>
                            <input
                                type="checkbox"
                                checked={checked}
                                readOnly
                                contentEditable={false}
                                data-rte-toggle="checked"
                                className={styles.checkbox}
                            />
                            <span className={styles.label}>{children}</span>
                        </li>
                    );
                },
                // The state is read from the attribute value rather than off the
                // element, so it comes back as a boolean instead of a string.
                parseRules: [
                    { tag: 'li[data-checked=true]', attributes: { checked: true } },
                    { tag: 'li[data-checked=false]', attributes: { checked: false } },
                ],
            },
        ],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.selection.get().blocks.some((block) => block.type === 'checkList')}
            title="To-do list"
            onClick={() => api.lists.toggle('checkList')}
        >
            <IconListCheck size={16} />
        </ToolbarButton>
    ),
    hotkeys: {
        Enter: (api) => api.lists.split() || api.lists.outdent(),
        Tab: (api) => api.lists.indent(),
        'Shift-Tab': (api) => api.lists.outdent(),
    },
});
