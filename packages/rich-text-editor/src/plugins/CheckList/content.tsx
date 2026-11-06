/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode, useId } from 'react';

import { ANY_LIST, defineBlock, defineContent, PARAGRAPH, type RteBlockNode } from '#/core';

import styles from './checkList.module.scss';

/**
 * A to-do list: the same nesting shape as the other lists, with a `checked`
 * attribute per item. `toHtml` draws a static checkbox for export; the readonly
 * view (`render.component`) draws one that looks like the editor's but cannot
 * be changed, and the editor's `edit` view makes it interactive via
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

export type CheckValue = { checked: boolean };

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

/** A to-do list: each item has a checkbox. */
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
