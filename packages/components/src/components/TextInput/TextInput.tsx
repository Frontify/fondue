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

import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

import styles from './styles/text.module.scss';

export type TextInputProps = {
    id?: string;
    name?: string;
    /**
     * Slot content placed alongside the input. Use `TextInput.Slot` for left/right decorators or actions.
     */
    children?: ReactNode;
    /**
     * The initial value for uncontrolled usage. Accepts a string or number.
     */
    defaultValue?: string | number;
    /**
     * The controlled value. Use together with `onChange` for controlled usage.
     */
    value?: string | number;
    /**
     * The HTML input type. Use `'password'` for secrets, `'email'` for email addresses, `'number'` for numeric input, `'search'` for search fields.
     * @default "text"
     */
    type?: 'date' | 'email' | 'hidden' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    /**
     * Text shown when the input is empty. Use it to hint at the expected input.
     */
    placeholder?: string;
    /**
     * Prevents interaction and dims the input visually.
     * @default false
     */
    disabled?: boolean;
    /**
     * Marks the input as required for form validation.
     * @default false
     */
    required?: boolean;
    /**
     * Enables browser spell-checking for the input content.
     * @default true
     */
    spellCheck?: boolean;
    /**
     * Makes the input read-only — the value is visible but cannot be edited.
     * @default false
     */
    readOnly?: boolean;
    /**
     * Controls the browser's autocomplete behavior. Pass a specific token like `'email'`, `'username'`, or `'off'` to disable.
     * @default "on"
     */
    autoComplete?: string;
    /**
     * The maximum number of characters the user can enter.
     */
    maxLength?: number;
    /**
     * Conveys validation state visually. `'success'` shows a checkmark, `'error'` shows a warning icon, `'loading'` shows a spinner.
     * @default "neutral"
     */
    status?: 'neutral' | 'success' | 'error' | 'loading';
    className?: string;
    /**
     * Callback fired when the input value changes.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Callback fired when the input loses focus.
     */
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Callback fired when the input gains focus.
     */
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Callback fired when a key is pressed inside the input.
     */
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Callback fired when a key is released inside the input.
     */
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Callback fired when the user selects text inside the input.
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
        placeholder,
        ...inputProps
    }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
) => {
    const wasClicked = useRef(false);

    return (
        <div
            className={[styles.root, className].filter(Boolean).join(' ')}
            data-status={status}
            data-test-id={dataTestId}
        >
            {status === 'loading' ? (
                <div className={styles.loadingStatus} data-test-id={`${dataTestId}-loader`}>
                    <LoadingCircle size="xx-small" />
                </div>
            ) : null}
            <div className={styles.inputWrapper}>
                {placeholder && <div className={styles.placeholder}>{placeholder}</div>}
                <input
                    onMouseDown={(mouseEvent) => {
                        wasClicked.current = true;
                        mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                    }}
                    type="text"
                    placeholder={placeholder}
                    {...inputProps}
                    onFocus={(focusEvent) => {
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
            </div>

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
    /**
     * The slot content — typically an icon, button, or other action.
     */
    children: ReactNode;
    /**
     * Controls where the slot appears. `'left'` places content at the start, `'right'` at the end of the input.
     */
    name?: 'left' | 'right';
    className?: string;
};

export const TextFieldSlot = (
    { name, className, ...slotProps }: TextFieldSlotProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-slot
            data-name={name}
            {...slotProps}
            ref={forwardedRef}
            className={[styles.slot, className].filter(Boolean).join(' ')}
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
