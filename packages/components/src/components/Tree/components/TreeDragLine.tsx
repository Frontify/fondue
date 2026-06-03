/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '../styles/tree.module.scss';

type DragLineData = {
    top: number;
} | null;

type TreeDragLineProps = {
    data: DragLineData;
};

export const TreeDragLine = ({ data }: TreeDragLineProps) => {
    if (!data) {
        return null;
    }
    // Always full-width — we only consume the vertical position from headless-tree and
    // ignore its computed left/width so the indicator reads as a single tree-wide line.
    return <div className={styles.dragline} style={{ top: data.top, left: 0, right: 0 }} aria-hidden />;
};
