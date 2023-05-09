/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';

import React, { FocusEvent, FormEvent, ReactElement, ReactNode } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { InputValidation } from '@internal/inputs/InputValidation';

export type TextareaProps = {
    id?: string;
    value?: string;
    required?: boolean;
    decorator?: ReactNode;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
    onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
    validation?: Validation;
    /** When autosize if false, this is used as 'rows' property for standard textarea */
    minRows?: number;
    /** When autosize if false, this property is ignored */
    maxRows?: number;
    autosize?: boolean;
    resizeable?: boolean;
    selectable?: boolean;
    readOnly?: boolean;
};

export const Textarea = ({
    id: propId,
    value,
    required = false,
    decorator,
    placeholder,
    disabled = false,
    onInput,
    onBlur,
    validation = Validation.Default,
    minRows,
    maxRows,
    autosize = false,
    resizeable = true,
    onFocus,
    selectable = false,
    readOnly = false,
}: TextareaProps): ReactElement => {
    const Component = autosize ? TextareaAutosize : 'textarea';

    const autosizeProps = { maxRows, minRows };

    return (
        <div className="tw-relative">
            {decorator && (
                <div
                    className="tw-absolute tw-top-2 tw-left-2 tw-inline-flex tw-items-end tw-text-text"
                    data-test-id="decorator"
                >
                    {decorator}
                </div>
            )}
            <Component
                {...(autosize ? autosizeProps : { rows: minRows })}
                id={useMemoizedId(propId)}
                value={value}
                placeholder={placeholder}
                required={required}
                className={merge([
                    'tw-w-full tw-p-2 tw-border tw-rounded tw-text-s tw-outline-none tw-transition tw-placeholder-text-x-weak',
                    !!decorator && 'tw-pl-7 ',
                    disabled
                        ? 'tw-border-line-weak tw-bg-box-disabled tw-text-text-disabled'
                        : 'tw-text-text tw-border-line-strong hover:tw-border-line-x-strong focus-visible:tw-border-line-xx-strong',
                    !disabled && validationClassMap[validation],
                    !disabled && readOnly && 'tw-bg-transparent tw-border-0',
                    !resizeable && 'tw-resize-none',
                    validation !== Validation.Default && validation !== Validation.Loading && 'tw-pr-8',
                ])}
                disabled={disabled}
                readOnly={readOnly}
                onFocus={(e: FocusEvent<HTMLTextAreaElement>) => {
                    if (selectable) {
                        e.target.select();
                    }

                    onFocus?.(e);
                }}
                onInput={(event: FormEvent<HTMLTextAreaElement>) =>
                    onInput?.((event.target as HTMLTextAreaElement).value)
                }
                onBlur={(event: FocusEvent<HTMLTextAreaElement>) => onBlur?.(event.target.value)}
                data-test-id="textarea"
            />
            <InputValidation value={validation} />
        </div>
    );
};
Textarea.displayName = 'FondueTextarea';
