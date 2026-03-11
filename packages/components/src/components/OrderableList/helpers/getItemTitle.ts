/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getItemTitle = (itemId: string) =>
    document.getElementById(`orderable-item-${itemId}-title`)?.textContent ?? itemId;
