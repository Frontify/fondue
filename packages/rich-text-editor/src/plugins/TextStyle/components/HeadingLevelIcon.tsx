/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type RteIcon } from '#/core';

import styles from './headingLevelIcon.module.scss';

type HeadingLevelIconProps = { level: number };

/** "H2" drawn at icon size: the icon set has a mark for the first level only. */
export const HeadingLevelIcon = ({ level }: HeadingLevelIconProps): ReactNode => (
    <span aria-hidden className={styles.icon}>
        H{level}
    </span>
);

/** The level's mark as an icon component, which is what a menu command takes. */
export const headingLevelIcon = (level: number): RteIcon => {
    const Icon: RteIcon = () => <HeadingLevelIcon level={level} />;
    return Icon;
};
