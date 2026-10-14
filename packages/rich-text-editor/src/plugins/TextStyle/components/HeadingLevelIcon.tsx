/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './headingLevelIcon.module.scss';

/** "H2" drawn at icon size: the icon set has a mark for the first level only. */
export const HeadingLevelIcon = ({ level }: { level: number }): ReactNode => (
    <span aria-hidden className={styles.icon}>
        H{level}
    </span>
);
