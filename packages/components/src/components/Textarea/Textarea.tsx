/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { useEffect, useState } from 'react';

import styles from './styles/textarea.module.scss';

type TextareaProps = {
    autocomplete?: boolean;
    autosize?: boolean;
    clearable?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    minRows?: number;
};

export const Textarea = ({
    autocomplete,
    autosize,
    clearable,
    defaultValue,
    disabled,
    minRows: rows = 1,
}: TextareaProps) => {
    const [value, setValue] = useState(defaultValue ?? '');

    const clear = () => {
        setValue('');
    };

    useEffect(() => {
        setValue(defaultValue ?? '');
    }, [defaultValue]);

    return (
        <div className={styles.root} data-autosize={autosize} data-clearable={clearable} data-replicated-value={value}>
            <textarea
                autoComplete={autocomplete ? 'on' : 'off'}
                className={styles.textarea}
                disabled={disabled}
                onInput={(event) => setValue(event.currentTarget.value)}
                rows={rows}
                value={value}
            ></textarea>
            {clearable && (
                <div className={styles.tools}>
                    <button className={styles.toolsButton} onClick={clear}>
                        <IconCross size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};
