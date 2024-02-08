/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const EXCLUDES = ['node_modules', '.contentlayer', 'dist', 'package.json', 'tsconfig.json', 'tsconfig.node.json'];
const FONDUE_COMPONENTS_PATH = 'node_modules/@frontify/fondue-components';

const Component = defineDocumentType(() => ({
    name: 'Component',
    filePathPattern: `${FONDUE_COMPONENTS_PATH}/**/*.mdx`,
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

const Icon = defineDocumentType(() => ({
    name: 'Icon',
    filePathPattern: `**/*.mdx`, // To be changed with the package path
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

const Token = defineDocumentType(() => ({
    name: 'Token',
    filePathPattern: `**/*.mdx`, // To be changed with the package path
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
    contentDirPath: '.',
    contentDirInclude: [FONDUE_COMPONENTS_PATH],
    contentDirExclude: [...EXCLUDES, ...EXCLUDES.map((path) => `${FONDUE_COMPONENTS_PATH}/${path}`)],
    documentTypes: [Component, Icon, Token],
});
