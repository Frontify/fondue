/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by tablePaste.ct.tsx.

import { RichTextEditor } from '../../index';
import { boldPlugin, tablePlugin } from '../../plugins';

import { EMPTY_DOCUMENT } from './tablePasteValues';

const PLUGINS_WITH_TABLE = [boldPlugin(), tablePlugin()];
const PLUGINS_WITHOUT_TABLE = [boldPlugin()];

/** Two editors that differ in whether a plugin reads tables. */
export const TablePasteFrame = () => (
    <>
        <div data-testid="with-table">
            <RichTextEditor value={EMPTY_DOCUMENT} plugins={PLUGINS_WITH_TABLE} />
        </div>
        <div data-testid="without-table">
            <RichTextEditor value={EMPTY_DOCUMENT} plugins={PLUGINS_WITHOUT_TABLE} />
        </div>
    </>
);
