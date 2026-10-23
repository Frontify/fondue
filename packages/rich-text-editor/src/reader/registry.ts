/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReaderRenderers } from './define';

/** The reader overrides of the shipped features by feature ID; a feature's own `defineReaderFeature` replaces them. */
export const SHIPPED_OVERRIDES: Readonly<Record<string, ReaderRenderers>> = {};
