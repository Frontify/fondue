/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Value } from '@udecode/slate';

export interface BlurOnBreakPlatePlugin<V extends Value = Value> {
    onBreak?: (value: V) => void;
}
