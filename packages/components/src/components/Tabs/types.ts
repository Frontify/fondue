/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject } from 'react';

export type TabTrigger = {
    ref?: RefObject<HTMLButtonElement>;
    element: JSX.Element;
    disabled: boolean;
    value: string;
};
