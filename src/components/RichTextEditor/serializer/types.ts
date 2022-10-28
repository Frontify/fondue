/* (c) Copyright Frontify Ltd., all rights reserved. */

export interface Transformer<T, R> {
    process(value: T): R;
}
