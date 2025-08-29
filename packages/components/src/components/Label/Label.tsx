/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as LabelPrimitive from '@radix-ui/react-label';
import { type ForwardedRef, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

export type LabelProps = {
    id?: string;
    children: ReactNode;
    /**
     * The id of the input element the label is associated with
     */
    htmlFor: string;
    /**
     * Add an asterisk to the label to indicate it is required
     * @default false
     */
    required?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLLabelElement>;
    'data-test-id'?: string;
};

export const LabelComponent = (
    { className, 'data-test-id': dataTestId = 'fondue-label', children, ...props }: LabelProps,
    ref: ForwardedRef<HTMLLabelElement>,
) => {
    return (
        <LabelPrimitive.Root
            ref={ref}
            data-required={props.required}
            className={cn(
                'tw-group tw-relative tw-flex tw-gap-1 tw-font-body--stack tw-text-body-medium tw-text-text-weak peer-hover:tw-text-text has-[+_*_input:hover:not(:disabled)]:tw-text-text has-[~_button:hover:not(:disabled)]:tw-text-text tw-transition-colors',
                // Disabled state if siblings has disabled state
                'has-[+_*_:disabled]:tw-text-text-disabled has-[~_:disabled]:tw-cursor-not-allowed peer-disabled:tw-text-text-disabled peer-disabled:tw-cursor-not-allowed',
                // Required asterisk
                'after:tw-hidden data-[required="true"]:after:tw-flex after:tw-content-["*"] after:-tw-ml-1 after:tw-font-body--stack after:tw-text-body-small after:tw-font-medium after:tw-text-text-negative group-hover:tw-text-text-negative-hover',
                className,
            )}
            data-test-id={dataTestId}
            onClick={(event) => {
                // Add support of Select component, Radix only allows native `select`
                // but we use `div[role=combobox]` because of downshift
                // https://github.com/radix-ui/primitives/blob/6e75e117977c9e6ffa939e6951a707f16ba0f95e/packages/react/label/src/label.tsx#L22
                const targetId = (event.target as HTMLElement).getAttribute('for');
                const target = targetId ? document.getElementById(targetId) : null;

                if (target && target.getAttribute('role') === 'combobox') {
                    event.preventDefault();
                    event.stopPropagation();
                    target.click();
                }
            }}
            {...props}
        >
            {/* Hidden version with medium font weight to reserve space */}
            <span className="tw-font-medium tw-opacity-0 tw-pointer-events-none" aria-hidden="true">
                {children}
            </span>
            {/* Visible version with dynamic font weight */}
            <span
                className={cn(
                    'tw-absolute tw-inset-0 tw-font-normal peer-data-[state="checked"]:tw-font-medium peer-data-[state="indeterminate"]:tw-font-medium',
                )}
            >
                {children}
            </span>
        </LabelPrimitive.Root>
    );
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(LabelComponent);
Label.displayName = 'Label';
