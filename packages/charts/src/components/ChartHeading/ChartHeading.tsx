/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './ChartHeading.module.scss';

export type ChartHeadingProps = {
    title: ReactNode | string;
    description?: string;
    icon?: ReactNode;
};
export const ChartHeading = ({ title, description, icon }: ChartHeadingProps) => {
    return (
        <div className={styles.root}>
            <div className={styles.titleRow}>
                <span className={styles.title}>{title}</span>
                {icon}
            </div>
            {description && (
                <div className={styles.descriptionWrapper}>
                    <span className={styles.description}>{description}</span>
                </div>
            )}
        </div>
    );
};
