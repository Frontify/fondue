/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The feature whose slots the uploads fill, and whose policy decides whether they may. */
export const UPLOAD_FEATURE = 'media.image';
/** What `media.image` accepts when its `acceptTypes` option is not set: no SVG, which can hold script. */
export const DEFAULT_ACCEPT_TYPES: readonly string[] = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
    'image/avif',
];
/** The most pixels an image may have on either side. */
export const MAX_IMAGE_SIDE = 65_535;
/** The transaction meta of an upload's completion, which ends no upload of its slot. */
export const FILL_META = 'rte.upload-fill';
export const POOL = 'uploads';
