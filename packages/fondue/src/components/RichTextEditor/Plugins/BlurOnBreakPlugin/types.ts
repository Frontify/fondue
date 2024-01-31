/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Value } from '@udecode/plate';

export interface BlurOnBreakPlatePlugin<V extends Value = Value> {
    onBreak?: (value: V) => void;
}
