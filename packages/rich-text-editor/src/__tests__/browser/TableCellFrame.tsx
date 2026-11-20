/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by tableCell.ct.tsx.

import { RichTextEditor, RichTextRenderer } from '../../index';
import { tablePlugin, textStylePlugin } from '../../plugins';

import { TABLE_DOCUMENT } from './tableCellValues';

const PLUGINS = [textStylePlugin(), tablePlugin()];

/** The renderer and the editor side by side, drawing the same table. */
export const TableCellFrame = () => (
    <>
        <div data-test-id="renderer">
            <RichTextRenderer value={TABLE_DOCUMENT} plugins={PLUGINS} />
        </div>
        <div data-test-id="editor">
            <RichTextEditor value={TABLE_DOCUMENT} plugins={PLUGINS} />
        </div>
    </>
);
