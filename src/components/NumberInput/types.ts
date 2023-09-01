/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { InputBaseProps } from 'src/types/input';

export type NumberInputProps = { incrementable?: boolean } & InputBaseProps;

export enum NumberInputIncrement {
    DECREMENT,
    INCREMENT,
}
