/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance } from '@headless-tree/core';
import { useLayoutEffect, useRef, type ChangeEventHandler, type FocusEvent, type MouseEvent } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { TextInput } from '../../TextInput/TextInput';
import styles from '../styles/tree.module.scss';
import { type TreeItemData } from '../types';

type TreeRowRenameInputProps = {
    item: ItemInstance<TreeItemData>;
};

/**
 * The inline `TextInput` swapped in for the row label while `item.isRenaming()`, resized
 * via the `renameInput` styles to fit the 32px row. `EditableText` is not an option: its
 * contentEditable lifecycle conflicts with headless-tree's controlled value/onChange
 * props. Enter and Escape are handled by the renaming feature's hotkeys on the tree
 * container; blur is overridden from the feature's default (abort) to commit, matching
 * Finder/Explorer and `EditableText`.
 */
export const TreeRowRenameInput = ({ item }: TreeRowRenameInputProps) => {
    const { t } = useTranslation();
    const { value, onChange } = item.getRenameInputProps() as {
        value: string;
        onChange: ChangeEventHandler<HTMLInputElement>;
    };

    // Focus and select-all once on mount (instead of the feature's focus-only ref
    // callback, which re-fires on every render and would fight the user's caret). A
    // *layout* effect on purpose: a rename often starts from a closing overlay (the row
    // action's Dropdown), whose teardown drops DOM focus to `document.body`. A passive
    // effect runs after paint, so focus would observably sit on the page root for a
    // moment and screen readers would announce that instead of the rename field; the
    // layout effect re-focuses synchronously in the same commit, before paint.
    const inputRef = useRef<HTMLInputElement>(null);
    useLayoutEffect(() => {
        const input = inputRef.current;
        if (!input) {
            return;
        }
        input.focus();
        input.select();
        // `TextInput` treats non-click focus as keyboard navigation and shows its focus
        // ring; the programmatic focus above is neither, so suppress the ring the same
        // way `TextInput`'s own mousedown handler does.
        input.dataset.showFocusRing = 'false';
    }, []);

    // Keep clicks (caret placement, text selection) from bubbling into the row's
    // select/expand handler. `TextInput` exposes no `onClick`, hence the wrapper.
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    // Blur commits, but `completeRenaming()` ends with a focus restore that would steal
    // focus back to the row even when the user just moved on (e.g. clicked outside the
    // tree). Restore only when focus stays inside the tree (clicking another row);
    // otherwise replicate the feature's commit — fire `onRename`, clear the renaming
    // state (which also echoes `onRenamingChange(false)`) — without touching DOM focus.
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        const tree = item.getTree();
        // A blur can still fire while the rename is already completed (Enter handled it
        // first); committing again here would fire a second `onRename`.
        if (!item.isRenaming()) {
            return;
        }
        const focusStaysInTree =
            event.relatedTarget instanceof Node && Boolean(tree.getElement()?.contains(event.relatedTarget));
        if (focusStaysInTree) {
            tree.completeRenaming();
            return;
        }
        tree.getConfig().onRename?.(item, tree.getRenamingValue());
        tree.applySubStateUpdate('renamingItem', null);
    };

    return (
        // eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions
        <div className={styles.renameInput} onClick={handleClick}>
            <TextInput.Root
                ref={inputRef}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                className={styles.renameTextInput}
                aria-label={t('Tree_renameInputLabel')}
            />
        </div>
    );
};
