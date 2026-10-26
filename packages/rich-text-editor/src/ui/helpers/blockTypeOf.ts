/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPort, selectionBlockName } from '#/runtime/port';

/** The type of the block that holds the selection's start, which the brand style rows apply to. */
export const blockTypeOf = (session: EditorPort | undefined): string => selectionBlockName(session);
