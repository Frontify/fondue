/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeProps } from '../types';

type SensorsActivationConstraintProps = {
    dragHandlerPosition: TreeProps['dragHandlerPosition'];
    enableDragDelay: TreeProps['enableDragDelay'];
};

type SensorsActivationConstraint = {
    delay: number;
    tolerance: number;
};

export const sensorsActivationConstraint = ({
    dragHandlerPosition,
    enableDragDelay,
}: SensorsActivationConstraintProps): SensorsActivationConstraint => {
    const delay = enableDragDelay ? 150 : 0;
    return dragHandlerPosition === 'none' ? { delay, tolerance: 5 } : { delay: 0, tolerance: 5 };
};
