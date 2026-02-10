/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';

import { Button } from '#/components/Button/Button';
import { useTranslation } from '#/hooks/useTranslation';

import styles from '../styles/select.module.scss';

export const SelectClear = ({ onClear }: { onClear?: () => void }) => {
    const { t } = useTranslation();

    return (
        <Button
            aria-label={t('Select_clear')}
            type="button"
            size="small"
            emphasis="weak"
            aspect="square"
            onPress={onClear}
        >
            <IconCross className={styles.clearIcon} size={16} />
        </Button>
    );
};
