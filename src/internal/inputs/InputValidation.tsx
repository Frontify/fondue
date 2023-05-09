/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Validation } from '@utilities/validation';
import { merge } from '@utilities/merge';
import { LoadingCircle, LoadingCircleSize } from '@components/LoadingCircle';
import { IconCheckMark16, IconExclamationMarkTriangle16 } from '@foundation/Icon/Generated';

export type InputValidationProps = {
    value: Validation;
};

const validationIconWrapperClasses = 'tw-p-1';

export const InputValidation = ({ value = Validation.Default }: InputValidationProps) => {
    return (
        <>
            {value === Validation.Loading && (
                <span className="tw-absolute tw-top-[-0.55rem] tw-right-[-0.55rem] tw-bg-base tw-rounded-full tw-p-[2px] tw-border tw-border-line">
                    <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                </span>
            )}
            {(value === Validation.Error || value === Validation.Warning) && (
                <span
                    className={merge([
                        validationIconWrapperClasses,
                        value === Validation.Error && 'tw-text-text-negative',
                        value === Validation.Warning && 'tw-text-text-warning',
                    ])}
                    data-test-id="error-state-exclamation-mark-icon"
                >
                    <IconExclamationMarkTriangle16 />
                </span>
            )}
            {value === Validation.Success && (
                <span
                    className={merge([validationIconWrapperClasses, 'tw-text-text-positive'])}
                    data-test-id="success-state-check-mark-icon"
                >
                    <IconCheckMark16 />
                </span>
            )}
        </>
    );
};
