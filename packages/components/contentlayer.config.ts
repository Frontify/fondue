/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Component = defineDocumentType(() => ({
    name: 'Component',
    filePathPattern: '**/*.md',
    fields: {
        title: { type: 'string', required: true },
    },
}));

export default makeSource({
    contentDirPath: 'src/components',
    documentTypes: [Component],
});
