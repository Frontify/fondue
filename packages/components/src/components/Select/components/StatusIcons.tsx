/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconExclamationMarkTriangle } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import styles from '../styles/select.module.scss';
import { useTranslation } from '#/hooks/useTranslation';

type StatusIconsProps = {
    /** The current status of the component. */
    status: 'neutral' | 'success' | 'error';
    /** Whether the component is in an error state (may differ from status when validation is involved). */
    hasError: boolean;
    /** The data-test-id prefix for the icons. */
    dataTestId: string;
};

export const StatusIcons = ({ status, hasError, dataTestId }: StatusIconsProps): ReactNode => {
    const { t } = useTranslation();
    return (
        <>
            {status === 'success' ? (
                <IconCheckMark
                    size={16}
                    className={styles.iconSuccess}
                    data-test-id={`${dataTestId}-success-icon`}
                    aria-hidden="true"
                />
            ) : null}
            {hasError ? (
                <>
                    <IconExclamationMarkTriangle
                        size={16}
                        className={styles.iconError}
                        data-test-id={`${dataTestId}-error-icon`}
                        aria-hidden="true"
                    />
                    <span className={styles.srOnly} role="alert">
                        {t('Select_error')}
                    </span>
                </>
            ) : null}
        </>
    );
};
