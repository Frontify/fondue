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
    // `left` is drop level × INDENT_STEP_PX, handed to `.dragline` as a custom property;
    // the stylesheet adds the fixed row prefix so the line starts under the target
    // folder's chevron. Root-level drops (left 0) get no indent and read tree-wide.
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
