/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListCheck } from '@frontify/fondue-icons';
import { type CSSProperties, type ReactNode, useId } from 'react';

import { ANY_LIST, defineBlock, PARAGRAPH, type RteBlockNode, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './checkList.module.scss';

/**
 * A to-do list: the same nesting shape as the other lists, with a `checked`
 * attribute per item. `toHtml` draws a static checkbox for export; the readonly
 * view (`render.component`) draws one that looks like the editor's but cannot
 * be changed, and the editor's `render.edit` makes it interactive via
 * `setValue`.
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

type CheckValue = { checked: boolean };

/** The checkbox's name in exported HTML, where it has no visible text to point at. */
const stateLabel = (checked: boolean): string => (checked ? 'Done' : 'Not done');

/** The readonly item: the editor's look, its checkbox showing the state without letting it change. */
const ReadonlyCheckItem = ({
    value,
    children,
    style,
}: {
    value: CheckValue;
    children?: ReactNode;
    style?: CSSProperties;
}): ReactNode => {
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

/** The item in the editor: its checkbox, named by the item's own text. */
const EditCheckItem = ({
    value,
    setValue,
    children,
}: {
    value: CheckValue;
    setValue: (value: CheckValue) => void;
    children?: ReactNode;
}): ReactNode => {
    const labelId = useId();
    const checked = value.checked === true;
    return (
        <>
            <input
                type="checkbox"
                checked={checked}
                contentEditable={false}
                aria-labelledby={labelId}
                // Keeps focus — and the caret — in the text, so checking an
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

/** A to-do list: `[] ` while typing starts one, and each item has a checkbox. */
export const checkListPlugin = (): RtePlugin => ({
    id: 'check-list',
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
            render: {
                component: ReadonlyCheckItem,
                // Only what is inside: the item keeps the `<li>` from `toHtml`.
                edit: EditCheckItem,
            },
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton active={isActive} title="To-do list" onClick={() => toggle()}>
            <IconListCheck size={16} />
        </ToolbarButton>
    ),
    // `[] ` and `[ ] ` both start one, the two ways a to-do is written in markdown.
    inputRules: [
        { kind: 'list', match: '[] ', list: 'checkList' },
        { kind: 'list', match: '[ ] ', list: 'checkList' },
    ],
    commands: [
        {
            id: 'to-do-list',
            label: 'To-do list',
            icon: <IconListCheck size={16} />,
            keywords: ['todo', 'task', 'checkbox', 'checklist'],
            group: 'turnInto',
            isActive: (selection) => selection.blocks.some((block) => block.type === 'checkList'),
            run: (api) => api.lists.toggle('checkList'),
        },
    ],
});
