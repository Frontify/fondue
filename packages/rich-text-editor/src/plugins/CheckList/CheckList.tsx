/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListCheck } from '@frontify/fondue-icons';
import { type CSSProperties, type ReactNode, useId } from 'react';

import { ANY_LIST, defineBlock, defineContent, definePlugin, PARAGRAPH, type RteBlockNode } from '#/core';

import styles from './checkList.module.scss';

/**
 * A to-do list item with a checkbox
 */
export type CheckItemBlock<TContent extends RteBlockNode = RteBlockNode> = {
    type: 'checkItem';
    /**
     * Whether the item is done
     * @default false
     */
    checked?: boolean;
    children: TContent[];
};

export type CheckListBlock<TItem extends RteBlockNode = RteBlockNode> = {
    type: 'checkList';
    children: TItem[];
};

export type CheckValue = { checked: boolean };

/**
 * The checkbox's name in exported HTML, where it has no visible text to point at
 */
const stateLabel = (checked: boolean): string => (checked ? 'Done' : 'Not done');

type ReadonlyCheckItemProps = {
    value: CheckValue;
    children?: ReactNode;
    style?: CSSProperties;
};

const ReadonlyCheckItem = ({ value, children, style }: ReadonlyCheckItemProps): ReactNode => {
    const labelId = useId();
    const checked = value.checked === true;
    return (
        <li data-checked={String(checked)} className={styles.item} style={style}>
            <input
                type="checkbox"
                checked={checked}
                readOnly
                aria-readonly="true"
                aria-labelledby={labelId}
                // Not `disabled`: that greys it out, and the state is what is
                // being shown. A click just does not change it.
                onClick={(event) => event.preventDefault()}
                className={styles.checkbox}
            />
            <div id={labelId} className={styles.label}>
                {children}
            </div>
        </li>
    );
};

/**
 * A to-do list whose items each have a checkbox
 */
export const checkListContent = defineContent({
    blocks: {
        checkList: defineBlock({
            content: { items: 'checkItem' },
            toHtml: () => ({ tag: 'ul', attrs: { 'data-check-list': '', class: styles.checkList }, children: true }),
            parse: [{ tag: 'ul[data-check-list]' }],
        }),
        checkItem: defineBlock<CheckValue>({
            content: { blocks: [PARAGRAPH, ANY_LIST] },
            defaults: { checked: false },
            // Exported HTML cannot be interacted with, so its checkbox is a
            // disabled one, named by its state.
            // Only `true` is checked: a stored `"false"` is truthy, and would draw a tick.
            toHtml: (value) => {
                const checked = value.checked === true;
                return {
                    tag: 'li',
                    attrs: { 'data-checked': String(checked), class: styles.item },
                    children: [
                        {
                            tag: 'input',
                            attrs: {
                                type: 'checkbox',
                                checked,
                                disabled: true,
                                'aria-label': stateLabel(checked),
                                class: styles.checkbox,
                            },
                        },
                        { tag: 'div', attrs: { class: styles.label }, children: true },
                    ],
                };
            },
            // Read from the attribute value rather than off the checkbox, so
            // it comes back as a boolean rather than a string.
            parse: [{ tag: 'li[data-checked]', value: (element) => ({ checked: element.dataset.checked === 'true' }) }],
            render: { component: ReadonlyCheckItem },
        }),
    },
});

type EditCheckItemProps = {
    value: CheckValue;
    setValue: (value: CheckValue) => void;
    children?: ReactNode;
};

const EditCheckItem = ({ value, setValue, children }: EditCheckItemProps): ReactNode => {
    const labelId = useId();
    const checked = value.checked === true;
    return (
        <>
            <input
                type="checkbox"
                checked={checked}
                contentEditable={false}
                aria-labelledby={labelId}
                // Keeps focus (and the caret) in the text, so checking an
                // item is not the editor losing focus (and firing `onBlur`).
                onMouseDown={(event) => event.preventDefault()}
                onChange={() => setValue({ checked: !checked })}
                className={styles.checkbox}
            />
            <div id={labelId} className={styles.label}>
                {children}
            </div>
        </>
    );
};

/**
 * A to-do list with a toolbar button and `/` entry, and `[] ` while typing starts one
 */
export const checkListPlugin = /* @__PURE__ */ definePlugin({
    id: 'check-list',
    content: checkListContent,
    toolbar: [
        {
            toggles: 'checkList',
            label: 'To-do list',
            icon: IconListCheck,
            menu: { keywords: ['todo', 'task', 'checkbox', 'checklist'] },
        },
    ],
    // Only what is inside: the item keeps the `<li>` from `toHtml`.
    edit: { checkItem: EditCheckItem },
    // `[] ` and `[ ] ` both start one, the two ways a to-do is written in markdown.
    inputRules: [
        { kind: 'list', match: '[] ', list: 'checkList' },
        { kind: 'list', match: '[ ] ', list: 'checkList' },
    ],
});
