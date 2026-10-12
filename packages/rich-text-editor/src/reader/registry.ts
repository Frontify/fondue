/* (c) Copyright Frontify Ltd., all rights reserved. */

import { taskReader } from '#/features/lists-task/reader';

import { type ReaderRenderers } from './define';

/** The reader overrides of the shipped features by feature ID; a feature's own `defineReaderFeature` replaces them. */
export const SHIPPED_OVERRIDES: Readonly<Record<string, ReaderRenderers>> = { 'lists.task': taskReader };
