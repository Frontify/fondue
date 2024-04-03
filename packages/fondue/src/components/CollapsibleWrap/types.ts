/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

export type CollapsibleWrapProps = {
    isOpen: boolean;
    preventInitialAnimation?: boolean;
    animateOpacity?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};
