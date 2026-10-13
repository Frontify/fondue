/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListCheck } from '@frontify/fondue-icons';

import { ANY_LIST, defineBlock, PARAGRAPH, type RteBlockNode, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './checkList.module.scss';

/**
 * A to-do list: the same nesting shape as the other lists, with a `checked`
 * attribute per item. `toHtml` draws a static checkbox; the editor's
 * `render.edit` makes it interactive via `setValue`.
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
    blocks: {
        checkList: defineBlock({
            content: { items: 'checkItem' },
            toHtml: () => ({ tag: 'ul', attrs: { 'data-check-list': '', class: styles.checkList }, children: true }),
            parse: [{ tag: 'ul[data-check-list]' }],
        }),
        checkItem: defineBlock<{ checked: boolean }>({
            content: { blocks: [PARAGRAPH, ANY_LIST] },
            defaults: { checked: false },
            toHtml: ({ checked }) => ({
                tag: 'li',
                attrs: { 'data-checked': String(checked), class: styles.item },
                children: [
                    { tag: 'input', attrs: { type: 'checkbox', checked, disabled: true, class: styles.checkbox } },
                    { tag: 'span', attrs: { class: styles.label }, children: true },
                ],
            }),
            // Read from the attribute value rather than off the checkbox, so
            // it comes back as a boolean rather than a string.
            parse: [{ tag: 'li[data-checked]', value: (element) => ({ checked: element.dataset.checked === 'true' }) }],
            render: {
                // Only what is inside: the item keeps the `<li>` from `toHtml`.
                edit: ({ value, setValue, children }) => (
                    <>
                        <input
                            type="checkbox"
                            checked={value.checked}
                            contentEditable={false}
                            onChange={() => setValue({ checked: !value.checked })}
                            className={styles.checkbox}
                        />
                        <span className={styles.label}>{children}</span>
                    </>
                ),
            },
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton active={isActive} title="To-do list" onClick={() => toggle()}>
            <IconListCheck size={16} />
        </ToolbarButton>
    ),
    inputRules: [{ kind: 'list', match: '[] ', list: 'checkList' }],
});
