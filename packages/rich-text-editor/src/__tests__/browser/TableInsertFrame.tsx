/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by tableInsert.ct.tsx.

import { RichTextEditor } from '../../index';
import { boldPlugin, tablePlugin } from '../../plugins';

import { EMPTY_DOCUMENT } from './tablePasteValues';

const PLUGINS = [boldPlugin(), tablePlugin()];

/** An empty editor whose toolbar holds Bold before the table controls, so the keyboard has a button to move past. */
export const TableInsertFrame = () => <RichTextEditor value={EMPTY_DOCUMENT} plugins={PLUGINS} />;
