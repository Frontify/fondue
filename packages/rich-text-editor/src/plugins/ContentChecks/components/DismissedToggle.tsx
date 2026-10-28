/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, Label } from '@frontify/fondue-components';

import styles from '../styles/checks.module.scss';

export type DismissedToggleProps = {
    id: string;
    value: boolean;
    label: string;
    onToggle: () => void;
};

/** Shows dismissed issues again. */
export const DismissedToggle = ({ id, value, label, onToggle }: DismissedToggleProps) => (
    <div className={styles.option}>
        <Checkbox id={id} value={value} onChange={onToggle} />
        <Label htmlFor={id}>{label}</Label>
    </div>
);

DismissedToggle.displayName = 'DismissedToggle';
