/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssistiveTreeDescription } from '@headless-tree/react';
import { Fragment, useId, useMemo, type ReactNode } from 'react';

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
     * with no loaded children is checkable as its own entity via `isSelected`; when its
     * children load, the consumer has to carry the selected state over to the new items
     * by passing `isSelected` to all of them.
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
     * Gates drops onto the top level — same semantics as `accepts` on `<Tree.Folder>`.
     * Returning `false` suppresses the drop indicator and prevents `onMove`/`onChange`.
     * Omitted = the root accepts anything.
     */
    accepts?: (items: TreeDropCandidate[]) => boolean;
};

export const TreeRoot = ({ children, onChange, multiSelect = false, reorderable = false, accepts }: TreeRootProps) => {
    const { t } = useTranslation();
    const rowHintId = useId();
    const { items, parentIsLoading: rootIsLoading } = useMemo(() => parseChildren(children), [children]);
    const tree = useTreeController({ items, onChange, multiSelect, reorderable, rootAccepts: accepts });

    const visibleItems = tree.getItems();
    const loadingInsertions = useMemo(
        () => computeLoadingInsertions(visibleItems, rootIsLoading),
        [visibleItems, rootIsLoading],
    );

    // Shared derivation (not headless-tree's leaf-only `getCheckedState`) so leafless
    // folders and their ancestors render the same state that `onChange` reports.
    const checkedStates = useMemo(
        () => (multiSelect ? computeCheckedStates(items, new Set(getCheckedUnitIds(items))) : undefined),
        [multiSelect, items],
    );

    const rowHint = [multiSelect && t('Tree_checkboxHint'), reorderable && t('Tree_reorderHint')]
        .filter(Boolean)
        .join(' ');

    return (
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
};
TreeRoot.displayName = 'TreeRoot';
