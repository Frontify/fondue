/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssistiveTreeDescription } from '@headless-tree/react';
import { Fragment, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type TreeChangeState, type TreeDropCandidate } from '../types';
import { computeCheckedStates, getCheckedUnitIds } from '../utils/computeCheckedStates';
import { computeLoadingInsertions } from '../utils/computeLoadingInsertions';
import { isNoopDrop } from '../utils/isNoopDrop';
import { parseChildren } from '../utils/parseChildren';

import { buildCollectedItems, type CollectStore, TreeCollector } from './TreeCollector';
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
    const parsed = useMemo(() => parseChildren(children), [children]);
    // Rows inside custom components are found only by rendering `children` in a hidden
    // collect pass; the static parse stays the first-render (and server) value.
    const collectRef = useRef<HTMLDivElement>(null);
    const [flushTick, setFlushTick] = useState(0);
    const [collected, setCollected] = useState<typeof parsed | null>(null);
    const store = useMemo<CollectStore>(
        () => ({ entries: new Map(), requestFlush: () => setFlushTick((tick) => tick + 1) }),
        [],
    );
    useLayoutEffect(() => {
        if (!parsed.hasForeignRows || !collectRef.current) {
            return;
        }
        setCollected(buildCollectedItems(collectRef.current, store.entries));
    }, [flushTick, parsed.hasForeignRows, store]);
    const { items, parentIsLoading: rootIsLoading } = parsed.hasForeignRows && collected ? collected : parsed;
    const tree = useTreeController({
        items,
        onChange,
        multiSelect,
        reorderable,
        countDisabledInFolderState,
        rootAccepts: accepts,
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

    const treeElement = (
        <div {...tree.getContainerProps()} className={styles.tree}>
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

    if (!parsed.hasForeignRows) {
        return treeElement;
    }
    return (
        <>
            <TreeCollector store={store} containerRef={collectRef}>
                {children}
            </TreeCollector>
            {treeElement}
        </>
    );
};
TreeRoot.displayName = 'TreeRoot';
