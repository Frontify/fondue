/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum DropZonePosition {
    After = "after",
    Before = "before",
}

export type DraggableItem<T = Record<string, unknown>> = T & {
    id: string;
    sort: NullableNumber;
};
