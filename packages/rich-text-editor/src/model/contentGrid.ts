/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeNode } from './contentTree';

/** The cells of a `table` form a rectangular grid with consistent column widths, as `TableMap` needs. */
export const isGrid = (rows: readonly TreeNode[]): boolean => {
    const span = (cell: TreeNode, name: 'colspan' | 'rowspan') => {
        const value = cell.attrs?.[name];

        return typeof value === 'number' ? value : 1;
    };

    const cellsOf = (row: TreeNode | undefined) => (row === undefined ? [] : (row.content ?? []));
    const height = rows.length;
    let width = 0;
    let area = 0;
    /** The columns that cells of earlier rows span into each row. */
    const covered = new Float64Array(height);
    for (const [index, row] of rows.entries()) {
        let rowWidth = covered[index] ?? 0;
        for (const cell of cellsOf(row)) {
            const colspan = span(cell, 'colspan');
            const rowspan = span(cell, 'rowspan');
            rowWidth += colspan;
            area += colspan * rowspan;
            for (let below = index + 1; below < Math.min(index + rowspan, height); below += 1) {
                covered[below] = (covered[below] ?? 0) + colspan;
            }
        }

        width = Math.max(width, rowWidth);
    }

    // A grid with no overlap or gap tiles exactly, which bounds the fill below by the cells' own area.
    if (width === 0 || area !== width * height) {
        return false;
    }

    const filled = new Uint8Array(area);
    const columnWidths = new Float64Array(width).fill(-1);
    let position = 0;
    for (const [index, row] of rows.entries()) {
        for (const cell of cellsOf(row)) {
            while (position < area && filled[position] === 1) {
                position += 1;
            }

            const colspan = span(cell, 'colspan');
            const colwidth = cell.attrs?.colwidth;
            const widths = Array.isArray(colwidth) ? (colwidth as readonly unknown[]) : null;
            if (position >= (index + 1) * width || (widths !== null && widths.length !== colspan)) {
                return false;
            }

            for (let down = 0; down < span(cell, 'rowspan'); down += 1) {
                const start = position + down * width;
                if (index + down >= height || (start % width) + colspan > width) {
                    return false;
                }

                for (let across = 0; across < colspan; across += 1) {
                    const column = (start + across) % width;
                    const columnWidth = widths === null ? 0 : Number(widths[across]);
                    const seen = columnWidths[column] ?? -1;
                    if (filled[start + across] === 1 || (seen !== -1 && seen !== columnWidth)) {
                        return false;
                    }

                    filled[start + across] = 1;
                    columnWidths[column] = columnWidth;
                }
            }

            position += colspan;
        }

        for (; position < (index + 1) * width; position += 1) {
            if (filled[position] !== 1) {
                return false;
            }
        }
    }

    return true;
};
