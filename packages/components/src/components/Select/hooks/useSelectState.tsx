/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

export const useSelectState = () => {
    return {
        isOpen: false,
        setIsOpen: (isOpen: boolean) => {
            setIsOpen(isOpen);
        },
    };
};
