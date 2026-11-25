/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by linkPaste.ct.tsx.

import { RichTextEditor, type RteDocument } from '../../index';
import { linkPlugin } from '../../plugins';

const PLUGINS = [linkPlugin()];

const EMPTY_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
};

export const LinkPasteFrame = () => (
    <div data-test-id="link-paste">
        <RichTextEditor value={EMPTY_DOCUMENT} plugins={PLUGINS} />
    </div>
);
