/* (c) Copyright Frontify Ltd., all rights reserved. */

export type DraggableItem<T = Record<string, unknown>> = T & {
    id: string;
    sort: Nullable<number>;
    type?: string;
};
