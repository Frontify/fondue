/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentProps, type CSSProperties } from 'react';

import { INDENT_STEP_PX } from '../../constants';
import styles from '../../styles/tree.module.scss';
import { TreeDragLine } from '../TreeDragLine';

type DragLineHarnessProps = ComponentProps<typeof TreeDragLine> & { dir?: 'ltr' | 'rtl' };

/**
 * Mounts `TreeDragLine` inside a `.tree` element, as `TreeRoot` does: the line reads the
 * row geometry custom properties declared there.
 */
export const DragLineHarness = ({ dir, ...props }: DragLineHarnessProps) => (
    <div dir={dir} className={styles.tree} style={{ '--tree-indent-step': `${INDENT_STEP_PX}px` } as CSSProperties}>
        <TreeDragLine {...props} />
    </div>
);
