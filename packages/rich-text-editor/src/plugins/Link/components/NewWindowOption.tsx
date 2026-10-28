/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, Label } from '@frontify/fondue-components';

import styles from '../styles/links.module.scss';

export type NewWindowOptionProps = {
    id: string;
    label: string;
    value: boolean;
    onToggle: () => void;
};

/** The "Open in new window" checkbox with its label. */
export const NewWindowOption = ({ id, label, value, onToggle }: NewWindowOptionProps) => (
    <div className={styles.option}>
        <Checkbox id={id} value={value} onChange={onToggle} />
        <Label htmlFor={id}>{label}</Label>
    </div>
);

NewWindowOption.displayName = 'NewWindowOption';
