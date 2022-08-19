/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { ToolbarWrapperProps, WrapperProps } from './types';

export const PlateWrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => (
    <div
        data-test-id="rich-text-editor"
        className="tw-relative tw-rounded tw-border tw-border-line tw-w-full tw-flex tw-flex-col-reverse tw-px-1"
        ref={ref}
    >
        {children}
    </div>
));

PlateWrapper.displayName = 'ToolbarPositioningBottomPlateWrapper';

export const ToolbarWrapper = ({ children }: ToolbarWrapperProps) => {
    return (
        <div
            data-test-id="toolbar-bottom"
            className="tw-relative tw-rounded tw-min-h-12 tw-border-t tw-border-line tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
        >
            {children}
        </div>
    );
};
