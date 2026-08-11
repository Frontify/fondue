/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './columnBreak.module.scss';

/** The void block this plugin adds: where the next column starts. */
export type ColumnBreakBlock = {
    type: 'columnBreak';
};

/**
 * Lays the content out in columns and lets the author say where each one ends.
 * Configurable, so it is a factory rather than a plain object: the column count
 * belongs to the editor instance, not to the document.
 */
export const createColumnBreakPlugin = ({
    columns = 2,
    gap = 'normal',
}: { columns?: number; gap?: string | number } = {}): RtePlugin => ({
    id: 'column-break',
    schema: {
        blocks: [
            {
                type: 'columnBreak',
                isVoid: true,
                render: () => <div data-column-break="" className={styles.break} />,
                parseRules: [{ tag: 'div[data-column-break]' }],
            },
        ],
    },
    toolbar: (api) => (
        <ToolbarButton title="Column break" onClick={() => api.insert('columnBreak')}>
            ⇥|
        </ToolbarButton>
    ),
    // The layout belongs to the content as a whole, so it goes on the editable
    // element; the arguments reach the stylesheet as custom properties.
    contentClassName: styles.columns,
    contentProperties: {
        '--rte-columns': String(columns),
        '--rte-column-gap': typeof gap === 'number' ? `${gap}px` : gap,
    },
});
