/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import { type EditorControlApi, type RtePlugin } from '#/RichTextEditor';

import styles from './fontColor.module.scss';

/** The value this plugin sets on text nodes. */
export type FontColorMark = {
    fontColor?: { color: string };
};

/** The Select value standing for "no colour set", which removes the mark. */
const DEFAULT = 'default';

const COLORS: { name: string; value: string }[] = [
    { name: 'Red', value: '#e11d48' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Violet', value: '#7c3aed' },
    { name: 'Grey', value: '#6b7280' },
];

/**
 * The colour dropdown. Its value comes from the document (`getMarkValue`), so
 * the control shows what the selection actually carries rather than local state.
 */
const ColorSelect = ({ api }: { api: EditorControlApi }): ReactNode => {
    const current = api.getMarkValue('fontColor')?.color;

    const handleSelect = (selected: string | null): void => {
        if (selected === null) {
            return;
        }
        // A value-carrying mark has to be cleared before it can be re-set:
        // toggling on top of an existing colour would only remove it.
        if (api.isMarkActive('fontColor')) {
            api.toggleMark('fontColor');
        }
        if (selected !== DEFAULT) {
            api.toggleMark('fontColor', { color: selected });
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

export const FontColorPlugin: RtePlugin = {
    id: 'font-color',
    schema: {
        marks: [
            {
                key: 'fontColor',
                attributes: { color: { parseFromStyle: 'color' } },
                // Underline and strikethrough draw their line in the colour of
                // their own element, which a descendant cannot change — so the
                // colour has to be set on an element that wraps them.
                nesting: -1,
                render: ({ value, children }) => <span style={{ color: String(value.color) }}>{children}</span>,
            },
        ],
    },
    toolbar: (api) => <ColorSelect api={api} />,
};
