/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

export const withDirection = (Story: ComponentType, direction: 'ltr' | 'rtl' = 'ltr') => {
    return (
        <div dir={direction}>
            <Story />
        </div>
    );
};
