/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as LabelPrimitive from '@radix-ui/react-label';
import { type ForwardedRef, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import styles from './styles/label.module.scss';

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
            className={cn(styles.root, className)}
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
            <span className={styles.hiddenText} aria-hidden="true">
                {children}
            </span>
            {/* Visible version (inherits all styling from parent) */}
            <span className={styles.visibleText}>{children}</span>
        </LabelPrimitive.Root>
    );
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(LabelComponent);
Label.displayName = 'Label';
