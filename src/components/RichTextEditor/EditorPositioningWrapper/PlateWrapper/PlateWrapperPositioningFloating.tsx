/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { WrapperProps } from './types';

export const PlateWrapperPositioningFloating = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => (
    <div data-test-id="rich-text-editor" className="tw-relative tw-w-full" ref={ref}>
        {children}
    </div>
));
PlateWrapperPositioningFloating.displayName = 'PlateWrapperPositioningFloating';
