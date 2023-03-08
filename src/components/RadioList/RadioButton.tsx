/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { checkIfContainInteractiveElements } from '@utilities/elements';
import React, { useRef } from 'react';

export enum RadioButtonEmphasis {
    Default = 'Default',
    Weak = 'Weak',
}

export type RadioButtonProps = {
    value: string;
    disabled?: boolean;
    hideLabel?: boolean;
    emphasis?: RadioButtonEmphasis;
    helperText?: string;
};

export const RadioButton = ({ ...props }: RadioButtonProps) => {
    const id = useMemoizedId();
    const ref = useRef<HTMLDivElement | null>(null);
    const hasInteractiveElements = checkIfContainInteractiveElements(ref.current);

    return (
        <div
            role="tabpanel"
            ref={ref}
            id={`${id}-content`}
            aria-labelledby={id}
            tabIndex={hasInteractiveElements ? -1 : 0}
            {...props}
        />
    );
};
