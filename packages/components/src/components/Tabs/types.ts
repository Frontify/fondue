/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HTMLAttributes, type ReactNode, type RefObject } from 'react';

export type TabTrigger = {
    ref?: RefObject<HTMLButtonElement>;
    element: ReactNode;
    props: HTMLAttributes<HTMLButtonElement>;
    disabled?: boolean;
    value: string;
};
