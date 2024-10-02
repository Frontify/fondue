/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, type RefObject } from 'react';

export type TabTrigger = {
    ref: RefObject<HTMLButtonElement>;
    element: JSX.Element;
    disabled: boolean;
    value: string;
    children: ReactNode;
};
