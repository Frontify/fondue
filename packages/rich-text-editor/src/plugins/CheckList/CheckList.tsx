/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListCheck } from '@frontify/fondue-icons';
import { type ReactNode, useId } from 'react';

import { definePlugin } from '#/core';

import styles from './checkList.module.scss';
import { checkListContent, type CheckValue } from './content';

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

/** A to-do list: `[] ` while typing starts one, and each item has a checkbox. */
export const checkListPlugin = definePlugin({
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
