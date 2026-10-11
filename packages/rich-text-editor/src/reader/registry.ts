/* (c) Copyright Frontify Ltd., all rights reserved. */

import { linkReader } from '#/features/links/reader';
import { taskReader } from '#/features/lists-task/reader';
import { imageReader } from '#/features/media-image/reader';
import { mentionReader } from '#/features/mentions/reader';

import { type ReaderRenderers } from './define';

/** The reader overrides of the shipped features by feature ID; a feature's own `defineReaderFeature` replaces them. */
export const SHIPPED_OVERRIDES: Readonly<Record<string, ReaderRenderers>> = {
    links: linkReader,
    'lists.task': taskReader,
    'media.image': imageReader,
    mentions: mentionReader,
};
