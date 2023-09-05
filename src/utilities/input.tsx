/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Validation, validationClassMap } from './validation';
import { merge } from './merge';

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
