/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '../../types';
import { type SchemaBundle } from '../schema';

import { createBlockApi } from './blocks';
import { createListApi } from './lists';
import { createMarkApi } from './marks';
import { createNodeApi } from './nodes';
import { createTextApi } from './text';

/**
 * The EditorControlApi, assembled from one part per thing it acts on. Every part
 * is a plain object of methods closing over the live view, so a plugin always
 * reads and writes the current state.
 */
export const createApi = (view: EditorView, bundle: SchemaBundle): EditorControlApi => ({
    ...createMarkApi(view, bundle.schema),
    ...createBlockApi(view, bundle.schema),
    ...createNodeApi(view, bundle.schema),
    ...createListApi(view, bundle),
    ...createTextApi(view),
});
