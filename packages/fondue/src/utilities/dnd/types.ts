/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
export type DraggableItem<T = Record<string, unknown>> = T & {
    id: string;
    sort: Nullable<number>;
    type?: string;
    parentId?: string;
};
