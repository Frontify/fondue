/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { useId } from 'react';

import { CheckedSlot } from '#/bridge/pluginApi/define';

import styles from '../styles/color.module.scss';

import { Chip } from './Chip';

export type ColorRowProps = {
    label: string;
    description: string | undefined;
    color: string | undefined;
    checked: boolean;
    onSelect: (event: Event) => void;
};

/**
 * A row of the colour menu, a `menuitemradio` named `label` and described by `description`, with a check mark when
 * checked.
 */
export const ColorRow = ({ label, description, color, checked, onSelect }: ColorRowProps) => {
    const descriptionId = useId();
    let describedBy: string | undefined;
    if (description !== undefined) {
        describedBy = descriptionId;
    }

    return (
        <Dropdown.Item
            // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
            {...{
                role: 'menuitemradio',
                'aria-checked': checked,
                'aria-label': label,
                'aria-describedby': describedBy,
            }}
            onSelect={onSelect}
        >
            <span className={styles.swatch}>
                {color !== undefined && <Chip color={color} />}
                <span>{label}</span>
                {description !== undefined && (
                    <span id={descriptionId} className={styles.description}>
                        {description}
                    </span>
                )}
            </span>
            {checked && <CheckedSlot />}
        </Dropdown.Item>
    );
};

ColorRow.displayName = 'ColorRow';
