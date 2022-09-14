/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { WrapperProps } from './types';

export const PlateWrapperPositioningBottom = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => (
    <div
        data-test-id="rich-text-editor"
        className="tw-relative tw-rounded tw-border tw-border-line tw-w-full tw-flex tw-flex-col"
        ref={ref}
    >
        {children}
    </div>
));
PlateWrapperPositioningBottom.displayName = 'PlateWrapperPositioningBottom';
