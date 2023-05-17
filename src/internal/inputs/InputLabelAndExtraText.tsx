/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InputLabel, InputLabelProps } from '@components/InputLabel';
import { Flex } from '@components/Flex';
import { Box } from '@components/Box';
import { merge } from '@utilities/merge';

export type InputLabelAndExtraTextProps = InputLabelProps & {
    label: string;
    labelExtraText?: string;
};

export const InputLabelAndExtraText = ({
    labelExtraText,
    label,
    disabled,
    ...labelProps
}: InputLabelAndExtraTextProps) => {
    return (
        <Flex
            direction="row"
            justify="between"
            alignItems="center"
            minWidth="100%"
            data-test-id="fondue-input-label-and-extra-text"
        >
            <InputLabel disabled={disabled} clickable={!disabled} {...labelProps} bold>
                {label}
            </InputLabel>
            {labelExtraText && (
                <Box
                    as="span"
                    className={merge([
                        'tw-text-s',
                        disabled ? 'tw-text-text-disabled' : 'tw-text-text-weak',
                        !disabled &&
                            'tw-select-none hover:tw-cursor-pointer hover:tw-text-text group-hover:tw-text-text',
                    ])}
                    data-test-id="fondue-input-label-extra-text"
                >
                    {labelExtraText}
                </Box>
            )}
        </Flex>
    );
};
