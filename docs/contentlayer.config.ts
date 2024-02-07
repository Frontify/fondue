/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Component = defineDocumentType(() => ({
    name: 'Component',
    filePathPattern: '**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => doc._raw.sourceFileDir.toLocaleLowerCase(),
        },
        route: {
            type: 'string',
            resolve: (doc) => doc._raw.sourceFileDir.toLocaleLowerCase().split('/').at(-1),
        },
    },
}));

export default makeSource({
    contentDirPath: 'node_modules/@frontify/fondue-components',
    documentTypes: [Component],
});
