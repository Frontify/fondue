/* (c) Copyright Frontify Ltd., all rights reserved. */

export interface Transformer<T = unknown, R = unknown> {
    process(value: T): R;
}
