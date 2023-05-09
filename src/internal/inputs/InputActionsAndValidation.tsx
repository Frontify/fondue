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
        // In the Figma designs the icons are 10px from the border
        // each icon item will have a 4px padding from tw-p-1
        // so we need to add 6px more and 1px for the border
        <Box className="tw-absolute tw-flex tw-top-[7px] tw-right-[7px]">
            <InputExtraActions items={extraActions} />
            <InputValidation value={validation} />
        </Box>
    ) : null;
};
