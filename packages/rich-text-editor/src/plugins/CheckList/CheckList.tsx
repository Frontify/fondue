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

/** What `checked` holds for an item that is started but not finished. */
const IN_PROGRESS = 'inProgress';

/** One state of an item, with everything that depends on it. */
type CheckState = {
    value: CheckValue['checked'];
    /** What `data-checked` holds in exported HTML, which `parse` reads back. */
    data: string;
    /** The checkbox's name in exported HTML, where it has no visible text to point at. */
    label: string;
};

const DONE: CheckState = { value: true, data: 'true', label: 'Done' };
const STARTED: CheckState = { value: IN_PROGRESS, data: IN_PROGRESS, label: 'In progress' };
const NOT_DONE: CheckState = { value: false, data: 'false', label: 'Not done' };
const CHECK_STATES = [DONE, STARTED, NOT_DONE];

/** Anything stored but `true` and `'inProgress'` is not done: a stored `"false"` is truthy, and would draw a tick. */
const stateOfValue = (checked: unknown): CheckState =>
    CHECK_STATES.find((state) => state.value === checked) ?? NOT_DONE;

const stateOfData = (data: string | undefined): CheckState =>
    CHECK_STATES.find((state) => state.data === data) ?? NOT_DONE;

/** A click finishes an item, in progress or not, and reopens a finished one. */
const afterClick = (state: CheckState): CheckState => {
    if (state === DONE) {
        return NOT_DONE;
    }
    return DONE;
};

/** `indeterminate` is a DOM property with no attribute or React prop, so it is set on the element. */
const setIndeterminate = (input: HTMLInputElement | null, indeterminate: boolean): void => {
    if (input) {
        input.indeterminate = indeterminate;
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
    const state = stateOfValue(value.checked);
    return (
        <li data-checked={state.data} className={styles.item} style={style}>
            <input
                ref={(input) => setIndeterminate(input, state === STARTED)}
                type="checkbox"
                checked={state === DONE}
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
    const state = stateOfValue(value.checked);
    return (
        <>
            <input
                ref={(input) => setIndeterminate(input, state === STARTED)}
                type="checkbox"
                checked={state === DONE}
                contentEditable={false}
                aria-labelledby={labelId}
                // Keeps focus — and the caret — in the text, so checking an
                // item is not the editor losing focus (and firing `onBlur`).
                onMouseDown={(event) => event.preventDefault()}
                onChange={() => setValue({ checked: afterClick(state).value })}
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
                const state = stateOfValue(value.checked);
                return {
                    tag: 'li',
                    attrs: { 'data-checked': state.data, class: styles.item },
                    children: [
                        {
                            tag: 'input',
                            attrs: {
                                type: 'checkbox',
                                checked: state === DONE,
                                disabled: true,
                                'aria-label': state.label,
                                class: styles.checkbox,
                            },
                        },
                        { tag: 'div', attrs: { class: styles.label }, children: true },
                    ],
                };
            },
            // Read from the attribute, not the checkbox, so it comes back as the stored value.
            parse: [
                {
                    tag: 'li[data-checked]',
                    value: (element) => ({ checked: stateOfData(element.dataset.checked).value }),
                },
            ],
            render: {
                component: ReadonlyCheckItem,
                // Only what is inside: the item keeps the `<li>` from `toHtml`.
                edit: EditCheckItem,
            },
        }),
    },
    toolbarGroup: 'lists',
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton active={isActive} title="To-do list" onClick={() => toggle()}>
            <IconListCheck size={20} />
        </ToolbarButton>
    ),
    // `[] ` and `[ ] ` both start one, the two ways a to-do is written in markdown; `[x] ` starts it done, `[~] ` in progress.
    inputRules: [
        { kind: 'list', match: '[] ', list: 'checkList' },
        { kind: 'list', match: '[ ] ', list: 'checkList' },
        { kind: 'list', match: '[x] ', list: 'checkList', itemAttributes: { checked: true } },
        { kind: 'list', match: '[X] ', list: 'checkList', itemAttributes: { checked: true } },
        { kind: 'list', match: '[~] ', list: 'checkList', itemAttributes: { checked: IN_PROGRESS } },
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
