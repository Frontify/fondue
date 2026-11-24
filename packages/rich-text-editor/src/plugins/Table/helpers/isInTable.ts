/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteSelectionSnapshot } from '#/core';

export const isInTable = (selection: RteSelectionSnapshot): boolean =>
    selection.blocks.some((block) => block.type === 'table');
