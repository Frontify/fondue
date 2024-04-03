/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarWrapper } from '@components/RichTextEditor/components/Toolbar/ToolbarWrapper';

import { type ToolbarWrapperProps } from './types';

export const ToolbarWrapperPositioningTop = ({ children }: ToolbarWrapperProps) => {
    return (
        <div data-test-id="toolbar-top">
            <ToolbarWrapper className="tw-relative tw-flex tw-select-none tw-items-center tw-gap-1 tw-rounded-t tw-border-b tw-border-line tw-bg-base tw-divide-y tw-divide-line tw-flex-wrap">
                {children}
            </ToolbarWrapper>
        </div>
    );
};
