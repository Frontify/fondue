/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Validation } from '@utilities/validation';
import { InputExtraAction, InputExtraActions } from './InputExtraActions';
import { Box } from '@components/Box';
import { InputValidation } from './InputValidation';

export type InputActionsAndValidationProps = {
    validation: Validation;
    extraActions: InputExtraAction[];
};

export const InputActionsAndValidation = ({ validation, extraActions = [] }: InputActionsAndValidationProps) => {
    return validation !== Validation.Default || extraActions.length > 0 ? (
        <Box className="tw-absolute tw-flex tw-top-px tw-right-px">
            <InputExtraActions items={extraActions} />
            <InputValidation value={validation} />
        </Box>
    ) : null;
};
