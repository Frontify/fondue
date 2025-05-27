/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from './styles/badgestatus.module.scss';
import { type RgbaColor } from './types';
import { colorToCss } from './utils';

type BadgeStatusType = 'default' | 'positive' | 'highlight' | 'warning' | 'negative';

const badgeStatusMap = ['default', 'positive', 'highlight', 'warning', 'negative'];

export type BadgeStatusProps = { status: BadgeStatusType } | { status: RgbaColor | string };

const isBadgeStatusType = (value: RgbaColor | string): value is BadgeStatusType =>
    typeof value === 'string' && badgeStatusMap.includes(value);

export const BadgeStatus = ({ status }: BadgeStatusProps) => {
    const colorProps = isBadgeStatusType(status)
        ? { 'data-status': status }
        : { style: { backgroundColor: typeof status === 'string' ? status : colorToCss(status) || 'transparent' } };

    return <div data-test-id="badge-status" className={styles.root} {...colorProps}></div>;
};
