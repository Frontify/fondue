/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { Validation, validationClassMap } from './validation';
import { merge } from './merge';
import { IconCheckMark16, IconExclamationMarkTriangle16 } from '@foundation/Icon';
import { LoadingCircle, LoadingCircleSize } from '@components/index';

type HelperTextProps = {
    text: string;
    disabled: boolean;
    'data-test-id': string;
    validationStyle?: Validation;
};

export const HelperText = ({
    text,
    disabled,
    validationStyle = Validation.Default,
    'data-test-id': dataTestId = 'fondue-helper-text',
}: HelperTextProps): ReactElement => {
    return (
        <span
            data-test-id={dataTestId}
            className={merge([
                'tw-text-s tw-font-sans',
                disabled ? 'tw-text-black-40' : validationClassMap[validationStyle],
            ])}
        >
            {text}
        </span>
    );
};
HelperText.displayName = 'FondueHelperText';

export const GetStatusIcon = (status: Validation, dataTestId: string): ReactElement | null => {
    switch (status) {
        case Validation.Success:
            return (
                <span className={validationClassMap[status]} data-test-id={`${dataTestId}-status-icon`}>
                    <IconCheckMark16 />
                </span>
            );
        case Validation.Error:
        case Validation.Warning:
            return (
                <span className={validationClassMap[status]} data-test-id={`${dataTestId}-status-icon`}>
                    <IconExclamationMarkTriangle16 />
                </span>
            );
        case Validation.Loading:
            return (
                <span className={validationClassMap[status]} data-test-id={`${dataTestId}-status-icon`}>
                    <LoadingCircle size={LoadingCircleSize.Small} />
                </span>
            );
        default:
            return null;
    }
};
GetStatusIcon.displayName = 'FondueGetStatusIcon';
