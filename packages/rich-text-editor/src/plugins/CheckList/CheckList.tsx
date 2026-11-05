/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListCheck } from '@frontify/fondue-icons';
import { type CSSProperties, type ReactNode, useId } from 'react';

import { ANY_LIST, defineBlock, PARAGRAPH, type RteBlockNode, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './checkList.module.scss';

/**
 * A to-do list: the same nesting shape as the other lists, with a `checked`
 * attribute per item: `true` when done, `'inProgress'` once started, `false`
 * otherwise. `toHtml` draws a static checkbox for export; the readonly
 * view (`render.component`) draws one that looks like the editor's but cannot
 * be changed, and the editor's `render.edit` makes it interactive via
 * `setValue`.
 */
export type CheckItemBlock<TContent extends RteBlockNode = RteBlockNode> = {
    type: 'checkItem';
    checked?: boolean | 'inProgress';
    children: TContent[];
};

export type CheckListBlock<TItem extends RteBlockNode = RteBlockNode> = {
    type: 'checkList';
    children: TItem[];
};

type CheckValue = { checked: boolean | 'inProgress' };

type CheckState = 'done' | 'inProgress' | 'notDone';

/** Only `true` is done: a stored `"false"` is truthy, and would draw a tick. */
const stateOf = (value: { checked?: unknown }): CheckState => {
    if (value.checked === true) {
        return 'done';
    }
    if (value.checked === 'inProgress') {
        return 'inProgress';
    }
    return 'notDone';
};

/** The checkbox's name in exported HTML, where it has no visible text to point at. */
const STATE_LABEL: Record<CheckState, string> = { done: 'Done', inProgress: 'In progress', notDone: 'Not done' };

/** What `data-checked` holds, and `parse` reads back. */
const DATA_CHECKED: Record<CheckState, string> = { done: 'true', inProgress: 'inProgress', notDone: 'false' };

const checkedFromData = (data: string | undefined): CheckValue['checked'] => {
    if (data === 'true') {
        return true;
    }
    if (data === 'inProgress') {
        return 'inProgress';
    }
    return false;
};

/** `indeterminate` is a DOM property with no attribute or React prop, so it is set on the element. */
const showInProgress =
    (inProgress: boolean) =>
    (input: HTMLInputElement | null): void => {
        if (input) {
            input.indeterminate = inProgress;
        }
    };

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
    const state = stateOf(value);
    return (
        <li data-checked={DATA_CHECKED[state]} className={styles.item} style={style}>
            <input
                ref={showInProgress(state === 'inProgress')}
                type="checkbox"
                checked={state === 'done'}
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
    const state = stateOf(value);
    const checked = state === 'done';
    return (
        <>
            <input
                ref={showInProgress(state === 'inProgress')}
                type="checkbox"
                checked={checked}
                contentEditable={false}
                aria-labelledby={labelId}
                // Keeps focus — and the caret — in the text, so checking an
                // item is not the editor losing focus (and firing `onBlur`).
                onMouseDown={(event) => event.preventDefault()}
                // An item in progress is done on the next click, as an unchecked one is.
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
            toHtml: (value) => {
                const state = stateOf(value);
                return {
                    tag: 'li',
                    attrs: { 'data-checked': DATA_CHECKED[state], class: styles.item },
                    children: [
                        {
                            tag: 'input',
                            attrs: {
                                type: 'checkbox',
                                checked: state === 'done',
                                disabled: true,
                                'aria-label': STATE_LABEL[state],
                                class: styles.checkbox,
                            },
                        },
                        { tag: 'div', attrs: { class: styles.label }, children: true },
                    ],
                };
            },
            // Read from the attribute value rather than off the checkbox, so
            // it comes back as the stored value rather than a string.
            parse: [
                {
                    tag: 'li[data-checked]',
                    value: (element) => ({ checked: checkedFromData(element.dataset.checked) }),
                },
            ],
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
    // `[] ` and `[ ] ` both start one, the two ways a to-do is written in markdown; `[x] ` starts it done, `[~] ` in progress.
    inputRules: [
        { kind: 'list', match: '[] ', list: 'checkList' },
        { kind: 'list', match: '[ ] ', list: 'checkList' },
        { kind: 'list', match: '[x] ', list: 'checkList', itemAttributes: { checked: true } },
        { kind: 'list', match: '[X] ', list: 'checkList', itemAttributes: { checked: true } },
        { kind: 'list', match: '[~] ', list: 'checkList', itemAttributes: { checked: 'inProgress' } },
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
