/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum DropZonePosition {
    After = 'after',
    Before = 'before',
    Within = 'within',
}

export type DraggableItem<T = Record<string, unknown>> = T & {
    id: string;
    sort: NullableNumber;
};
