/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocument } from '../../index';

/** A table of two rows and two cells, as another application puts it on the clipboard. */
export const TABLE_HTML = '<table><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>';

export const CELL_TEXTS = ['a', 'b', 'c', 'd'];

/** What a table pastes as in an editor with no plugin that reads tables: one line per row. */
export const ROW_TEXTS = ['a b', 'c d'];

export const EMPTY_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
};
