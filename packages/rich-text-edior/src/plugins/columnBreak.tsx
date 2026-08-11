/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from './ToolbarButton';

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
                render: () => <div data-column-break="" />,
                parseRules: [{ tag: 'div[data-column-break]' }],
            },
        ],
    },
    toolbar: (api) => (
        <ToolbarButton title="Column break" onClick={() => api.insert('columnBreak')}>
            ⇥|
        </ToolbarButton>
    ),
    // The column layout applies to the editor's content root, which is what
    // bare declarations in a plugin's styles reach.
    styles: `
columns: ${columns};
column-gap: ${typeof gap === 'number' ? `${gap}px` : gap};
div[data-column-break] {
    break-after: column;
    height: 0;
    margin: 6px 0;
    border-top: 1px dashed #d1d5db;
}
`,
});
