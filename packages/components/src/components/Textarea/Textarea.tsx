/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { useEffect, useRef, useState } from 'react';

import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

import styles from './styles/textarea.module.scss';

type Status = 'default' | 'loading' | 'success' | 'error' | 'warning';

type TextareaProps = {
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
    readOnly?: boolean;
    resizable?: boolean;
    selectable?: boolean;
    /**
     * The current status of the input. It will trigger the corresponding icon to be appended to the Textarea.
     * @default 'default'
     */
    status?: Status;
};

export const Textarea = ({
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
}: TextareaProps) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const [value, setValue] = useState(defaultValue ?? '');

    const hasTools = clearable || status === 'loading';

    const clear = () => {
        setValue('');
    };

    useEffect(() => {
        setValue(defaultValue ?? '');
    }, [defaultValue]);

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
                    {status === 'loading' && <LoadingCircle size="small" />}
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
