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

const HeadingLevel1Icon: RteIcon = () => <HeadingLevelIcon level={1} />;
const HeadingLevel2Icon: RteIcon = () => <HeadingLevelIcon level={2} />;
const HeadingLevel3Icon: RteIcon = () => <HeadingLevelIcon level={3} />;
const HeadingLevel4Icon: RteIcon = () => <HeadingLevelIcon level={4} />;

/** Each heading level's mark as an icon component, which is what a menu command takes */
export const HEADING_LEVEL_ICONS: Partial<Record<number, RteIcon>> = {
    1: HeadingLevel1Icon,
    2: HeadingLevel2Icon,
    3: HeadingLevel3Icon,
    4: HeadingLevel4Icon,
};
