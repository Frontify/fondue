/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { LoadingCircle } from '../../LoadingCircle/LoadingCircle';
import styles from '../styles/tree.module.scss';

type TreeLoadingRowProps = {
    level: number;
    label?: string;
    multiSelect: boolean;
    reorderable: boolean;
};

export const TreeLoadingRow = ({ level, label, multiSelect, reorderable }: TreeLoadingRowProps) => {
    const { t } = useTranslation();
    return (
        <div className={styles.loadingRow} aria-live="polite" aria-busy="true">
            <div className={styles.loadingItem} style={{ '--tree-row-level': Math.max(0, level) } as CSSProperties}>
                {/* Empty slots mirror `.item`'s grid columns so the label lines up with real rows. */}
                {reorderable && <span className={styles.handle} aria-hidden />}
                {multiSelect && <span className={styles.spinner} aria-hidden />}
                <span className={styles.indent} aria-hidden />
                <span className={styles.chevron} aria-hidden />
                <span className={styles.spinner} aria-hidden>
                    <LoadingCircle size="xx-small" />
                </span>
                <span className={styles.loadingLabel}>{label ?? t('Tree_loading')}</span>
            </div>
        </div>
    );
};
