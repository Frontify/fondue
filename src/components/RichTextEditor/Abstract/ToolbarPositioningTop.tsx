/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { ToolbarWrapperProps, WrapperProps } from './types';

export const PlateWrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => (
    <div data-test-id="rich-text-editor" className="tw-relative tw-w-full tw-flex tw-flex-col" ref={ref}>
        {children}
    </div>
));

PlateWrapper.displayName = 'ToolbarPositioningTopPlateWrapper';

export const ToolbarWrapper = ({ children }: ToolbarWrapperProps) => {
    return (
        <div
            data-test-id="toolbar-top"
            className="tw-relative tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
        >
            {children}
        </div>
    );
};
