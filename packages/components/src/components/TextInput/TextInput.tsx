/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconCross } from '@frontify/fondue-icons';
import { forwardRef, type ChangeEvent, type ForwardedRef, type KeyboardEvent, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { inputStyles, loadingStatusStyles, rootStyles, slotStyles } from './styles/textInputStyles';

export type TextInputProps = {
    id?: string;
    name?: string;
    children?: ReactNode;
    defaultValue?: string | number;
    value?: string | number;
    /**
     * Type of the input field
     * @default text
     */
    type?: 'date' | 'email' | 'hidden' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    spellCheck?: boolean;
    readOnly?: boolean;
    autoComplete?: string;
    maxLength?: number;
    /**
     * Status of the input field
     * @default neutral
     */
    status?: 'neutral' | 'success' | 'error' | 'loading';
    className?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
    'data-test-id'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};

export const TextFieldRoot = (
    {
        children,
        className,
        status = 'neutral',
        'data-test-id': dataTestId = 'fondue-text-input',
        ...inputProps
    }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
) => {
    return (
        <div className={cn(rootStyles, className)} data-status={status} data-test-id={dataTestId}>
            {status === 'loading' ? (
                <div className={loadingStatusStyles} data-test-id={`${dataTestId}-loader`} />
            ) : null}

            <input type="text" {...inputProps} ref={ref} className={inputStyles} aria-invalid={status === 'error'} />

            {status === 'success' ? (
                <IconCheckMark
                    size={16}
                    className="tw-flex tw-text-text-positive tw-h-full tw-items-center tw-ml-3"
                    data-test-id={`${dataTestId}-success-icon`}
                />
            ) : null}

            {status === 'error' ? (
                <IconCross
                    size={16}
                    className="tw-flex tw-text-text-negative tw-h-full tw-items-center tw-ml-3"
                    data-test-id={`${dataTestId}-error-icon`}
                />
            ) : null}

            {children}
        </div>
    );
};
TextFieldRoot.displayName = 'TextField.Root';

export type TextFieldSlotProps = {
    children: ReactNode;
    name?: 'left' | 'right';
    className?: string;
};

export const TextFieldSlot = (
    { name, className, ...slotProps }: TextFieldSlotProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-slot={true}
            data-name={name}
            {...slotProps}
            ref={forwardedRef}
            className={cn(slotStyles, className)}
        />
    );
};

TextFieldSlot.displayName = 'TextField.Slot';

const ForwardedRefTextFieldRoot = forwardRef<HTMLInputElement, TextInputProps>(TextFieldRoot);
const ForwardedRefTextFieldSlot = forwardRef<HTMLDivElement, TextFieldSlotProps>(TextFieldSlot);
// @ts-expect-error We support both single component (without slots) and compound components (with slots)
export const TextInput: typeof TextFieldRoot & {
    Root: typeof ForwardedRefTextFieldRoot;
    Slot: typeof ForwardedRefTextFieldSlot;
} = ForwardedRefTextFieldRoot;
TextInput.Root = ForwardedRefTextFieldRoot;
TextInput.Slot = ForwardedRefTextFieldSlot;
