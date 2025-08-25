/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, type ReactNode } from 'react';

import { Portal } from '@components/Portal/Portal';
export const EnablePortalWrapper = ({
    enablePortal = true,
    children,
}: {
    enablePortal?: boolean;
    children?: ReactNode;
}): ReactElement => (enablePortal ? <Portal>{children}</Portal> : <>{children}</>);
EnablePortalWrapper.displayName = 'FondueEnablePortalWrapper';
