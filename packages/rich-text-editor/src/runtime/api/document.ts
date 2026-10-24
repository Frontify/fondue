/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DocumentApi } from '../document-api';

import { blocksApi } from './blocks';
import { contentApi } from './content';
import { listsApi } from './lists';
import { marksApi } from './marks';
import { nodeStateApi } from './node-state';
import { type ApiSource } from './shared';
import { uploadsApi } from './uploads';

/** The document API over `source`, composed of its facets. */
export const documentApi = (source: ApiSource): DocumentApi => ({
    ...marksApi(source),
    ...blocksApi(source),
    ...listsApi(source),
    ...contentApi(source),
    ...nodeStateApi(source),
    ...uploadsApi(source),
});
