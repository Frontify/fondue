/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FloatingToolbarState, useFloatingToolbar, useFloatingToolbarState } from '@udecode/plate-floating';
import { PortalBody, useComposedRef } from '@udecode/react-utils';
import { ToolbarWrapper } from './ToolbarWrapper';
import { merge } from '@utilities/merge';
import { ReactNode, forwardRef } from 'react';
import { zIndexLayers } from '@components/RichTextEditor/helpers/zIndexLayers';

export const FloatingToolbar = forwardRef<
    HTMLDivElement,
    {
        state?: FloatingToolbarState;
        className: string;
        children: ReactNode;
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
            <ToolbarWrapper
                ref={ref}
                style={{
                    ...rootProps.style,
                    zIndex: zIndexLayers.floatingToolbar,
                }}
                className={merge([className, 'tw-relative tw-flex tw-select-none tw-items-center tw-gap-1'])}
                {...props}
            >
                {children}
            </ToolbarWrapper>
        </PortalBody>
    );
});

FloatingToolbar.displayName = 'FloatingToolbar';
