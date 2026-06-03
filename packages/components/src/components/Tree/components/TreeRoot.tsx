/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssistiveTreeDescription } from '@headless-tree/react';
import { useId, useMemo } from 'react';

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type TreeRootProps } from '../types';
import { parseChildren } from '../utils/parseChildren';

import { TreeDragLine } from './TreeDragLine';
import { TreeRow } from './TreeRow';

export const TreeRoot = ({ children, onChange, multiSelect = false, reorderable = false }: TreeRootProps) => {
    const reorderHintId = useId();
    const items = useMemo(() => parseChildren(children), [children]);
    const tree = useTreeController({ items, onChange, reorderable });

    return (
        <div {...tree.getContainerProps()} className={styles.tree}>
            {reorderable && (
                <span id={reorderHintId} className={styles.srOnly}>
                    To reorder, press Control plus Shift plus D to start moving this item, then arrow up or down to
                    position it, Enter to drop, or Escape to cancel.
                </span>
            )}
            <AssistiveTreeDescription tree={tree} />
            {tree.getItems().map((item) => (
                <TreeRow
                    key={item.getId()}
                    item={item}
                    multiSelect={multiSelect}
                    reorderable={reorderable}
                    reorderHintId={reorderHintId}
                />
            ))}
            {reorderable && <TreeDragLine data={tree.getDragLineData()} />}
        </div>
    );
};
TreeRoot.displayName = 'TreeRoot';
