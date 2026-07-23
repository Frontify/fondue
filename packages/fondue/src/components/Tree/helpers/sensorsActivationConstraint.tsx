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

/**
 * @deprecated Please use updated Tree component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tree the migration guide}.
 */
export const sensorsActivationConstraint = ({
    dragHandlerPosition,
    enableDragDelay,
}: SensorsActivationConstraintProps): SensorsActivationConstraint => {
    const delay = enableDragDelay ? 150 : 0;
    return dragHandlerPosition === 'none' ? { delay, tolerance: 5 } : { delay: 0, tolerance: 5 };
};
