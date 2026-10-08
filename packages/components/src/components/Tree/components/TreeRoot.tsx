/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssistiveTreeDescription } from '@headless-tree/react';
import { Fragment, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type TreeChangeState, type TreeDropCandidate } from '../types';
import { computeCheckedStates, getCheckedUnitIds } from '../utils/computeCheckedStates';
import { computeLoadingInsertions } from '../utils/computeLoadingInsertions';
import { isNoopDrop } from '../utils/isNoopDrop';
import { parseChildren } from '../utils/parseChildren';

import { TreeDragLine } from './TreeDragLine';
import { TreeLoadingRow } from './TreeLoadingRow';
import { TreeRow } from './TreeRow';

export type TreeRootProps = {
    children: ReactNode;
    /** Fires with the full tree state, at most once per user interaction. */
    onChange?: (state: TreeChangeState) => void;
    /**
     * Renders a checkbox in each row. Folder checkboxes derive from their descendants
     * (indeterminate when partially checked) and cascade-toggle them on click. A folder
     * with no loaded children is checkable as its own entity via `isSelected`, including
     * an explicit `'indeterminate'` to restore a partial selection before its descendants
     * load. When its children load, the consumer has to carry the selected state over to
     * the new items by passing `isSelected` to all of them.
     * @default false
     */
    multiSelect?: boolean;
    /**
     * Enables drag-and-drop reordering of items. When false, items are static and
     * no drag handle is rendered.
     * @default false
     */
    reorderable?: boolean;
    /**
     * Controls whether disabled descendants count toward a folder's checkbox state. By
     * default they are excluded, so a folder reads `'checked'` once all of its selectable
     * descendants are checked and its checkbox can always be toggled back off. Set this to
     * keep disabled descendants counting, so a folder with an unchecked disabled
     * descendant stays at `'indeterminate'` and cannot be fully checked.
     * @default false
     */
    countDisabledInFolderState?: boolean;
    /**
     * Gates drops onto the top level, same semantics as `accepts` on `<Tree.Folder>`.
     * Returning `false` suppresses the drop indicator and prevents `onMove`/`onChange`.
     * Omitted = the root accepts anything.
     */
    accepts?: (items: TreeDropCandidate[]) => boolean;
};

export const TreeRoot = ({
    children,
    onChange,
    multiSelect = false,
    reorderable = false,
    countDisabledInFolderState = false,
    accepts,
}: TreeRootProps) => {
    const { t } = useTranslation();
    const rowHintId = useId();
    const { items, parentIsLoading: rootIsLoading } = useMemo(() => parseChildren(children), [children]);
    const tree = useTreeController({
        items,
        onChange,
        multiSelect,
        reorderable,
        countDisabledInFolderState,
        rootAccepts: accepts,
    });

    // React drops the blur fired while it removes the focused row, so this stays true through a removal.
    const [hasFocusWithin, setHasFocusWithin] = useState(false);
    // An empty tree has nowhere to keep focus, and no blur will arrive to clear the flag.
    if (hasFocusWithin && items.length === 0) {
        setHasFocusWithin(false);
    }
    // Set by events that reach the container through the React tree, so portalled menus in rows count as inside.
    const isInsideEventRef = useRef(false);
    // A focused element removed outside this component's commits (a portalled menu closing) fires no blur either.
    useEffect(() => {
        if (!hasFocusWithin) {
            return;
        }
        const handleDocumentEvent = () => {
            // An outside press that moves no focus (a touch pan, a scrollbar drag) leaves the user on their row.
            if (!isInsideEventRef.current && !tree.getElement()?.contains(document.activeElement)) {
                setHasFocusWithin(false);
            }
            isInsideEventRef.current = false;
        };
        document.addEventListener('pointerdown', handleDocumentEvent);
        document.addEventListener('focusin', handleDocumentEvent);
        return () => {
            document.removeEventListener('pointerdown', handleDocumentEvent);
            document.removeEventListener('focusin', handleDocumentEvent);
        };
    }, [hasFocusWithin, tree]);
    // Where focus last landed; TreeRow's onFocus has already made its row the focused item by then.
    const lastFocusRef = useRef<{ isPortalled: boolean; rowId: string } | null>(null);
    // Runs every commit: a removed row can take focus with it while the tab stop stays on another row.
    useEffect(() => {
        const lastFocus = lastFocusRef.current;
        if (!hasFocusWithin || document.activeElement !== document.body || !lastFocus) {
            return;
        }
        // A portalled control (a row's menu or dialog) losing focus is the portal's business unless its row went too.
        const isRowGone = !tree.getItems().some((item) => item.getId() === lastFocus.rowId);
        if (!lastFocus.isPortalled || isRowGone) {
            tree.getFocusedItem().getElement()?.focus();
        }
    });

    const visibleItems = tree.getItems();
    const loadingInsertions = useMemo(
        () => computeLoadingInsertions(visibleItems, rootIsLoading),
        [visibleItems, rootIsLoading],
    );

    // Shared derivation (not headless-tree's leaf-only `getCheckedState`) so leafless
    // folders and their ancestors render the same state that `onChange` reports.
    const checkedStates = useMemo(
        () =>
            multiSelect
                ? computeCheckedStates(items, new Set(getCheckedUnitIds(items)), { countDisabledInFolderState })
                : undefined,
        [multiSelect, items, countDisabledInFolderState],
    );

    const rowHint = [multiSelect && t('Tree_checkboxHint'), reorderable && t('Tree_reorderHint')]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            {...tree.getContainerProps()}
            className={styles.tree}
            onPointerDownCapture={() => {
                isInsideEventRef.current = true;
            }}
            onFocus={(event) => {
                isInsideEventRef.current = true;
                lastFocusRef.current = {
                    isPortalled: !event.currentTarget.contains(event.target),
                    rowId: tree.getFocusedItem().getId(),
                };
                setHasFocusWithin(true);
            }}
            onBlur={(event) => {
                // Switching windows blurs with no target but leaves the row active, and focus returns to it.
                if (event.relatedTarget === null && !document.hasFocus()) {
                    return;
                }
                setHasFocusWithin(event.currentTarget.contains(event.relatedTarget));
            }}
        >
            {rowHint && (
                <span id={rowHintId} className={styles.srOnly}>
                    {rowHint}
                </span>
            )}
            <AssistiveTreeDescription tree={tree} />
            {visibleItems.map((item, index) => {
                const loadingPlaceholder = loadingInsertions.byIndex.get(index);
                return (
                    <Fragment key={item.getId()}>
                        <TreeRow
                            item={item}
                            multiSelect={multiSelect}
                            reorderable={reorderable}
                            hintId={rowHint ? rowHintId : undefined}
                            checkedState={checkedStates?.get(item.getId()) ?? false}
                        />
                        {loadingPlaceholder && (
                            <TreeLoadingRow
                                level={loadingPlaceholder.level}
                                multiSelect={multiSelect}
                                reorderable={reorderable}
                            />
                        )}
                    </Fragment>
                );
            })}
            {loadingInsertions.rootLoading && (
                <TreeLoadingRow
                    level={loadingInsertions.rootLoading.level}
                    multiSelect={multiSelect}
                    reorderable={reorderable}
                />
            )}
            {reorderable && (
                <TreeDragLine data={isNoopDrop(tree) ? null : tree.getDragLineData()} multiSelect={multiSelect} />
            )}
        </div>
    );
};
TreeRoot.displayName = 'TreeRoot';
