/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from './styles/badgestatus.module.scss';

type BadgeStatusType = 'default' | 'positive' | 'highlight' | 'warning' | 'negative';

export type BadgeStatusProps = {
    status: BadgeStatusType;
};

export const BadgeStatus = ({ status }: BadgeStatusProps) => {
    return <div className={styles.root}></div>;
};
