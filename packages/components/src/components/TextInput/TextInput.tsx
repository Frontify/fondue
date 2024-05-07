/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconCross } from '@frontify/fondue-icons';
import { type ChangeEvent, type KeyboardEvent, forwardRef, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { rootStyles, inputStyles, slotStyles, loadingStatusStyles } from './styles/textInputStyles';

type TextInputProps = {
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

const TextFieldRoot = forwardRef<HTMLInputElement, TextInputProps>(
    (
        { children, className, status = 'neutral', 'data-test-id': dataTestId = 'fondue-text-input', ...inputProps },
        ref,
    ) => {
        return (
            <div
                className={cn(rootStyles, className)}
                data-disabled={inputProps.disabled}
                data-read-only={inputProps.readOnly}
                data-status={status}
                data-test-id={dataTestId}
            >
                {status === 'loading' ? <div className={loadingStatusStyles} data-test-id="loader" /> : null}

                <input
                    type="text"
                    {...inputProps}
                    ref={ref}
                    className={inputStyles}
                    aria-invalid={status === 'error'}
                />

                {status === 'success' ? (
                    <IconCheckMark
                        size={16}
                        className="tw-flex tw-text-text-positive tw-h-full tw-items-center tw-ml-3"
                        data-test-id="success-icon"
                    />
                ) : null}

                {status === 'error' ? (
                    <IconCross
                        size={16}
                        className="tw-flex tw-text-text-negative tw-h-full tw-items-center tw-ml-3"
                        data-test-id="error-icon"
                    />
                ) : null}

                {children}
            </div>
        );
    },
);
TextFieldRoot.displayName = 'TextField.Root';

type TextFieldSlotProps = {
    children: ReactNode;
    name?: 'left' | 'right';
    className?: string;
};

const TextFieldSlot = forwardRef<HTMLDivElement, TextFieldSlotProps>(
    ({ name, className, ...slotProps }, forwardedRef) => {
        return (
            <div
                data-slot={true}
                data-name={name}
                {...slotProps}
                ref={forwardedRef}
                className={cn(slotStyles, className)}
            />
        );
    },
);
TextFieldSlot.displayName = 'TextField.Slot';

// @ts-expect-error We support both single component (without slots) and compound components (with slots)
export const TextInput: typeof TextFieldRoot & {
    Root: typeof TextFieldRoot;
    Slot: typeof TextFieldSlot;
} = TextFieldRoot;
TextInput.Root = TextFieldRoot;
TextInput.Slot = TextFieldSlot;
