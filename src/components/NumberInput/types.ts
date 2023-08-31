/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputBaseProps } from 'src/types/inupt';

export type NumberInputProps = { incrementable?: boolean } & InputBaseProps;

export enum NumberInputIncrement {
    DECREMENT,
    INCREMENT,
}
