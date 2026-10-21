/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import { type EditorControlApi, PARAGRAPH, type RteSelectionSnapshot } from '#/core';

import { findPreset, isTextStyle, labelOf, type TextStyleOption } from '../helpers/presets';

import styles from './textStyleSelect.module.scss';

/** The style dropdown, controlled by the document: its value is derived from the selection on every render. */
export const TextStyleSelect = ({
    selection,
    api,
    options,
}: {
    selection: RteSelectionSnapshot;
    api: EditorControlApi;
    options: readonly TextStyleOption[];
}): ReactNode => {
    const currentBlock = selection.block;
    // A stored style this editor does not offer still renders, but the dropdown shows it as a paragraph.
    const current = isTextStyle(currentBlock) && options.includes(currentBlock.style) ? currentBlock.style : PARAGRAPH;

    const handleSelect = (selected: string | null): void => {
        if (selected === null) {
            return;
        }
        if (selected === PARAGRAPH) {
            api.blocks.setType(PARAGRAPH);
        } else {
            api.blocks.setType('textStyle', { style: selected });
        }
        // The menu returns focus to its trigger as it closes, which would undo the focus setType restored.
        requestAnimationFrame(() => api.focus());
    };

    return (
        // A Select fills its container, which in the toolbar's flex row is the whole width.
        <div className={styles.control}>
            <Select aria-label="Text style" value={current} onSelect={handleSelect}>
                {options.map((option) => (
                    // Rows preview their style; the trigger keeps the plain label so the toolbar height stays fixed.
                    <Select.Item key={option} value={option} label={labelOf(option)}>
                        <span className={styles.preview}>
                            <span className={findPreset(option)?.className}>{labelOf(option)}</span>
                        </span>
                    </Select.Item>
                ))}
            </Select>
        </div>
    );
};
