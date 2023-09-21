/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeProps } from '../types';

export const sensorsActivationConstraint: (dragHandlerPosition: TreeProps['dragHandlerPosition']) => {
    delay: number;
    tolerance: number;
} = (dragHandlerPosition) => {
    return dragHandlerPosition === 'none' ? { delay: 150, tolerance: 2 } : { delay: 0, tolerance: 0 };
};
