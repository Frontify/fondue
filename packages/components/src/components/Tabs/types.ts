/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, type RefObject } from 'react';

export type TabTrigger = {
    ref?: RefObject<HTMLButtonElement>;
    element: ReactElement;
    disabled?: boolean;
    value: string;
};
