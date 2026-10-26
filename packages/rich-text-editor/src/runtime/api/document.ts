/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compiledModel } from '#/model/internal';

import { UPLOAD_FEATURE } from '../capabilities/media/uploads/constants';
import { type DocumentApi } from '../documentApi';

import { blocksApi } from './blocks';
import { contentApi } from './content';
import { listsApi } from './lists';
import { marksApi } from './marks';
import { nodeStateApi } from './nodeState';
import { type ApiSource } from './shared';
import { uploadsApi } from './uploads';

/** The document API over `source`, composed of its facets. */
export const documentApi = (source: ApiSource): DocumentApi => {
    const api = {
        ...marksApi(source),
        ...blocksApi(source),
        ...listsApi(source),
        ...contentApi(source),
        ...nodeStateApi(source),
    };
    // The facet follows the model, so a command run with no session still cancels a slot in its state.
    if (!compiledModel(source.model).features.some(({ id }) => id === UPLOAD_FEATURE)) {
        return api;
    }

    return { ...api, ...uploadsApi(source) };
};
