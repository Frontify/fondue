/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = { children?: ReactNode; container?: HTMLElement };

export const Portal = ({ container = document.body, children }: PortalProps) => {
    return createPortal(children, container);
};
Portal.displayName = 'FonduePortal';
