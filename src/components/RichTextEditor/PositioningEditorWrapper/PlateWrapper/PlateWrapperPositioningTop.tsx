/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { WrapperProps } from './types';

export const PlateWrapperPositioningTop = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => (
    <div
        data-test-id="rich-text-editor"
        className="tw-relative tw-rounded tw-border tw-border-line tw-w-full tw-flex tw-flex-col tw-px-1"
        ref={ref}
    >
        {children}
    </div>
));
PlateWrapperPositioningTop.displayName = 'PlateWrapperPositioningTop';
