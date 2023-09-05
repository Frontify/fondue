/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { Validation } from '@utilities/validation';
import type { InputBaseProps } from 'src/types/input';

export type NumberInputProps = {
    incrementable?: boolean;
    status?: Validation;
    stepInterval?: number;
} & InputBaseProps<number>;

export enum NumberInputIncrement {
    DECREMENT,
    INCREMENT,
}
