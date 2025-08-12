/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { useEffect, useRef, useState } from 'react';

import styles from './styles/textarea.module.scss';

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
}: TextareaProps) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const [value, setValue] = useState(defaultValue ?? '');

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
        >
            <textarea
                autoComplete={autocomplete ? 'on' : 'off'}
                className={styles.textarea}
                disabled={disabled}
                onInput={(event) => setValue(event.currentTarget.value)}
                readOnly={readOnly}
                ref={ref}
                rows={rows}
                value={value}
            ></textarea>
            {clearable && (
                <div className={styles.tools}>
                    <button className={styles.toolsButton} onClick={clear} disabled={disabled || readOnly}>
                        <IconCross size={20} fill="currentColor" />
                    </button>
                </div>
            )}
        </div>
    );
};
