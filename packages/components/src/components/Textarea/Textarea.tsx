/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconCross, IconExclamationMarkTriangle } from '@frontify/fondue-icons';
import {
    type ChangeEventHandler,
    useEffect,
    useRef,
    useState,
    type FocusEventHandler,
    type KeyboardEventHandler,
    type SyntheticEvent,
} from 'react';

import styles from './styles/textarea.module.scss';

type Status = 'default' | 'loading' | 'success' | 'error';

type TextareaProps = {
    'data-test-id'?: string;
    /**
     * If `true`, Textarea will have `autoComplete` functionality
     */
    autocomplete?: boolean;
    /**
     * If `true`, component rendered is a auto sizing Textarea
     */
    autosize?: boolean;
    /**
     * Render `clear` button to clear input on click
     */
    clearable?: boolean;
    /**
     * Initial value
     */
    defaultValue?: string;
    disabled?: boolean;
    /**
     * If `true`, Textarea will be focused on mount
     */
    focusOnMount?: boolean;
    /**
     * If autosize is false, this is used as rows property for default textarea
     * @default 1
     */
    minRows?: number;
    /**
     * Event handler called when the textarea value changes
     */
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    /**
     * Event handler called when the text input is blurred
     */
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Event handler called when the text input is focused
     */
    onFocus?: FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Event handler called when a key is pressed
     */
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    /**
     * Event handler called when a key is released
     */
    onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement>;
    /**
     * Event handler called when the text inside of text input is selected
     */
    onSelect?: (event: SyntheticEvent<HTMLTextAreaElement>) => void;
    readOnly?: boolean;
    resizable?: boolean;
    selectable?: boolean;
    /**
     * The current status of the input. It will trigger the corresponding icon to be appended to the Textarea.
     * @default 'default'
     */
    status?: Status;
    value?: string;
};

export const Textarea = ({
    'data-test-id': dataTestId = 'fondue-textarea',
    autocomplete,
    autosize,
    clearable,
    defaultValue,
    disabled,
    focusOnMount,
    minRows: rows = 1,
    readOnly,
    resizable,
    selectable = true,
    status = 'default',
    value: inputValue,
    ...props
}: TextareaProps) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const [value, setValue] = useState(inputValue ?? defaultValue ?? '');

    const hasTools = clearable || ['loading', 'success', 'error'].includes(status);

    const clear = () => {
        setValue('');
    };

    useEffect(() => {
        setValue(inputValue ?? defaultValue ?? '');
    }, [defaultValue, inputValue]);

    useEffect(() => {
        if (focusOnMount) {
            ref.current?.focus();
        }
    }, [focusOnMount]);

    return (
        <div
            className={styles.root}
            data-autosize={autosize}
            data-clearable={clearable}
            data-disabled={disabled || readOnly}
            data-replicated-value={value}
            data-resizable={resizable}
            data-status={status}
        >
            <textarea
                {...props}
                autoComplete={autocomplete ? 'on' : 'off'}
                className={styles.textarea}
                disabled={disabled}
                onInput={(event) => setValue(event.currentTarget.value)}
                onSelect={(event) => {
                    if (!selectable) {
                        event.currentTarget.selectionStart = event.currentTarget.selectionEnd;
                    }
                }}
                readOnly={readOnly}
                ref={ref}
                rows={rows}
                value={value}
            ></textarea>
            {hasTools && (
                <div className={styles.tools}>
                    {status === 'loading' && (
                        <div className={styles.loadingStatus} data-test-id={`${dataTestId}-loader`} />
                    )}
                    {status === 'success' && (
                        <div className={styles.success}>
                            <IconCheckMark size={20} />
                        </div>
                    )}
                    {status === 'error' && (
                        <div className={styles[status]}>
                            <IconExclamationMarkTriangle size={20} />
                        </div>
                    )}
                    {clearable && (
                        <button className={styles.toolsButton} onClick={clear} disabled={disabled || readOnly}>
                            <IconCross size={20} fill="currentColor" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
