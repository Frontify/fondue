/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Box } from '@components/Box';
import { merge } from '@utilities/merge';
import React, { ReactNode } from 'react';

export type InputDecoratorProps = {
    element: ReactNode;
    disabled?: boolean;
};

export const InputDecorator = ({ element, disabled = false }: InputDecoratorProps) => {
    return (
        (element && (
            <Box
                className={merge([
                    'tw-absolute tw-top-[7px] tw-left-[7px] tw-p-1 tw-inline-flex tw-items-end',
                    disabled ? 'tw-text-text-disabled' : 'tw-text-text',
                ])}
                data-test-id="decorator"
            >
                {element}
            </Box>
        )) ||
        null
    );
};
