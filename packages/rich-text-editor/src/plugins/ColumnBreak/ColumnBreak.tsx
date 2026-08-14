/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextColumnBreak } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './columnBreak.module.scss';

/** The void block this plugin adds: where the next column starts. */
export type ColumnBreakBlock = {
    type: 'columnBreak';
};

type ColumnBreakPluginOptions = {
    /** How many columns the content is laid out in. */
    columns?: number;
    /** The gap between them — a CSS length, or a number of pixels. */
    gap?: string | number;
};

/**
 * Lays the content out in columns and lets the author say where each one ends.
 * The column count belongs to the editor instance rather than to the document,
 * which is why it is an option.
 */
export const columnBreakPlugin = ({ columns = 2, gap = 'normal' }: ColumnBreakPluginOptions = {}): RtePlugin => ({
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
            <IconTextColumnBreak size={16} />
        </ToolbarButton>
    ),
    // The layout belongs to the content as a whole, so it goes on the editable
    // element; the options reach the stylesheet as custom properties.
    contentClassName: styles.columns,
    contentProperties: {
        '--rte-columns': String(columns),
        '--rte-column-gap': typeof gap === 'number' ? `${gap}px` : gap,
    },
});
