/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';

import { useMemoizedId } from '@hooks/useMemoizedId';
import { checkIfContainInteractiveElements } from '@utilities/elements';

/**
 * @deprecated Use `RadioList` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#radiolist the migration guide}.
 */
export enum RadioButtonEmphasis {
    Weak = 'Weak',
}

/**
 * @deprecated Use `RadioList` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#radiolist the migration guide}.
 */
export type RadioButtonProps = {
    value: string;
    disabled?: boolean;
    hideLabel?: boolean;
    emphasis?: RadioButtonEmphasis;
    helperText?: string;
    tooltip?: string;
};

/**
 * @deprecated Use `RadioList` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#radiolist the migration guide}.
 */
export const RadioButton = ({ ...props }: RadioButtonProps) => {
    const id = useMemoizedId();
    const ref = useRef<HTMLDivElement | null>(null);
    // eslint-disable-next-line react-hooks/refs
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
