/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HTMLAttributes, type ReactNode } from 'react';

export type TabTrigger = {
    ref?: { current: HTMLButtonElement | null };
    element: ReactNode;
    previousElement?: ReactNode;
    props: HTMLAttributes<HTMLButtonElement>;
    disabled?: boolean;
    value: string;
};
