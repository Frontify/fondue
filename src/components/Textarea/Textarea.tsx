/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';
import { LoadingCircle, LoadingCircleSize } from '@components/LoadingCircle';
import React, { FocusEvent, FormEvent, ReactElement, ReactNode } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IconCheckMark16, IconExclamationMarkTriangle16 } from '@foundation/Icon/Generated';

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

const validationIconWrapperClasses = 'tw-absolute tw-top-[0.6rem] tw-right-[0.6rem]';
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
    readOnly = true,
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
                    if (onFocus) {
                        onFocus(e);
                    }
                }}
                onInput={(event: FormEvent<HTMLTextAreaElement>) =>
                    onInput && onInput((event.target as HTMLTextAreaElement).value)
                }
                onBlur={(event: FocusEvent<HTMLTextAreaElement>) => onBlur && onBlur(event.target.value)}
                data-test-id="textarea"
            />
            {validation === Validation.Loading && (
                <span className="tw-absolute tw-top-[-0.55rem] tw-right-[-0.55rem] tw-bg-base tw-rounded-full tw-p-[2px] tw-border tw-border-line">
                    <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                </span>
            )}
            {(validation === Validation.Error || validation === Validation.Warning) && (
                <span
                    className={merge([
                        validationIconWrapperClasses,
                        validation === Validation.Error && 'tw-text-text-negative',
                        validation === Validation.Warning && 'tw-text-text-warning',
                    ])}
                    data-test-id="error-state-exclamation-mark-icon"
                >
                    <IconExclamationMarkTriangle16 />
                </span>
            )}
            {validation === Validation.Success && (
                <span
                    className={merge([validationIconWrapperClasses, 'tw-text-text-positive'])}
                    data-test-id="success-state-check-mark-icon"
                >
                    <IconCheckMark16 />
                </span>
            )}
        </div>
    );
};
Textarea.displayName = 'FondueTextarea';
