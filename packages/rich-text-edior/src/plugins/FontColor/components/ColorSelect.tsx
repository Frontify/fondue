/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import { type EditorControlApi } from '#/RichTextEditor';

import { COLORS, DEFAULT } from '../helpers/colors';

import styles from './colorSelect.module.scss';

/**
 * The colour dropdown. Its value comes from the document (the selection
 * snapshot), so the control shows what the selection actually carries rather
 * than local state.
 */
export const ColorSelect = ({ api }: { api: EditorControlApi }): ReactNode => {
    const current = api.selection.get().marks.fontColor?.color;

    const handleSelect = (selected: string | null): void => {
        if (selected === null) {
            return;
        }
        // A value-carrying mark has to be cleared before it can be re-set:
        // toggling on top of an existing colour would only remove it.
        if ('fontColor' in api.selection.get().marks) {
            api.marks.toggle('fontColor');
        }
        if (selected !== DEFAULT) {
            api.marks.toggle('fontColor', { color: selected });
        }
        requestAnimationFrame(() => api.focus());
    };

    return (
        // A Select fills its container, and in the toolbar's flex row that means
        // the whole width — so the plugin gives it a box to fill.
        <div className={styles.control}>
            <Select
                aria-label="Text colour"
                value={typeof current === 'string' ? current : DEFAULT}
                onSelect={handleSelect}
            >
                <Select.Item value={DEFAULT}>Colour</Select.Item>
                {COLORS.map((color) => (
                    <Select.Item key={color.value} value={color.value}>
                        {color.name}
                    </Select.Item>
                ))}
            </Select>
        </div>
    );
};
