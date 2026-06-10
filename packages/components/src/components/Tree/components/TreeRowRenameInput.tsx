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
 * Inline `TextInput` swapped in for the row label while renaming (`EditableText`'s
 * contentEditable lifecycle conflicts with headless-tree's controlled props). Enter and
 * Escape are handled by the feature's hotkeys; blur is overridden from abort to commit,
 * matching Finder/Explorer.
 */
export const TreeRowRenameInput = ({ item }: TreeRowRenameInputProps) => {
    const { t } = useTranslation();
    const { value, onChange } = item.getRenameInputProps() as {
        value: string;
        onChange: ChangeEventHandler<HTMLInputElement>;
    };

    // Focus and select-all once on mount (the feature's own ref callback re-fires every
    // render and would fight the caret). A *layout* effect: a rename often starts from a
    // closing overlay whose teardown drops focus to `document.body`; re-focusing must
    // happen before paint or screen readers announce the page root instead.
    const inputRef = useRef<HTMLInputElement>(null);
    useLayoutEffect(() => {
        const input = inputRef.current;
        if (!input) {
            return;
        }
        input.focus();
        input.select();
        // Suppress the focus ring `TextInput` shows for non-click (assumed keyboard) focus.
        input.dataset.showFocusRing = 'false';
    }, []);

    // Keep caret/selection clicks from bubbling into the row's select/expand handler
    // (`TextInput` exposes no `onClick`, hence the wrapper).
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    // Blur commits, but `completeRenaming()`'s focus restore would steal focus back to
    // the row when the user moved on. Restore only when focus stays inside the tree;
    // otherwise replicate the commit without touching DOM focus.
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        const tree = item.getTree();
        // Enter may have completed the rename already; committing again would double-fire.
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
