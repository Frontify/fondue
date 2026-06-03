/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from '../styles/tree.module.scss';

type DragLineData = {
    top: number;
    width: number;
} | null;

type TreeDragLineProps = {
    data: DragLineData;
};

export const TreeDragLine = ({ data }: TreeDragLineProps) => (
    <div className={styles.dragline} style={{ top: data?.top, width: data?.width, left: 0 }} aria-hidden />
);
