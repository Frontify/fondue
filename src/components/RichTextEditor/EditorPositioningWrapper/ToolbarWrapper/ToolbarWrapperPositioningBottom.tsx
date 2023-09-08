/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarWrapperProps } from './types';

export const ToolbarWrapperPositioningBottom = ({ children }: ToolbarWrapperProps) => {
    return (
        <div
            data-test-id="toolbar-bottom"
            className="tw-relative tw-rounded-b tw-min-h-12 tw-border-t tw-border-line tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
        >
            {children}
        </div>
    );
};
