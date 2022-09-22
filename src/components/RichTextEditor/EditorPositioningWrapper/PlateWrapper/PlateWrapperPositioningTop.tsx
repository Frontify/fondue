/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { WrapperProps } from './types';

export const PlateWrapperPositioningTop = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => (
    <div
        data-test-id="rich-text-editor"
        className="tw-relative tw-rounded tw-border tw-border-line tw-w-full tw-flex tw-flex-col-reverse"
        ref={ref}
    >
        {children}
    </div>
));
PlateWrapperPositioningTop.displayName = 'PlateWrapperPositioningTop';
