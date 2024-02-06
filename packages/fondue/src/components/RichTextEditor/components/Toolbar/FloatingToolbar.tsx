/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cn, withRef } from '@udecode/cn';
import {
    FloatingToolbarState,
    PortalBody,
    useComposedRef,
    useFloatingToolbar,
    useFloatingToolbarState,
} from '@udecode/plate';

import { ToolbarWrapper } from './ToolbarWrapper';

export const FloatingToolbar = withRef<
    typeof ToolbarWrapper,
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
            <ToolbarWrapper ref={ref} className={cn(className)} {...rootProps} {...props}>
                {children}
            </ToolbarWrapper>
        </PortalBody>
    );
});
