/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type InputBaseProps } from '../../types/input';

export type NumberInputProps = {
    controls?: boolean;
    stepInterval?: number;
} & InputBaseProps<number>;

export enum NumberInputIncrement {
    DECREMENT,
    INCREMENT,
}
