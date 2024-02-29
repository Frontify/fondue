/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';

const EXCLUDES = ['node_modules', '.contentlayer', 'dist', 'package.json', 'tsconfig.json', 'tsconfig.node.json'];
const FONDUE_COMPONENTS_PATH = 'node_modules/@frontify/fondue-components';

const Component = defineDocumentType(() => ({
    name: 'Component',
    filePathPattern: `${FONDUE_COMPONENTS_PATH}/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        type: { type: 'string', required: false },
        exportedName: { type: 'string', required: false },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => doc._raw.sourceFileDir.toLocaleLowerCase(),
        },
        route: {
            type: 'string',
            resolve: (doc) => {
                const pathArray = doc._raw.flattenedPath.toLocaleLowerCase().split('/');
                if (pathArray.at(-1) === pathArray.at(-2)) {
                    return pathArray.at(-2);
                } else {
                    return pathArray.slice(-2).join('/');
                }
            },
        },
        parentFolder: {
            type: 'string',
            resolve: (doc) => doc._raw.sourceFileDir.toLocaleLowerCase().split('/').at(-1),
        },
    },
}));

const sources: ReturnType<typeof makeSource> = makeSource({
    contentDirPath: '.',
    contentDirInclude: [FONDUE_COMPONENTS_PATH],
    contentDirExclude: [...EXCLUDES, ...EXCLUDES.map((path) => `${FONDUE_COMPONENTS_PATH}/${path}`)],
    documentTypes: [Component],
    mdx: {
        remarkPlugins: [remarkGfm],
    },
});

export default sources;
