/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cn, withRef } from '@udecode/cn';
import { PortalBody, useComposedRef } from '@udecode/plate-common';
import { FloatingToolbarState, useFloatingToolbar, useFloatingToolbarState } from '@udecode/plate-floating';

import { Toolbar } from './Toolbar';

export const FloatingToolbar = withRef<
    typeof Toolbar,
    {
        state?: FloatingToolbarState;
        className: string;
    }
>(({ state, children, className, ...props }, componentRef) => {
    const floatingToolbarState = useFloatingToolbarState({
        ...state,
        floatingOptions: {
            placement: 'top',
            ...state?.floatingOptions,
        },
    });

    const { ref: floatingRef, props: rootProps, hidden } = useFloatingToolbar(floatingToolbarState);

    const ref = useComposedRef<HTMLDivElement>(componentRef, floatingRef);

    if (hidden) {
        return null;
    }

    return (
        <PortalBody>
            <Toolbar ref={ref} className={cn(className)} {...rootProps} {...props}>
                {children}
            </Toolbar>
        </PortalBody>
    );
});
