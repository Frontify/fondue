/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { NodeViewContent, type NodeViewDeclaration, useRichTextNodeView } from '#/bridge/define';
import { useEditorApi } from '#/bridge/plugin';

import styles from '../styles/task.module.scss';

// Node chrome stays out of the Tab order, so Tab leaves the editor; Mod+Enter toggles the item from the keyboard.
const OUT_OF_TAB_ORDER = -1;

type TaskCommands = { 'task.setChecked': { nodeId: string; checked: boolean } };

/**
 * The item's native checkbox beside its content, labelled by the item's text, which runs `task.setChecked` on a click
 * or on Space.
 */
const TaskCheckbox = () => {
    const { attrs, nodeId, contentId, context, execute } = useRichTextNodeView<TaskCommands>();
    const checked = attrs.checked === true;
    const api = useEditorApi();
    const checkboxRef = useRef<HTMLInputElement | null>(null);
    const shownRef = useRef(checked);
    // A toggle from the keyboard (Mod+Enter) leaves focus in the text, where the checkbox says nothing, so the live
    // region says the new state; a click focuses the checkbox, which says it itself.
    useEffect(() => {
        if (shownRef.current === checked) {
            return;
        }

        shownRef.current = checked;
        const checkbox = checkboxRef.current;
        if (checkbox === null) {
            return;
        }

        const active = checkbox.ownerDocument.activeElement;
        if (active === null || active === checkbox || !active.contains(checkbox)) {
            return;
        }

        if (checked) {
            api?.announce(context.t('RichTextEditor_taskChecked'));

            return;
        }

        api?.announce(context.t('RichTextEditor_taskUnchecked'));
    }, [api, checked, context]);
    let labelledBy: string | undefined;
    if (contentId !== null) {
        labelledBy = contentId;
    }

    return (
        <>
            <input
                ref={checkboxRef}
                type="checkbox"
                className={styles.checkbox}
                contentEditable={false}
                tabIndex={OUT_OF_TAB_ORDER}
                checked={checked}
                aria-labelledby={labelledBy}
                onChange={() => {
                    // The runtime gives every task item a `nodeId` before a commit publishes.
                    if (nodeId !== null) {
                        execute('task.setChecked', { nodeId, checked: !checked });
                    }
                }}
            />
            <NodeViewContent />
        </>
    );
};

/** The chrome of `task_item`, which its editor part attaches. */
export const taskItemView: NodeViewDeclaration = { node: 'task_item', component: TaskCheckbox };
