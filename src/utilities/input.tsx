/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Validation, validationClassMap } from './validation';

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
    let textColorClass;

    switch (true) {
        case disabled:
            textColorClass = 'tw-text-black-40';
            break;
        default:
            textColorClass = validationClassMap[validationStyle];
            break;
    }

    return (
        <span data-test-id={dataTestId} className={`tw-text-s tw-font-sans ${textColorClass}`}>
            {text}
        </span>
    );
};

HelperText.displayName = 'FondueHelperText';
