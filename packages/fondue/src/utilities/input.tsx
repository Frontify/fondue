/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { merge } from './merge';
import { Validation, validationTextClassMap } from './validation';

type HelperTextProps = {
    text: string;
    disabled?: boolean;
    'data-test-id'?: string;
    validationStyle?: Validation;
};

/**
 * @deprecated Please use a fondue component or a custom function instead.
 **/
export const HelperText = ({
    text,
    disabled = false,
    validationStyle = Validation.Default,
    'data-test-id': dataTestId = 'fondue-helper-text',
}: HelperTextProps): ReactElement => {
    return (
        <span
            data-test-id={dataTestId}
            className={merge([
                'tw-text-s tw-font-sans',
                disabled ? 'tw-text-black-40' : validationTextClassMap[validationStyle],
            ])}
        >
            {text}
        </span>
    );
};
HelperText.displayName = 'FondueHelperText';
