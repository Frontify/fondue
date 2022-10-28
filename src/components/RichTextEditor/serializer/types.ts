/* (c) Copyright Frontify Ltd., all rights reserved. */

export interface Transformer {
    process(data: string): unknown;
}
