/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

/**
 * @deprecated Please use updated accordion component from `@frontify/fondue/components` instead.
 */
export type CollapsibleWrapProps = {
    isOpen: boolean;
    preventInitialAnimation?: boolean;
    animateOpacity?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};
