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
    type ReactElement,
} from 'react';

import styles from './styles/textarea.module.scss';

export type ExtraAction = {
    icon: ReactElement;
    title: string;
    callback: () => void;
};

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
     * A `ReactElement` that will be rendered at the start of the `Textarea`
     */
    decorator?: ReactElement;
    /**
     * Initial value
     */
    defaultValue?: string;
    disabled?: boolean;
    /**
     * Collection of extra actions the input can preform
     */
    extraActions?: ExtraAction[];
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
     * Event handler called when Enter is pressed
     */
    onEnterPressed?: KeyboardEventHandler<HTMLTextAreaElement>;
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
    decorator,
    defaultValue,
    disabled,
    extraActions,
    focusOnMount,
    minRows: rows = 1,
    onEnterPressed,
    readOnly,
    resizable,
    selectable = true,
    status = 'default',
    value: inputValue,
    ...props
}: TextareaProps) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const [value, setValue] = useState(inputValue ?? defaultValue ?? '');

    const hasTools = clearable || ['success', 'error'].includes(status);

    const clear = () => {
        setValue('');
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter') {
            onEnterPressed?.(event);
        }
        props.onKeyDown?.(event);
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
            data-has-decorator={decorator ? true : false}
            data-has-tools={clearable || extraActions?.length ? true : false}
            data-replicated-value={value}
            data-resizable={resizable}
            data-status={status}
        >
            {decorator ? <div className={styles.decorator}>{decorator}</div> : null}
            <textarea
                {...props}
                autoComplete={autocomplete ? 'on' : 'off'}
                className={styles.textarea}
                disabled={disabled}
                onKeyDown={handleKeyDown}
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
            {status === 'loading' && <div className={styles.loadingStatus} data-test-id={`${dataTestId}-loader`} />}
            {hasTools && (
                <div className={styles.tools}>
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
                    {extraActions?.map(({ icon, title, callback }) => (
                        <button
                            className={styles.toolsButton}
                            disabled={disabled || readOnly}
                            key={title}
                            onClick={callback}
                            title={title}
                        >
                            {icon}
                        </button>
                    ))}
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
