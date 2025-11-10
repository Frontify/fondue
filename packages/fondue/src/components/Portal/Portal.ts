/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, type ReactPortal } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = { children?: ReactNode; container?: HTMLElement };

/**
 * @deprecated This component was deprecated, as it is not used anywhere.
 */
export const Portal = ({ container = document.body, children }: PortalProps): ReactPortal => {
    return createPortal(children, container);
};
Portal.displayName = 'FonduePortal';
