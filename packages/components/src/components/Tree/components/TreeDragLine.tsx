/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import styles from '../styles/tree.module.scss';

type DragLineData = {
    top: number;
    left: number;
} | null;

type TreeDragLineProps = {
    data: DragLineData;
    multiSelect: boolean;
};

export const TreeDragLine = ({ data, multiSelect }: TreeDragLineProps) => {
    if (!data) {
        return null;
    }
    // `left` is the drop level × INDENT_STEP_PX (headless-tree's `indent` config). It is
    // handed to the stylesheet as a custom property — `.dragline` adds the fixed row
    // prefix (handle, optional checkbox) so the line starts under the chevron of the
    // folder it drops into. Root-level drops (level 0, no target folder) get no indent at
    // all and read as a tree-wide line. The line stretches to the tree's right edge;
    // headless-tree's `width` is ignored since rows are full-width anyway.
    return (
        <div
            className={styles.dragline}
            data-multi-select={multiSelect}
            data-root-drop={data.left === 0}
            style={{ top: data.top, '--tree-drag-line-indent': `${data.left}px` } as CSSProperties}
            aria-hidden
        />
    );
};
