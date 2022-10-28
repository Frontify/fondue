/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Unknown = unknown;

export interface Transformer<T extends Unknown = Unknown> {
    process(value: T): unknown;
}
