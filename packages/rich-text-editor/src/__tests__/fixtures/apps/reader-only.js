/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextReader } from '@frontify/rich-text-editor/reader';

// A host that renders stored content imports only the reader entry; the call keeps the import in the bundle.
console.info(RichTextReader);
