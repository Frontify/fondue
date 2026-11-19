/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlock, type RteDocumentWith } from '../../index';

type TableCellBlock = {
    type: 'tableCell';
    colspan: number;
    rowspan: number;
    children: RteBlock[];
};

type TableBlock = {
    type: 'table';
    children: [{ type: 'tableRow'; children: TableCellBlock[] }];
};

const paragraph = (text: string): RteBlock => ({ type: 'paragraph', children: [{ text }] });

export const FIRST_IN_CELL = 'First in cell';
export const MIDDLE_IN_CELL = 'Middle in cell';
export const LAST_IN_CELL = 'Last in cell';

/** A paragraph, then a table whose one cell holds three paragraphs. */
export const TABLE_DOCUMENT: RteDocumentWith<{ block: RteBlock | TableBlock }> = {
    version: 1,
    blocks: [
        paragraph('Before'),
        {
            type: 'table',
            children: [
                {
                    type: 'tableRow',
                    children: [
                        {
                            type: 'tableCell',
                            colspan: 1,
                            rowspan: 1,
                            children: [paragraph(FIRST_IN_CELL), paragraph(MIDDLE_IN_CELL), paragraph(LAST_IN_CELL)],
                        },
                    ],
                },
            ],
        },
    ],
};
