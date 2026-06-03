/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { LoadingCircle } from '../../LoadingCircle/LoadingCircle';
import styles from '../styles/tree.module.scss';

type TreeLoadingRowProps = {
    level: number;
    label?: string;
};

export const TreeLoadingRow = ({ level, label }: TreeLoadingRowProps) => {
    const { t } = useTranslation();
    return (
        <div className={styles.loadingRow} aria-live="polite" aria-busy="true">
            <div className={styles.loadingItem} style={{ '--tree-row-level': Math.max(0, level) } as CSSProperties}>
                <span className={styles.indent} aria-hidden />
                <span className={styles.spinner} aria-hidden>
                    <LoadingCircle size="xx-small" />
                </span>
                <span className={styles.loadingLabel}>{label ?? t('Tree_loading')}</span>
            </div>
        </div>
    );
};
