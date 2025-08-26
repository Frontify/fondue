/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconExclamationMarkTriangle } from '@frontify/fondue-icons';
import {
    forwardRef,
    useRef,
    type ChangeEvent,
    type FocusEvent,
    type ForwardedRef,
    type KeyboardEvent,
    type ReactNode,
    type SyntheticEvent,
} from 'react';

import { cn } from '#/utilities/styleUtilities';

import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

import styles from './styles/text.module.scss';

export type TextInputProps = {
    id?: string;
    name?: string;
    /**
     * The place where the input slots are placed
     */
    children?: ReactNode;
    /**
     * The default value of the text input
     * Used for uncontrolled components
     */
    defaultValue?: string | number;
    /**
     * The controlled value of the text input
     */
    value?: string | number;
    /**
     * Type of the text input
     * @default "text"
     */
    type?: 'date' | 'email' | 'hidden' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    /**
     * The placeholder in the text input
     */
    placeholder?: string;
    /**
     * Disable the text input
     * @default false
     */
    disabled?: boolean;
    /**
     * Make the text input required in form
     * @default false
     */
    required?: boolean;
    /**
     * Make the text input spell-checkable
     * @default true
     */
    spellCheck?: boolean;
    /**
     * Make the text input read-only
     * @default false
     */
    readOnly?: boolean;
    /**
     * Set the type of input so autocomplete can help the user
     * @default "on"
     */
    autoComplete?: string;
    /**
     * The maximum length of the text input
     */
    maxLength?: number;
    /**
     * Status of the text input
     * @default "neutral"
     */
    status?: 'neutral' | 'success' | 'error' | 'loading';
    className?: string;
    /**
     * Event handler called when the text input value changes
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Event handler called when the text input is blurred
     */
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Event handler called when the text input is focused
     */
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Event handler called when a key is pressed
     */
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Event handler called when a key is released
     */
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Event handler called when the text inside of text input is selected
     */
    onSelect?: (event: SyntheticEvent<HTMLInputElement>) => void;
    'data-test-id'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
};

export const TextFieldRoot = (
    {
        children,
        className,
        status = 'neutral',
        'data-test-id': dataTestId = 'fondue-text-input',
        'aria-errormessage': ariaErrormessage,
        ...inputProps
    }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
) => {
    const wasClicked = useRef(false);

    return (
        <div className={cn(styles.root, className)} data-status={status} data-test-id={dataTestId}>
            {status === 'loading' ? (
                <div className={styles.loadingStatus} data-test-id={`${dataTestId}-loader`}>
                    <LoadingCircle size="xx-small" />
                </div>
            ) : null}
            <input
                onMouseDown={(mouseEvent) => {
                    wasClicked.current = true;
                    mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                }}
                type="text"
                {...inputProps}
                onFocus={(focusEvent) => {
                    console.log('focusEvent', focusEvent);
                    if (!wasClicked.current) {
                        focusEvent.target.dataset.showFocusRing = 'true';
                    }
                    inputProps.onFocus?.(focusEvent);
                }}
                onBlur={(blurEvent) => {
                    blurEvent.target.dataset.showFocusRing = 'false';
                    wasClicked.current = false;
                    inputProps.onBlur?.(blurEvent);
                }}
                ref={ref}
                className={styles.input}
                aria-invalid={status === 'error'}
                aria-errormessage={status === 'error' ? ariaErrormessage : undefined}
            />

            {status === 'success' ? (
                <IconCheckMark size={16} className={styles.iconSuccess} data-test-id={`${dataTestId}-success-icon`} />
            ) : null}

            {status === 'error' ? (
                <IconExclamationMarkTriangle
                    size={16}
                    className={styles.iconError}
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
    return <div data-slot data-name={name} {...slotProps} ref={forwardedRef} className={cn(styles.slot, className)} />;
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
