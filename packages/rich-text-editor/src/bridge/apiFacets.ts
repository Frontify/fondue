/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DocumentApi } from '#/runtime/document-api';

import { type EditorHosts } from './plugin';

/**
 * What plugin commands and plugin UI act through, with no engine type: reads of the selection and content, writes that
 * each run as one undo step, mapped targets, and the editor's hosts. Inside a command, writes join the command's one
 * undo step and host actions wait until the command has run.
 */
export type EditorApi<N extends EditorFacet = EditorFacet> = EditorControlApi & Pick<EditorFacets, N>;

// `uploads` is optional in the document API, but a part that declares it reads it as a facet.
type EveryMember = Required<DocumentApi> & EditorHosts;

type FacetName = {
    [K in keyof EveryMember]: EveryMember[K] extends (...args: never[]) => unknown
        ? never
        : EveryMember[K] extends object
          ? K
          : never;
}[keyof EveryMember];

/** The object-valued members of the API, which a part declares in `needs` before its functions can read them. */
export type EditorFacets = Pick<EveryMember, FacetName>;

/** One of the API's facets, such as `marks` or `overlays`. */
export type EditorFacet = keyof EditorFacets;

/** The members of the API that every part's functions get: reads, `select`, strings and the live region. */
export type EditorControlApi = Omit<EveryMember, FacetName>;
