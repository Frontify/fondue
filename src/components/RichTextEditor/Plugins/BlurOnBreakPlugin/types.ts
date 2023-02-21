/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Value } from '@udecode/plate';

export type BlurOnBreakPlatePlugin<V extends Value = Value> = {
    onBreak: (value: V) => void;
};
