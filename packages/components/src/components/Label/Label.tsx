/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as LabelPrimitive from '@radix-ui/react-label';
import { type ForwardedRef, forwardRef, type MouseEventHandler, type ReactNode, useRef, useLayoutEffect } from 'react';

import styles from './styles/label.module.scss';

type LabelVariant = 'default' | 'strong';

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
    /**
     * The variant of the label
     * @default "default"
     */
    variant?: LabelVariant;
    className?: string;
    onClick?: MouseEventHandler<HTMLLabelElement>;
    'data-test-id'?: string;
};

export const LabelComponent = (
    { className, 'data-test-id': dataTestId = 'fondue-label', children, variant = 'default', ...props }: LabelProps,
    ref: ForwardedRef<HTMLLabelElement>,
) => {
    const hiddenTextRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        // prevent duplicated interactive elements within the hidden element
        const interactiveElements = hiddenTextRef.current?.querySelectorAll('button,input,a,[tabindex]');
        if (interactiveElements) {
            for (const element of interactiveElements) {
                element.setAttribute('tabindex', '-1');
                element.setAttribute('id', '');
                element.setAttribute('data-test-id', '');
            }
        }
    }, []);

    return (
        <LabelPrimitive.Root
            ref={ref}
            data-required={props.required}
            data-variant={variant}
            className={[styles.root, className].filter(Boolean).join(' ')}
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
            <span className={[styles.hiddenText, styles.contentArea].filter(Boolean).join(' ')} aria-hidden="true" ref={hiddenTextRef}>
                {children}
            </span>
            {/* Visible version (inherits all styling from parent) */}
            <span className={[styles.visibleText, styles.contentArea].filter(Boolean).join(' ')}>{children}</span>
        </LabelPrimitive.Root>
    );
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(LabelComponent);
Label.displayName = 'Label';
