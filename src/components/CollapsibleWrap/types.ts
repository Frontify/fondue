/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';

export type CollapsibleWrapProps = {
    isOpen: boolean;
    preventInitialAnimation?: boolean;
    animateOpacity?: boolean;
    children?: ReactNode;
};
