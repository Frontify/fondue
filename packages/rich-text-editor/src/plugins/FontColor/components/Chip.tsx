/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import styles from '../styles/color.module.scss';

export type ChipProps = {
    color: string;
};

/** A colour as a filled chip with a border, over a checkerboard that shows its translucency. */
export const Chip = ({ color }: ChipProps) => (
    <span
        className={styles.chip}
        style={{ '--rte-chip-color': color } as CSSProperties}
        data-rte-swatch=""
        aria-hidden
    />
);

Chip.displayName = 'Chip';
