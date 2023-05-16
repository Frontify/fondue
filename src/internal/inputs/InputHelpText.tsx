/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Validation } from '@utilities/validation';
import { Box } from '@components/Box';
import { merge } from '@utilities/merge';

export type InputHelpTextProps = {
    helpText?: string;
    errorText?: string;
    validation?: Validation;
    readOnly?: boolean;
    disabled?: boolean;
};

export const InputHelpText = ({
    helpText,
    errorText,
    validation = Validation.Default,
    readOnly = false,
    disabled = false,
}: InputHelpTextProps) => {
    let content = helpText;
    let textClass = 'tw-text-text-weak';

    if (errorText && validation === Validation.Error) {
        textClass = 'tw-text-text-negative';
        content = errorText;
    }

    if (disabled) {
        textClass = 'tw-text-text-disabled';
        content = helpText;
    }

    return (
        (!readOnly && content && (
            <Box className={merge(['tw-text-xs', textClass])} data-test-id="fondue-input-help-text">
                {content}
            </Box>
        )) ||
        null
    );
};
