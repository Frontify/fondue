/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type NodeViewDeclaration, useRichTextNodeView } from '#/bridge/define';

import styles from './styles/task.module.scss';

type TaskCommands = { readonly 'task.setChecked': { readonly nodeId: string; readonly checked: boolean } };

/**
 * The item's native checkbox, labelled by the item's text, which runs `task.setChecked` on a click or on Space.
 */
const TaskCheckbox = () => {
    const { attrs, nodeId, contentId, execute } = useRichTextNodeView<TaskCommands>();
    const checked = attrs.checked === true;
    let labelledBy: string | undefined;
    if (contentId !== null) {
        labelledBy = contentId;
    }
    return (
        <input
            type="checkbox"
            className={styles.checkbox}
            checked={checked}
            aria-labelledby={labelledBy}
            onChange={() => {
                // The runtime gives every task item a `nodeId` before a commit publishes.
                if (nodeId !== null) {
                    execute('task.setChecked', { nodeId, checked: !checked });
                }
            }}
        />
    );
};

/** The chrome of `task_item`, which `defineEditor` attaches through the shipped views. */
export const taskItemView: NodeViewDeclaration = { node: 'task_item', component: TaskCheckbox };
