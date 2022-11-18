/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PropsWithChildren } from 'react';

export type CollapsibleWrapProps = PropsWithChildren<{
    isOpen: boolean;
    preventInitialAnimation?: boolean;
    animateOpacity?: boolean;
}>;
