/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Validation, validationClassMap } from './validation';

type HelperTextProps = { text: string; disabled: boolean; 'data-test-id': string; style?: Validation };

export const HelperText = ({
    text,
    disabled,
    style,
    'data-test-id': dataTestId = 'fondue-number-input',
}: HelperTextProps): ReactElement => {
    let textColorClass;

    switch (true) {
        case disabled:
            textColorClass = 'tw-text-black-40';
            break;
        case style === Validation.Error:
            textColorClass = validationClassMap.Error;
            break;
        case style === Validation.Success:
            textColorClass = validationClassMap.Success;
            break;
        default:
            textColorClass = validationClassMap.Default;
            break;
    }

    return (
        <span data-test-id={`${dataTestId}-helper-text`} className={`tw-text-s tw-font-sans ${textColorClass}`}>
            {text}
        </span>
    );
};

HelperText.displayName = 'FondueHelperText';
