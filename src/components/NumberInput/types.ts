/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import type { InputBaseProps } from 'src/types/input';

export type NumberInputProps = {
    incrementable?: boolean;
    status?: Validation;
    stepInterval?: number;
} & InputBaseProps;

export enum NumberInputIncrement {
    DECREMENT,
    INCREMENT,
}
