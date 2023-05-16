/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { TextareaField, TextareaFieldProps } from '@components/TextareaField';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { Flex } from '@components/Flex';
import { InputHelpText, InputHelpTextProps } from '../InputHelpText';
import { InputLabelAndExtraText } from '../InputLabelAndExtraText';

export type TextareaInputProps = TextareaFieldProps &
    Omit<InputHelpTextProps, 'validation'> & {
        label: string;
        labelExtraText?: string;
    };

export const TextareaInput = ({
    label,
    labelExtraText,
    id: propId,
    helpText,
    errorText,
    validation,
    readOnly = false,
    disabled = false,
    required = false,
    selectable = false,
    ...fieldProps
}: TextareaInputProps) => {
    const id = useMemoizedId(propId);
    return (
        <Flex
            direction="column"
            justify="start"
            alignItems="start"
            minWidth="100%"
            data-test-id="fondue-textarea-input"
        >
            <InputLabelAndExtraText
                label={label}
                labelExtraText={labelExtraText}
                htmlFor={id}
                clickable={selectable || (!disabled && readOnly)}
                disabled={disabled}
                required={required}
            />
            <TextareaField
                id={id}
                validation={validation}
                readOnly={readOnly}
                disabled={disabled}
                selectable={selectable}
                required={required}
                {...fieldProps}
            />
            <InputHelpText
                helpText={helpText}
                errorText={errorText}
                validation={validation}
                disabled={disabled}
                readOnly={readOnly}
            />
        </Flex>
    );
};
