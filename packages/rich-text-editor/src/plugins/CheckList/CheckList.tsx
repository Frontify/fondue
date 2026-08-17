/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListCheck } from '@frontify/fondue-icons';

import { ANY_LIST, PARAGRAPH, type RteBlockNode, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './checkList.module.scss';

/**
 * A to-do list: the same nesting shape as the other lists, with a `checked`
 * attribute per item. The renderer draws a static checkbox; the editor's
 * `editorComponent` makes it interactive via `updateAttributes`.
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

const checkItemAttrs = (checked: boolean): Record<string, string> => ({
    'data-checked': String(checked),
    class: styles.item ?? '',
});

export const checkListPlugin = (): RtePlugin => ({
    id: 'check-list',
    schema: [
        {
            kind: 'block',
            type: 'checkList',
            children: { items: 'checkItem' },
            toDom: () => ({
                tag: 'ul',
                attrs: { 'data-check-list': '', class: styles.checkList ?? '' },
                children: true,
            }),
            renderComponent: ({ children }) => (
                <ul data-check-list="" className={styles.checkList}>
                    {children}
                </ul>
            ),
            parseRules: [{ tag: 'ul[data-check-list]' }],
        },
        {
            kind: 'block',
            type: 'checkItem',
            children: { blocks: [PARAGRAPH, ANY_LIST] },
            attributes: { checked: { default: false } },
            toDom: (attrs) => ({
                tag: 'li',
                attrs: checkItemAttrs(attrs.checked === true),
                children: [
                    {
                        tag: 'input',
                        attrs: {
                            type: 'checkbox',
                            ...(attrs.checked === true ? { checked: '' } : {}),
                            class: styles.checkbox ?? '',
                        },
                    },
                    { tag: 'span', attrs: { class: styles.label ?? '' }, children: true },
                ],
            }),
            renderComponent: ({ node, children }) => {
                const item = node as CheckItemBlock;
                const checked = item.checked === true;
                return (
                    <li data-checked={String(checked)} className={styles.item}>
                        <input
                            type="checkbox"
                            checked={checked}
                            readOnly
                            contentEditable={false}
                            className={styles.checkbox}
                        />
                        <span className={styles.label}>{children}</span>
                    </li>
                );
            },
            // Inner chrome only: the NodeView owns the `<li>` from `toDom`.
            editorComponent: ({ node, children, updateAttributes }) => {
                const item = node as CheckItemBlock;
                const checked = item.checked === true;
                return (
                    <>
                        <input
                            type="checkbox"
                            checked={checked}
                            contentEditable={false}
                            onChange={() => updateAttributes({ checked: !checked })}
                            className={styles.checkbox}
                        />
                        <span className={styles.label}>{children}</span>
                    </>
                );
            },
            // The state is read from the attribute value rather than off
            // the element, so it comes back as a boolean rather than a
            // string.
            parseRules: [
                { tag: 'li[data-checked=true]', attributes: { checked: true } },
                { tag: 'li[data-checked=false]', attributes: { checked: false } },
            ],
        },
    ],
    toolbar: (api) => (
        <ToolbarButton
            active={api.selection.get().blocks.some((block) => block.type === 'checkList')}
            title="To-do list"
            onClick={() => api.lists.toggle('checkList')}
        >
            <IconListCheck size={16} />
        </ToolbarButton>
    ),
    inputRules: [{ kind: 'list', match: '[] ', list: 'checkList' }],
});
