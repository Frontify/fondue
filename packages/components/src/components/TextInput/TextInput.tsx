/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ChangeEvent, forwardRef, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { rootStyles, inputStyles, slotStyles, loadingStatusStyles } from './styles/textInputStyles';

type TextInputProps = {
    children?: ReactNode;
    defaultValue?: string | number;
    value?: string | number;
    /**
     * Type of the input field
     * @default text
     */
    type?: 'date' | 'email' | 'hidden' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    placeholder?: string;
    /**
     * Status of the input field
     * @default neutral
     */
    status?: 'neutral' | 'success' | 'error' | 'loading';
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
};

const TextFieldRoot = forwardRef<HTMLInputElement, TextInputProps>(
    ({ children, className, status = 'neutral', ...inputProps }, ref) => {
        return (
            <div
                className={cn(rootStyles, className)}
                data-disabled={inputProps.disabled}
                data-read-only={inputProps.readOnly}
                data-status={status}
                data-test-id="fondue-text-input"
            >
                <div className={loadingStatusStyles} />
                <input spellCheck="false" type="text" {...inputProps} ref={ref} className={inputStyles} />
                {children}
            </div>
        );
    },
);
TextFieldRoot.displayName = 'TextField.Root';

type TextFieldSlotProps = {
    children: ReactNode;
    side?: 'left' | 'right';
    className?: string;
};

const TextFieldSlot = forwardRef<HTMLDivElement, TextFieldSlotProps>(
    ({ side, className, ...slotProps }, forwardedRef) => {
        return <div data-side={side} {...slotProps} ref={forwardedRef} className={cn(slotStyles, className)} />;
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
