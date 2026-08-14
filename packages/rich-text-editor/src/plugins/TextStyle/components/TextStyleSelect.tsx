/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import { type EditorControlApi, PARAGRAPH } from '#/domain';

import { findPreset, isTextStyle, labelOf, type TextStyleOption } from '../helpers/presets';

import styles from './textStyleSelect.module.scss';

/**
 * The style dropdown. Its value is derived from the document on every render
 * (the toolbar re-renders on every editor state change), so the Select is fully
 * controlled by the editor, never by local state.
 */
export const TextStyleSelect = ({
    api,
    options,
}: {
    api: EditorControlApi;
    options: readonly TextStyleOption[];
}): ReactNode => {
    const currentBlock = api.selection.get().block;
    // A stored document may carry a style this editor was not configured with.
    // It still renders, but the dropdown can only show what it offers, so
    // anything else reads as the paragraph baseline.
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
        // The menu hands focus back to its own trigger as it closes, which
        // would undo the focus setType already restored.
        requestAnimationFrame(() => api.focus());
    };

    return (
        // A Select fills its container, and in the toolbar's flex row that
        // means the whole width — so the plugin gives it a box to fill.
        <div className={styles.control}>
            <Select aria-label="Text style" value={current} onSelect={handleSelect}>
                {options.map((option) => (
                    // Each row is drawn in the style it applies, so the menu
                    // previews the scale. The trigger keeps the plain label
                    // (`showStringValue`, on by default): styling that too
                    // would change the toolbar's height with every selection.
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
