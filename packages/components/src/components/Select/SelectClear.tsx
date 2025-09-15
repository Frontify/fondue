/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';

import { Button } from '../Button/Button';

import styles from './styles/select.module.scss';

export const SelectClear = ({ onClear }: { onClear?: () => void }) => {
    return (
        <Button aria-label="clear input" type="button" size="small" emphasis="weak" aspect="square" onPress={onClear}>
            <IconCross className={styles.clearIcon} size={16} />
        </Button>
    );
};
