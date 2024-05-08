/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as LabelPrimitive from '@radix-ui/react-label';
import { type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

export type LabelProps = {
    children: ReactNode;
    htmlFor: string;
    required?: boolean;
    className?: string;
    'data-test-id'?: string;
};

export const LabelComponent = (
    { className, 'data-test-id': dataTestId = 'fondue-label', ...props }: LabelProps,
    ref: ForwardedRef<HTMLLabelElement>,
) => {
    return (
        <LabelPrimitive.Root
            ref={ref}
            data-required={props.required}
            className={cn(
                'tw-group tw-inline-flex tw-font-sans tw-font-medium tw-text-body-medium tw-text-text-weak group-hover:tw-text-text-weak-hover',
                // Disabled state if siblings has disabled state
                'has-[+_*_:disabled]:tw-text-text-disabled has-[~_:disabled]:tw-cursor-not-allowed peer-disabled:tw-text-text-disabled peer-disabled:tw-cursor-not-allowed',
                // Required asterisk
                'after:tw-hidden data-[required="true"]:after:tw-inline-flex after:tw-content-["*"] after:tw-pl-0.5 after:tw-font-sans after:tw-text-body-small after:tw-font-medium after:tw-text-text-negative group-hover:tw-text-text-negative-hover',
                className,
            )}
            data-test-id={dataTestId}
            {...props}
        />
    );
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(LabelComponent);
Label.displayName = 'Label';
